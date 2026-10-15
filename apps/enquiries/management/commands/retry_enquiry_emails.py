from django.core.management.base import BaseCommand, CommandError
from apps.enquiries.delivery import deliver_enquiry
from apps.enquiries.models import Enquiry


class Command(BaseCommand):
    help = "Retry pending/failed enquiry notifications. Does not resend accepted or uncertain deliveries."

    def add_arguments(self, parser):
        parser.add_argument("--limit", type=int, default=25)

    def handle(self, *args, **options):
        limit = options["limit"]
        if limit < 1 or limit > 100:
            raise CommandError("Choose --limit between 1 and 100.")
        # Existing enquiries from before this feature are marked 'legacy' by the
        # migration, so the first run cannot email the entire historical inbox.
        ids = list(Enquiry.objects.filter(email_status__in=["pending", "failed"])
                   .order_by("created_at").values_list("pk", flat=True)[:limit])
        for pk in ids:
            state = deliver_enquiry(pk)
            self.stdout.write(f"Enquiry {pk}: {state}")
        self.stdout.write(f"Processed {len(ids)} saved enquiries.")
