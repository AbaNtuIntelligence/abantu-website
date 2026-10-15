"""Deliver saved enquiries; never send to a visitor-supplied recipient."""
import logging
import smtplib

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from django.core.mail import EmailMessage
from django.db.models import F
from django.utils import timezone

from .models import Enquiry

logger = logging.getLogger(__name__)


def deliver_enquiry(enquiry_id):
    # Claim atomically so concurrent web requests / operator retries cannot send
    # the same notification together. Network I/O happens outside a transaction.
    claimed = Enquiry.objects.filter(
        pk=enquiry_id, email_status__in=["pending", "failed"]
    ).update(
        email_status="sending", email_attempts=F("email_attempts") + 1,
        email_last_attempt_at=timezone.now(), email_last_error="",
    )
    if not claimed:
        return Enquiry.objects.get(pk=enquiry_id).email_status

    enquiry = Enquiry.objects.get(pk=enquiry_id)
    try:
        if settings.EMAIL_BACKEND == "django.core.mail.backends.smtp.EmailBackend":
            if not settings.EMAIL_HOST_PASSWORD or not settings.EMAIL_HOST_USER:
                raise ImproperlyConfigured("SMTP credentials are not configured")
            if not (settings.EMAIL_USE_TLS or settings.EMAIL_USE_SSL):
                raise ImproperlyConfigured("Encrypted SMTP is required")
        elif settings.EMAIL_BACKEND not in {
            "django.core.mail.backends.locmem.EmailBackend",
        }:
            # A console/file backend does not deliver messages to a mailbox.
            raise ImproperlyConfigured("Use the SMTP backend for contact delivery")

        body = "\n".join([
            "New website enquiry — AbaNtu Intelligence", "",
            f"Reference: {enquiry.pk}",
            f"Received: {timezone.localtime(enquiry.created_at).isoformat()}", "",
            f"Name: {enquiry.name}",
            f"Organisation: {enquiry.organisation or 'Not supplied'}",
            f"Email: {enquiry.email}",
            f"Phone: {enquiry.phone or 'Not supplied'}",
            f"Organisation type: {enquiry.get_organisation_type_display()}",
            f"Project type: {enquiry.project_type or 'Not supplied'}",
            f"Budget: {enquiry.budget_range or 'Not supplied'}", "",
            "Message:", enquiry.message, "",
            "Reply to this email to respond to the visitor.",
            "This enquiry is also stored in the website administration area.",
        ])
        message = EmailMessage(
            subject=f"Website enquiry #{enquiry.pk} — AbaNtu Intelligence",
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.CONTACT_RECIPIENT_EMAIL],
            reply_to=[enquiry.email],
        )
        if message.send(fail_silently=False) != 1:
            raise smtplib.SMTPException("Mail backend did not accept the message")
    except (TimeoutError, smtplib.SMTPServerDisconnected) as exc:
        # A timeout/disconnect can happen after SMTP accepted DATA. Do not retry
        # automatically: the operator should check the inbox before resending.
        state = "uncertain"
        error_type = type(exc).__name__
    except (smtplib.SMTPException, OSError, ImproperlyConfigured, ValueError) as exc:
        state = "failed"
        error_type = type(exc).__name__
    else:
        Enquiry.objects.filter(pk=enquiry.pk).update(
            email_status="sent", email_sent_at=timezone.now(), email_last_error=""
        )
        return "sent"

    Enquiry.objects.filter(pk=enquiry.pk).update(email_status=state, email_last_error=error_type)
    # Never log credentials, full SMTP server responses, or visitor message text.
    logger.warning("Enquiry %s email %s (%s)", enquiry.pk, state, error_type)
    return state
