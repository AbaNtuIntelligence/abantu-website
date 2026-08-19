from django.db import models


class Category(models.Model):

    name = models.CharField(
        max_length=100
    )

    slug = models.SlugField(
        unique=True
    )

    description = models.TextField(
        blank=True
    )


    def __str__(self):

        return self.name


class Tag(models.Model):

    name = models.CharField(
        max_length=80,
        unique=True
    )

    slug = models.SlugField(
        unique=True
    )


    def __str__(self):

        return self.name


class Post(models.Model):

    STATUS_CHOICES = [

        ("draft", "Draft"),

        ("review", "Review"),

        ("published", "Published"),

        ("archived", "Archived"),
    ]


    title = models.CharField(
        max_length=220
    )

    slug = models.SlugField(
        unique=True
    )

    excerpt = models.TextField()

    content = models.TextField()

    featured_image = models.ImageField(
        upload_to="blog/covers/",
        blank=True,
        null=True
    )

    author = models.ForeignKey(
        "team.TeamMember",
        on_delete=models.PROTECT,
        related_name="posts"
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="posts"
    )

    tags = models.ManyToManyField(
        Tag,
        blank=True,
        related_name="posts"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="draft"
    )

    featured = models.BooleanField(
        default=False
    )

    published_at = models.DateTimeField(
        blank=True,
        null=True
    )

    reading_time = models.PositiveIntegerField(
        default=5
    )

    meta_title = models.CharField(
        max_length=220,
        blank=True
    )

    meta_description = models.CharField(
        max_length=320,
        blank=True
    )

    canonical_url = models.URLField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )


    class Meta:

        ordering = [
            "-published_at",
            "-created_at",
        ]


    def __str__(self):

        return self.title
