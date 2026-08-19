from rest_framework import viewsets

from .models import Project

from .serializers import (
    ProjectSerializer,
)


class ProjectViewSet(
    viewsets.ReadOnlyModelViewSet
):

    queryset = (
        Project.objects
        .select_related("sector")
        .prefetch_related("gallery")
        .all()
    )

    serializer_class = ProjectSerializer

    filterset_fields = [
        "sector",
        "status",
        "featured",
    ]

    search_fields = [
        "title",
        "short_description",
        "full_description",
        "technologies",
    ]

    ordering_fields = [
        "created_at",
        "title",
        "start_date",
    ]
