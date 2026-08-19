from rest_framework import viewsets

from .models import Sector

from .serializers import (
    SectorSerializer,
)


class SectorViewSet(
    viewsets.ReadOnlyModelViewSet
):

    queryset = Sector.objects.all()

    serializer_class = SectorSerializer

    search_fields = [
        "name",
        "description",
    ]

    ordering_fields = [
        "name",
        "display_order",
    ]
