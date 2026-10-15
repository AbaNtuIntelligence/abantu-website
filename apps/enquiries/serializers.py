from rest_framework import serializers

from .models import Enquiry


class EnquirySerializer(serializers.ModelSerializer):
    # A browser-generated key lets a retry recover a saved submission instead of
    # creating another enquiry or sending a duplicate notification.
    submission_id = serializers.UUIDField(required=False)
    website = serializers.CharField(required=False, allow_blank=True, write_only=True, max_length=200)
    message = serializers.CharField(min_length=10, max_length=10000, trim_whitespace=True)

    class Meta:
        model = Enquiry
        fields = [
            "id", "submission_id", "name", "organisation", "email", "phone",
            "organisation_type", "sector", "project_type", "budget_range",
            "message", "website", "email_status", "email_sent_at", "created_at",
        ]
        read_only_fields = ["id", "email_status", "email_sent_at", "created_at"]

    def validate(self, attrs):
        if attrs.pop("website", ""):
            raise serializers.ValidationError("Unable to accept this submission.")
        # Prevent header injection and keep single-line identity fields readable.
        for key in ("name", "email", "organisation", "phone", "project_type", "budget_range"):
            value = attrs.get(key, "")
            if "\r" in value or "\n" in value or "\x00" in value:
                raise serializers.ValidationError({key: "Enter a single line of text."})
        if "email" in attrs:
            attrs["email"] = attrs["email"].strip().lower()
        return attrs
