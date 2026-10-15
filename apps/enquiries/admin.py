from django.contrib import admin

from .models import Enquiry


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "organisation",
        "organisation_type",
        "status",
        "email_status",
        "created_at",
    )

    list_filter = (
        "organisation_type",
        "status",
        "email_status",
        "sector",
    )

    search_fields = (
        "name",
        "organisation",
        "email",
        "message",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
        "submission_id",
        "email_status",
        "email_attempts",
        "email_last_attempt_at",
        "email_sent_at",
        "email_last_error",
    )
