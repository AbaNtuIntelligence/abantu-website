from rest_framework import serializers

from .models import Enquiry


class EnquirySerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Enquiry

        fields = [
            "id",
            "name",
            "organisation",
            "email",
            "phone",
            "organisation_type",
            "sector",
            "project_type",
            "budget_range",
            "message",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]
