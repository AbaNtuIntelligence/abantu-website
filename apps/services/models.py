from django.db import models

from apps.sectors.models import Sector


class Service(models.Model):

    title = models.CharField(
        max_length=150
    )

    slug = models.SlugField(
        unique=True
    )

    description = models.TextField()

    detailed_description = models.TextField(
        blank=True
    )

    icon = models.CharField(
        max_length=100,
        blank=True
    )

    sectors = models.ManyToManyField(
        Sector,
        blank=True,
        related_name="services"
    )

    featured = models.BooleanField(
        default=False
    )

    display_order = models.PositiveIntegerField(
        default=0
    )


    class Meta:

        ordering = [
            "display_order",
            "title",
        ]


    def __str__(self):

        return self.title
