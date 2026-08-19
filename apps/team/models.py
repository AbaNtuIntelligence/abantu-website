from django.db import models


class TeamMember(models.Model):

    name = models.CharField(
        max_length=150
    )

    role = models.CharField(
        max_length=150
    )

    biography = models.TextField()

    photo = models.ImageField(
        upload_to="team/",
        blank=True,
        null=True
    )

    linkedin_url = models.URLField(
        blank=True
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

        return f"{self.name} â€” {self.role}"
