from django.db import models


class Sector(models.Model):

    name = models.CharField(
        max_length=120
    )

    slug = models.SlugField(
        unique=True
    )

    description = models.TextField()

    challenge = models.TextField(
        blank=True
    )

    approach = models.TextField(
        blank=True
    )

    image = models.ImageField(
        upload_to="sectors/",
        blank=True,
        null=True
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
            "name",
        ]


    def __str__(self):

        return self.name
