import smtplib
import uuid
from io import StringIO
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.core import mail
from django.core.cache import cache
from django.core.management import call_command
from django.test import override_settings
from rest_framework.test import APITestCase

from .delivery import deliver_enquiry
from .models import Enquiry


@override_settings(
    EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
    DEFAULT_FROM_EMAIL="AbaNtu Intelligence <info@abantu-intelligence.co.za>",
    CONTACT_RECIPIENT_EMAIL="info@abantu-intelligence.co.za",
    CONTACT_ALLOWED_ORIGINS=["https://abantu-intelligence.co.za"],
    CORS_ALLOWED_ORIGINS=["https://abantu-intelligence.co.za"],
    CONTACT_BURST_RATE="100/minute",
    CONTACT_SUSTAINED_RATE="100/hour",
    CONTACT_EMAIL_RATE="100/hour",
)
class ContactDeliveryTests(APITestCase):
    url = "/api/v1/enquiries/"

    def setUp(self):
        cache.clear()
        self.payload = {
            "submission_id": str(uuid.uuid4()), "name": "Test Visitor",
            "organisation": "Example Organisation", "email": "visitor@example.org",
            "message": "Please help us plan a school communication platform.", "website": "",
        }

    def post(self, **changes):
        return self.client.post(self.url, {**self.payload, **changes}, format="json",
                                HTTP_ORIGIN="https://abantu-intelligence.co.za")

    def test_mail_uses_company_sender_recipient_and_visitor_reply_to(self):
        response = self.post()
        self.assertEqual(response.status_code, 201)
        enquiry = Enquiry.objects.get()
        self.assertEqual(enquiry.email_status, "sent")
        self.assertEqual(enquiry.email_attempts, 1)
        self.assertIsNotNone(enquiry.email_sent_at)
        self.assertEqual(len(mail.outbox), 1)
        msg = mail.outbox[0]
        self.assertEqual(msg.from_email, "AbaNtu Intelligence <info@abantu-intelligence.co.za>")
        self.assertEqual(msg.to, ["info@abantu-intelligence.co.za"])
        self.assertEqual(msg.reply_to, ["visitor@example.org"])
        self.assertIn(self.payload["message"], msg.body)
        self.assertNotIn("email_status", response.data)
        self.assertNotIn("email", response.data)

    def test_duplicate_browser_retry_saves_and_sends_only_once(self):
        self.assertEqual(self.post().status_code, 201)
        self.assertEqual(self.post().status_code, 201)
        self.assertEqual(Enquiry.objects.count(), 1)
        self.assertEqual(len(mail.outbox), 1)

    def test_reusing_key_with_different_content_is_rejected(self):
        self.post()
        self.assertEqual(self.post(message="Changed enquiry content here.").status_code, 400)
        self.assertEqual(Enquiry.objects.count(), 1)
        self.assertEqual(len(mail.outbox), 1)

    @patch("apps.enquiries.delivery.EmailMessage.send", side_effect=smtplib.SMTPAuthenticationError(535, b"Secret server detail"))
    def test_smtp_failure_preserves_enquiry_and_does_not_expose_details(self, send):
        response = self.post()
        self.assertEqual(response.status_code, 202)
        enquiry = Enquiry.objects.get()
        self.assertEqual(enquiry.email_status, "failed")
        self.assertEqual(enquiry.email_last_error, "SMTPAuthenticationError")
        self.assertNotIn("Secret", str(response.data))
        self.post()
        self.assertEqual(send.call_count, 1)

    @patch("apps.enquiries.delivery.EmailMessage.send", side_effect=TimeoutError())
    def test_ambiguous_timeout_is_not_automatically_retried(self, send):
        self.assertEqual(self.post().status_code, 202)
        self.assertEqual(Enquiry.objects.get().email_status, "uncertain")
        call_command("retry_enquiry_emails", stdout=StringIO())
        self.assertEqual(send.call_count, 1)

    def test_failed_delivery_can_be_retried_without_another_enquiry(self):
        with patch("apps.enquiries.delivery.EmailMessage.send", side_effect=smtplib.SMTPException()):
            self.post()
        call_command("retry_enquiry_emails", stdout=StringIO())
        enquiry = Enquiry.objects.get()
        self.assertEqual(enquiry.email_status, "sent")
        self.assertEqual(enquiry.email_attempts, 2)
        self.assertEqual(len(mail.outbox), 1)
        call_command("retry_enquiry_emails", stdout=StringIO())
        self.assertEqual(len(mail.outbox), 1)

    def test_sender_and_recipient_cannot_be_overridden_by_visitor(self):
        self.post(to="victim@example.org", from_email="spoof@example.org", email_status="sent")
        self.assertEqual(mail.outbox[0].to, ["info@abantu-intelligence.co.za"])
        self.assertNotIn("spoof", mail.outbox[0].from_email)

    def test_validation_blocks_honeypots_headers_and_unbounded_messages(self):
        for change in [
            {"website": "spam.example"}, {"email": "not-an-email"},
            {"name": "Visitor\r\nBcc: victim@example.org"},
            {"message": "short"}, {"message": "x" * 10001},
        ]:
            self.assertEqual(self.post(**change).status_code, 400)
        self.assertEqual(Enquiry.objects.count(), 0)

    def test_unknown_web_origin_is_rejected(self):
        response = self.client.post(self.url, self.payload, format="json", HTTP_ORIGIN="https://untrusted.example")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Enquiry.objects.count(), 0)

    def test_enquiries_are_private_and_staff_can_review_delivery(self):
        self.post()
        self.assertEqual(self.client.get(self.url).status_code, 403)
        self.assertEqual(self.client.get(self.url + "1/").status_code, 403)
        staff = get_user_model().objects.create_user("staff", is_staff=True)
        self.client.force_authenticate(staff)
        result = self.client.get(self.url)
        self.assertEqual(result.status_code, 200)
        self.assertEqual(result.data["results"][0]["email_status"], "sent")

    @override_settings(CONTACT_BURST_RATE="2/minute")
    def test_submission_rate_limit(self):
        self.post()
        self.post(submission_id=str(uuid.uuid4()))
        self.assertEqual(self.post(submission_id=str(uuid.uuid4())).status_code, 429)
        self.assertEqual(Enquiry.objects.count(), 2)

    @override_settings(EMAIL_BACKEND="django.core.mail.backends.smtp.EmailBackend", EMAIL_HOST_PASSWORD="")
    def test_missing_credentials_keep_a_saved_failed_enquiry(self):
        self.assertEqual(self.post().status_code, 202)
        self.assertEqual(Enquiry.objects.get().email_last_error, "ImproperlyConfigured")

    def test_sent_sending_and_historical_entries_are_not_replayed(self):
        for state in ("sent", "sending", "legacy"):
            enquiry = Enquiry.objects.create(name="Saved", email="visitor@example.org", message="Existing enquiry", email_status=state)
            self.assertEqual(deliver_enquiry(enquiry.pk), state)
            enquiry.refresh_from_db()
            self.assertEqual(enquiry.email_attempts, 0)
        call_command("retry_enquiry_emails", stdout=StringIO())
        self.assertEqual(len(mail.outbox), 0)

    def test_mail_preflight_does_not_send(self):
        with override_settings(EMAIL_BACKEND="django.core.mail.backends.smtp.EmailBackend", EMAIL_HOST_PASSWORD="test-only"), patch("apps.enquiries.management.commands.check_contact_email.get_connection") as connection:
            call_command("check_contact_email", stdout=StringIO())
            connection.assert_called_once_with(fail_silently=False)
        self.assertEqual(len(mail.outbox), 0)
