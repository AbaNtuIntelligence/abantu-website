from django.contrib import admin

from .models import Sector


@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "featured",
        "display_order",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }
