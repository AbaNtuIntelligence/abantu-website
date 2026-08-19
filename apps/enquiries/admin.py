from django.contrib import admin

from .models import Enquiry


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "organisation",
        "organisation_type",
        "status",
        "created_at",
    )

    list_filter = (
        "organisation_type",
        "status",
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
    )
