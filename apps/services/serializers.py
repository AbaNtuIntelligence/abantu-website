from rest_framework import serializers

from .models import Service


class ServiceSerializer(
    serializers.ModelSerializer
):

    sectors = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )

    class Meta:

        model = Service

        fields = "__all__"
