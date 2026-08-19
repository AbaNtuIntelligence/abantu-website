from rest_framework import viewsets

from .models import (
    Category,
    Post,
    Tag,
)

from .serializers import (
    CategorySerializer,
    PostSerializer,
    TagSerializer,
)


class PostViewSet(
    viewsets.ReadOnlyModelViewSet
):

    serializer_class = PostSerializer

    filterset_fields = [
        "category",
        "status",
        "featured",
    ]

    search_fields = [
        "title",
        "excerpt",
        "content",
    ]

    ordering_fields = [
        "published_at",
        "created_at",
        "title",
    ]


    def get_queryset(self):

        queryset = (
            Post.objects
            .select_related(
                "author",
                "category"
            )
            .prefetch_related("tags")
        )

        if self.request.user.is_staff:

            return queryset.all()

        return queryset.filter(
            status="published"
        )


class CategoryViewSet(
    viewsets.ReadOnlyModelViewSet
):

    queryset = Category.objects.all()

    serializer_class = CategorySerializer

    search_fields = [
        "name",
        "description",
    ]


class TagViewSet(
    viewsets.ReadOnlyModelViewSet
):

    queryset = Tag.objects.all()

    serializer_class = TagSerializer

    search_fields = [
        "name",
    ]
