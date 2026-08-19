from django.db import models

from apps.sectors.models import Sector


class Project(models.Model):

    STATUS_CHOICES = [

        ("concept", "Concept"),

        ("development", "In Development"),

        ("prototype", "Prototype"),

        ("active", "Active"),

        ("deployed", "Deployed"),

        ("archived", "Archived"),
    ]


    title = models.CharField(
        max_length=200
    )

    slug = models.SlugField(
        unique=True
    )

    short_description = models.TextField()

    full_description = models.TextField(
        blank=True
    )

    problem = models.TextField(
        blank=True
    )

    solution = models.TextField(
        blank=True
    )

    outcome = models.TextField(
        blank=True
    )

    future_potential = models.TextField(
        blank=True
    )

    sector = models.ForeignKey(
        Sector,
        on_delete=models.PROTECT,
        related_name="projects"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="development"
    )

    technologies = models.JSONField(
        default=list,
        blank=True
    )

    featured = models.BooleanField(
        default=False
    )

    project_url = models.URLField(
        blank=True
    )

    github_url = models.URLField(
        blank=True
    )

    start_date = models.DateField(
        blank=True,
        null=True
    )

    completion_date = models.DateField(
        blank=True,
        null=True
    )

    cover_image = models.ImageField(
        upload_to="projects/covers/",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )


    class Meta:

        ordering = [
            "-featured",
            "-created_at",
        ]


    def __str__(self):

        return self.title


class ProjectImage(models.Model):

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="gallery"
    )

    image = models.ImageField(
        upload_to="projects/gallery/"
    )

    caption = models.CharField(
        max_length=255,
        blank=True
    )

    display_order = models.PositiveIntegerField(
        default=0
    )


    class Meta:

        ordering = [
            "display_order",
            "id",
        ]


    def __str__(self):

        return f"{self.project.title} image"
