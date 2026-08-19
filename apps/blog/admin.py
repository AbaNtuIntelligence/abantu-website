from django.contrib import admin

from .models import (
    Category,
    Post,
    Tag,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):

    list_display = (
        "name",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "category",
        "author",
        "status",
        "featured",
        "published_at",
    )

    list_filter = (
        "status",
        "featured",
        "category",
    )

    search_fields = (
        "title",
        "excerpt",
        "content",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }

    filter_horizontal = (
        "tags",
    )
