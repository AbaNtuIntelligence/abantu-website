from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.core.mail import get_connection


class Command(BaseCommand):
    help = "Validate encrypted SMTP login without sending a message."

    def handle(self, *args, **options):
        if settings.EMAIL_BACKEND != "django.core.mail.backends.smtp.EmailBackend":
            raise CommandError("Set EMAIL_BACKEND to django.core.mail.backends.smtp.EmailBackend.")
        if not settings.EMAIL_HOST_PASSWORD:
            raise CommandError("EMAIL_HOST_PASSWORD is missing from the backend environment.")
        if not (settings.EMAIL_USE_TLS or settings.EMAIL_USE_SSL):
            raise CommandError("Enable encrypted SMTP.")
        try:
            with get_connection(fail_silently=False) as connection:
                pass
        except Exception as exc:
            raise CommandError(f"SMTP connection/authentication failed ({type(exc).__name__}). Check server, port, TLS, password and hosting restrictions.") from None
        self.stdout.write(self.style.SUCCESS("SMTP connection and login succeeded. No email was sent."))
