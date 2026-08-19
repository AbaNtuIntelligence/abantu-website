from django.db import models


class SiteSettings(models.Model):

    company_name = models.CharField(
        max_length=150,
        default="AbaNtu Intelligence"
    )

    tagline = models.CharField(
        max_length=255,
        default=(
            "Building Digital Infrastructure "
            "for an Inclusive Africa."
        )
    )

    mission = models.TextField(
        blank=True
    )

    vision = models.TextField(
        blank=True
    )

    philosophy = models.TextField(
        blank=True
    )

    email = models.EmailField(
        blank=True
    )

    phone = models.CharField(
        max_length=50,
        blank=True
    )

    address = models.TextField(
        blank=True
    )

    linkedin_url = models.URLField(
        blank=True
    )

    facebook_url = models.URLField(
        blank=True
    )

    instagram_url = models.URLField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )


    def __str__(self):

        return self.company_name
