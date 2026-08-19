from rest_framework import viewsets

from .models import Service

from .serializers import (
    ServiceSerializer,
)


class ServiceViewSet(
    viewsets.ReadOnlyModelViewSet
):

    queryset = Service.objects.prefetch_related(
        "sectors"
    ).all()

    serializer_class = ServiceSerializer

    search_fields = [
        "title",
        "description",
    ]

    ordering_fields = [
        "title",
        "display_order",
    ]
