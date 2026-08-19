from rest_framework import serializers

from .models import (
    Category,
    Post,
    Tag,
)


class CategorySerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Category

        fields = "__all__"


class TagSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Tag

        fields = "__all__"


class PostSerializer(
    serializers.ModelSerializer
):

    author_name = serializers.CharField(
        source="author.name",
        read_only=True
    )

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    tag_names = serializers.SerializerMethodField()


    class Meta:

        model = Post

        fields = "__all__"


    def get_tag_names(self, obj):

        return list(
            obj.tags.values_list(
                "name",
                flat=True
            )
        )
