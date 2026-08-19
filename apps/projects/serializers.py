from rest_framework import serializers

from .models import (
    Project,
    ProjectImage,
)


class ProjectImageSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = ProjectImage

        fields = "__all__"


class ProjectSerializer(
    serializers.ModelSerializer
):

    gallery = ProjectImageSerializer(
        many=True,
        read_only=True
    )

    sector_name = serializers.CharField(
        source="sector.name",
        read_only=True
    )


    class Meta:

        model = Project

        fields = "__all__"

        read_only_fields = [
            "created_at",
            "updated_at",
        ]
