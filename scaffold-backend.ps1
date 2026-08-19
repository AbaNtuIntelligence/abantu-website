$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host " AbaNtu Intelligence Backend V1 Scaffold" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

$root = Get-Location

$directories = @(
    "config",
    "apps",
    "apps\core",
    "apps\core\migrations",
    "apps\projects",
    "apps\projects\migrations",
    "apps\blog",
    "apps\blog\migrations",
    "apps\services",
    "apps\services\migrations",
    "apps\sectors",
    "apps\sectors\migrations",
    "apps\team",
    "apps\team\migrations",
    "apps\enquiries",
    "apps\enquiries\migrations"
)

foreach ($directory in $directories) {
    New-Item -ItemType Directory -Force -Path $directory | Out-Null
}

function Write-File {
    param(
        [string]$Path,
        [string]$Content
    )

    $parent = Split-Path $Path -Parent

    if ($parent -and !(Test-Path $parent)) {
        New-Item -ItemType Directory -Force -Path $parent | Out-Null
    }

    Set-Content -Path $Path -Value $Content -Encoding UTF8
}

# ============================================================
# manage.py
# ============================================================

Write-File "manage.py" @'
#!/usr/bin/env python
import os
import sys


def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
'@

# ============================================================
# requirements.txt
# ============================================================

Write-File "requirements.txt" @'
Django>=6.0,<6.1
djangorestframework>=3.18,<3.19
django-cors-headers>=4.9,<5.0
django-filter>=25.2,<26.0
dj-database-url>=2.3,<3.0
Pillow>=11.0,<12.0
psycopg[binary]>=3.2,<4.0
python-dotenv>=1.1,<2.0
gunicorn>=23.0,<24.0
whitenoise>=6.9,<7.0
'@

# ============================================================
# .env.example
# ============================================================

Write-File ".env.example" @'
DEBUG=True

SECRET_KEY=change-this-development-secret-key

ALLOWED_HOSTS=localhost,127.0.0.1

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/abantu_intelligence
'@

# ============================================================
# .gitignore
# ============================================================

Write-File ".gitignore" @'
.venv/
__pycache__/
*.py[cod]
*$py.class

.env

db.sqlite3

media/
staticfiles/

.pytest_cache/
.mypy_cache/

.vscode/
.idea/

.DS_Store
Thumbs.db
'@

# ============================================================
# config/__init__.py
# ============================================================

Write-File "config\__init__.py" ""

# ============================================================
# config/settings.py
# ============================================================

Write-File "config\settings.py" @'
import os
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "development-only-secret-key"
)

DEBUG = os.getenv("DEBUG", "True").lower() == "true"


ALLOWED_HOSTS = [
    host.strip()
    for host in os.getenv(
        "ALLOWED_HOSTS",
        "localhost,127.0.0.1"
    ).split(",")
    if host.strip()
]


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "corsheaders",
    "django_filters",
    "rest_framework",

    "apps.core",
    "apps.projects",
    "apps.blog",
    "apps.services",
    "apps.sectors",
    "apps.team",
    "apps.enquiries",
]


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",

    "whitenoise.middleware.WhiteNoiseMiddleware",

    "corsheaders.middleware.CorsMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",

    "django.middleware.common.CommonMiddleware",

    "django.middleware.csrf.CsrfViewMiddleware",

    "django.contrib.auth.middleware.AuthenticationMiddleware",

    "django.contrib.messages.middleware.MessageMiddleware",

    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "config.urls"


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",

        "DIRS": [],

        "APP_DIRS": True,

        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",

                "django.contrib.auth.context_processors.auth",

                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


WSGI_APPLICATION = "config.wsgi.application"

ASGI_APPLICATION = "config.asgi.application"


DATABASE_URL = os.getenv("DATABASE_URL", "").strip()


if DATABASE_URL:

    import dj_database_url

    DATABASES = {
        "default": dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
        )
    }

else:

    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "UserAttributeSimilarityValidator"
        )
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "MinimumLengthValidator"
        )
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "CommonPasswordValidator"
        )
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "NumericPasswordValidator"
        )
    },
]


LANGUAGE_CODE = "en-za"

TIME_ZONE = "Africa/Johannesburg"

USE_I18N = True

USE_TZ = True


STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"

MEDIA_ROOT = BASE_DIR / "media"


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ALLOWED_ORIGINS",
        ""
    ).split(",")
    if origin.strip()
]


REST_FRAMEWORK = {

    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],

    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
    ],

    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",

        "rest_framework.filters.SearchFilter",

        "rest_framework.filters.OrderingFilter",
    ],

    "DEFAULT_PAGINATION_CLASS": (
        "rest_framework.pagination.PageNumberPagination"
    ),

    "PAGE_SIZE": 12,
}


if not DEBUG:

    SECURE_PROXY_SSL_HEADER = (
        "HTTP_X_FORWARDED_PROTO",
        "https",
    )

    CSRF_COOKIE_SECURE = True

    SESSION_COOKIE_SECURE = True

    SECURE_CONTENT_TYPE_NOSNIFF = True
'@

# ============================================================
# config/urls.py
# ============================================================

Write-File "config\urls.py" @'
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path


urlpatterns = [

    path(
        "admin/",
        admin.site.urls
    ),

    path(
        "api/v1/",
        include("apps.api_urls")
    ),
]


if settings.DEBUG:

    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
'@

# ============================================================
# config/wsgi.py
# ============================================================

Write-File "config\wsgi.py" @'
import os

from django.core.wsgi import get_wsgi_application


os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "config.settings"
)


application = get_wsgi_application()
'@

# ============================================================
# config/asgi.py
# ============================================================

Write-File "config\asgi.py" @'
import os

from django.core.asgi import get_asgi_application


os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "config.settings"
)


application = get_asgi_application()
'@

# ============================================================
# apps/__init__.py
# ============================================================

Write-File "apps\__init__.py" ""

# ============================================================
# API URLs
# ============================================================

Write-File "apps\api_urls.py" @'
from django.urls import include, path

from rest_framework import routers
from rest_framework.decorators import api_view
from rest_framework.response import Response


from apps.blog.views import (
    CategoryViewSet,
    PostViewSet,
    TagViewSet,
)

from apps.core.views import (
    SiteSettingsViewSet,
)

from apps.enquiries.views import (
    EnquiryViewSet,
)

from apps.projects.views import (
    ProjectViewSet,
)

from apps.sectors.views import (
    SectorViewSet,
)

from apps.services.views import (
    ServiceViewSet,
)

from apps.team.views import (
    TeamMemberViewSet,
)


router = routers.DefaultRouter()


router.register(
    "site",
    SiteSettingsViewSet,
    basename="site"
)


router.register(
    "projects",
    ProjectViewSet,
    basename="projects"
)


router.register(
    "blog",
    PostViewSet,
    basename="blog"
)


router.register(
    "blog/categories",
    CategoryViewSet,
    basename="blog-categories"
)


router.register(
    "blog/tags",
    TagViewSet,
    basename="blog-tags"
)


router.register(
    "services",
    ServiceViewSet,
    basename="services"
)


router.register(
    "sectors",
    SectorViewSet,
    basename="sectors"
)


router.register(
    "team",
    TeamMemberViewSet,
    basename="team"
)


router.register(
    "enquiries",
    EnquiryViewSet,
    basename="enquiries"
)


@api_view(["GET"])
def health(request):

    return Response(
        {
            "status": "ok",
            "service": "abantu-intelligence-api",
            "version": "v1",
        }
    )


urlpatterns = [

    path(
        "health/",
        health
    ),

    path(
        "",
        include(router.urls)
    ),
]
'@

# ============================================================
# CORE APP
# ============================================================

Write-File "apps\core\__init__.py" ""

Write-File "apps\core\apps.py" @'
from django.apps import AppConfig


class CoreConfig(AppConfig):

    default_auto_field = "django.db.models.BigAutoField"

    name = "apps.core"
'@

Write-File "apps\core\models.py" @'
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
'@

Write-File "apps\core\serializers.py" @'
from rest_framework import serializers

from .models import SiteSettings


class SiteSettingsSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = SiteSettings

        fields = "__all__"
'@

Write-File "apps\core\views.py" @'
from rest_framework import viewsets

from .models import SiteSettings

from .serializers import (
    SiteSettingsSerializer,
)


class SiteSettingsViewSet(
    viewsets.ReadOnlyModelViewSet
):

    queryset = SiteSettings.objects.all()

    serializer_class = SiteSettingsSerializer
'@

Write-File "apps\core\admin.py" @'
from django.contrib import admin

from .models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):

    list_display = (
        "company_name",
        "email",
        "updated_at",
    )
'@

# ============================================================
# SECTORS APP
# ============================================================

Write-File "apps\sectors\__init__.py" ""

Write-File "apps\sectors\apps.py" @'
from django.apps import AppConfig


class SectorsConfig(AppConfig):

    default_auto_field = "django.db.models.BigAutoField"

    name = "apps.sectors"
'@

Write-File "apps\sectors\models.py" @'
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
'@

Write-File "apps\sectors\serializers.py" @'
from rest_framework import serializers

from .models import Sector


class SectorSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Sector

        fields = "__all__"
'@

Write-File "apps\sectors\views.py" @'
from rest_framework import viewsets

from .models import Sector

from .serializers import (
    SectorSerializer,
)


class SectorViewSet(
    viewsets.ReadOnlyModelViewSet
):

    queryset = Sector.objects.all()

    serializer_class = SectorSerializer

    search_fields = [
        "name",
        "description",
    ]

    ordering_fields = [
        "name",
        "display_order",
    ]
'@

Write-File "apps\sectors\admin.py" @'
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
'@

# ============================================================
# SERVICES APP
# ============================================================

Write-File "apps\services\__init__.py" ""

Write-File "apps\services\apps.py" @'
from django.apps import AppConfig


class ServicesConfig(AppConfig):

    default_auto_field = "django.db.models.BigAutoField"

    name = "apps.services"
'@

Write-File "apps\services\models.py" @'
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
'@

Write-File "apps\services\serializers.py" @'
from rest_framework import serializers

from .models import Service


class ServiceSerializer(
    serializers.ModelSerializer
):

    sectors = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )

    class Meta:

        model = Service

        fields = "__all__"
'@

Write-File "apps\services\views.py" @'
from rest_framework import viewsets

from .models import Service

from .serializers import (
    ServiceSerializer,
)


class ServiceViewSet(
    viewsets.ReadOnlyModelViewSet
):

    queryset = Service.objects.prefetch_related(
        "sectors"
    ).all()

    serializer_class = ServiceSerializer

    search_fields = [
        "title",
        "description",
    ]

    ordering_fields = [
        "title",
        "display_order",
    ]
'@

Write-File "apps\services\admin.py" @'
from django.contrib import admin

from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "featured",
        "display_order",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }

    filter_horizontal = (
        "sectors",
    )
'@

# ============================================================
# TEAM APP
# ============================================================

Write-File "apps\team\__init__.py" ""

Write-File "apps\team\apps.py" @'
from django.apps import AppConfig


class TeamConfig(AppConfig):

    default_auto_field = "django.db.models.BigAutoField"

    name = "apps.team"
'@

Write-File "apps\team\models.py" @'
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

        return f"{self.name} — {self.role}"
'@

Write-File "apps\team\serializers.py" @'
from rest_framework import serializers

from .models import TeamMember


class TeamMemberSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = TeamMember

        fields = "__all__"
'@

Write-File "apps\team\views.py" @'
from rest_framework import viewsets

from .models import TeamMember

from .serializers import (
    TeamMemberSerializer,
)


class TeamMemberViewSet(
    viewsets.ReadOnlyModelViewSet
):

    queryset = TeamMember.objects.all()

    serializer_class = TeamMemberSerializer
'@

Write-File "apps\team\admin.py" @'
from django.contrib import admin

from .models import TeamMember


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "role",
        "featured",
        "display_order",
    )
'@

# ============================================================
# PROJECTS APP
# ============================================================

Write-File "apps\projects\__init__.py" ""

Write-File "apps\projects\apps.py" @'
from django.apps import AppConfig


class ProjectsConfig(AppConfig):

    default_auto_field = "django.db.models.BigAutoField"

    name = "apps.projects"
'@

Write-File "apps\projects\models.py" @'
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
'@

Write-File "apps\projects\serializers.py" @'
from rest_framework import serializers

from .models import (
    Project,
    ProjectImage,
)


class ProjectImageSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = ProjectImage

        fields = "__all__"


class ProjectSerializer(
    serializers.ModelSerializer
):

    gallery = ProjectImageSerializer(
        many=True,
        read_only=True
    )

    sector_name = serializers.CharField(
        source="sector.name",
        read_only=True
    )


    class Meta:

        model = Project

        fields = "__all__"

        read_only_fields = [
            "created_at",
            "updated_at",
        ]
'@

Write-File "apps\projects\views.py" @'
from rest_framework import viewsets

from .models import Project

from .serializers import (
    ProjectSerializer,
)


class ProjectViewSet(
    viewsets.ReadOnlyModelViewSet
):

    queryset = (
        Project.objects
        .select_related("sector")
        .prefetch_related("gallery")
        .all()
    )

    serializer_class = ProjectSerializer

    filterset_fields = [
        "sector",
        "status",
        "featured",
    ]

    search_fields = [
        "title",
        "short_description",
        "full_description",
        "technologies",
    ]

    ordering_fields = [
        "created_at",
        "title",
        "start_date",
    ]
'@

Write-File "apps\projects\admin.py" @'
from django.contrib import admin

from .models import (
    Project,
    ProjectImage,
)


class ProjectImageInline(
    admin.TabularInline
):

    model = ProjectImage

    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "sector",
        "status",
        "featured",
        "created_at",
    )

    list_filter = (
        "status",
        "featured",
        "sector",
    )

    search_fields = (
        "title",
        "short_description",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }

    inlines = [
        ProjectImageInline
    ]
'@

# ============================================================
# BLOG APP
# ============================================================

Write-File "apps\blog\__init__.py" ""

Write-File "apps\blog\apps.py" @'
from django.apps import AppConfig


class BlogConfig(AppConfig):

    default_auto_field = "django.db.models.BigAutoField"

    name = "apps.blog"
'@

Write-File "apps\blog\models.py" @'
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
'@

Write-File "apps\blog\serializers.py" @'
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
'@

Write-File "apps\blog\views.py" @'
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
'@

Write-File "apps\blog\admin.py" @'
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
'@

# ============================================================
# ENQUIRIES APP
# ============================================================

Write-File "apps\enquiries\__init__.py" ""

Write-File "apps\enquiries\apps.py" @'
from django.apps import AppConfig


class EnquiriesConfig(AppConfig):

    default_auto_field = "django.db.models.BigAutoField"

    name = "apps.enquiries"
'@

Write-File "apps\enquiries\models.py" @'
from django.db import models


class Enquiry(models.Model):

    ORGANISATION_CHOICES = [

        ("government", "Government"),

        ("education", "Education"),

        ("sme", "SMME / Enterprise"),

        ("ngo", "NGO / Community"),

        ("investor", "Investor"),

        ("other", "Other"),
    ]


    STATUS_CHOICES = [

        ("new", "New"),

        ("contacted", "Contacted"),

        ("qualified", "Qualified"),

        ("proposal", "Proposal"),

        ("won", "Won"),

        ("closed", "Closed"),
    ]


    name = models.CharField(
        max_length=150
    )

    organisation = models.CharField(
        max_length=200,
        blank=True
    )

    email = models.EmailField()

    phone = models.CharField(
        max_length=50,
        blank=True
    )

    organisation_type = models.CharField(
        max_length=20,
        choices=ORGANISATION_CHOICES,
        default="other"
    )

    sector = models.ForeignKey(
        "sectors.Sector",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="enquiries"
    )

    project_type = models.CharField(
        max_length=200,
        blank=True
    )

    budget_range = models.CharField(
        max_length=100,
        blank=True
    )

    message = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="new"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )


    class Meta:

        ordering = [
            "-created_at"
        ]


    def __str__(self):

        return (
            f"{self.name} — "
            f"{self.organisation or 'No organisation'}"
        )
'@

Write-File "apps\enquiries\serializers.py" @'
from rest_framework import serializers

from .models import Enquiry


class EnquirySerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Enquiry

        fields = [
            "id",
            "name",
            "organisation",
            "email",
            "phone",
            "organisation_type",
            "sector",
            "project_type",
            "budget_range",
            "message",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]
'@

Write-File "apps\enquiries\views.py" @'
from rest_framework import viewsets

from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
)


from .models import Enquiry

from .serializers import (
    EnquirySerializer,
)


class EnquiryViewSet(
    viewsets.ModelViewSet
):

    queryset = Enquiry.objects.all()

    serializer_class = EnquirySerializer


    def get_permissions(self):

        if self.action == "create":

            return [
                AllowAny()
            ]

        return [
            IsAdminUser()
        ]
'@

Write-File "apps\enquiries\admin.py" @'
from django.contrib import admin

from .models import Enquiry


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "organisation",
        "organisation_type",
        "status",
        "created_at",
    )

    list_filter = (
        "organisation_type",
        "status",
        "sector",
    )

    search_fields = (
        "name",
        "organisation",
        "email",
        "message",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )
'@

# ============================================================
# Migration package initializers
# ============================================================

$apps = @(
    "core",
    "projects",
    "blog",
    "services",
    "sectors",
    "team",
    "enquiries"
)

foreach ($app in $apps) {

    Write-File `
        "apps\$app\migrations\__init__.py" `
        ""
}

# ============================================================
# Tests
# ============================================================

Write-File "apps\core\tests.py" @'
from django.test import TestCase


class HealthEndpointTest(TestCase):

    def test_health_endpoint(self):

        response = self.client.get(
            "/api/v1/health/"
        )

        self.assertEqual(
            response.status_code,
            200
        )

        self.assertEqual(
            response.json()["status"],
            "ok"
        )
'@

# ============================================================
# Render deployment
# ============================================================

Write-File "build.sh" @'
#!/usr/bin/env bash

set -o errexit

python -m pip install -r requirements.txt

python manage.py collectstatic --no-input

python manage.py migrate
'@

Write-File "render.yaml" @'
services:

  - type: web

    name: abantu-intelligence-api

    runtime: python

    buildCommand: "./build.sh"

    startCommand: "gunicorn config.wsgi:application"

    envVars:

      - key: SECRET_KEY
        generateValue: true

      - key: DEBUG
        value: "False"

      - key: ALLOWED_HOSTS
        sync: false

      - key: CORS_ALLOWED_ORIGINS
        sync: false

      - key: DATABASE_URL
        fromDatabase:
          name: abantu-intelligence-db
          property: connectionString


databases:

  - name: abantu-intelligence-db

    databaseName: abantu_intelligence

    user: abantu_intelligence
'@

# ============================================================
# README
# ============================================================

Write-File "README.md" @'
# AbaNtu Intelligence — Backend V1

Backend foundation for the rebuilt AbaNtu Intelligence corporate website,
portfolio, blog and future digital platform ecosystem.

## Architecture

React / Next.js frontend
        |
        v
Django REST API
        |
        v
PostgreSQL

## Applications

core
projects
blog
services
sectors
team
enquiries

## Local setup

PowerShell:

    py -3.14 -m venv .venv

    .\.venv\Scripts\Activate.ps1

    python -m pip install --upgrade pip

    pip install -r requirements.txt

    Copy-Item .env.example .env

    python manage.py makemigrations

    python manage.py migrate

    python manage.py createsuperuser

    python manage.py runserver

## URLs

Admin:

http://127.0.0.1:8000/admin/

API:

http://127.0.0.1:8000/api/v1/

Health:

http://127.0.0.1:8000/api/v1/health/

Projects:

http://127.0.0.1:8000/api/v1/projects/

Blog:

http://127.0.0.1:8000/api/v1/blog/

Services:

http://127.0.0.1:8000/api/v1/services/

Sectors:

http://127.0.0.1:8000/api/v1/sectors/

Team:

http://127.0.0.1:8000/api/v1/team/

Enquiries:

POST http://127.0.0.1:8000/api/v1/enquiries/

## Important

The project intentionally starts with SQLite when DATABASE_URL is absent.
Once PostgreSQL is available locally, set DATABASE_URL in .env.

Production should use PostgreSQL.

Do not commit .env.

## Deployment

Render configuration is included in render.yaml.

The frontend will be connected after the backend API has been verified locally and deployed.
'@

# ============================================================
# Finish
# ============================================================

Write-Host ""
Write-Host "==============================================" -ForegroundColor Green
Write-Host " Backend scaffold created successfully." -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green
Write-Host ""

Write-Host "Project location:" -ForegroundColor Yellow
Write-Host $root
Write-Host ""

Write-Host "Next commands:" -ForegroundColor Yellow
Write-Host ""
Write-Host "py -3.14 -m venv .venv"
Write-Host ".\.venv\Scripts\Activate.ps1"
Write-Host "python -m pip install --upgrade pip"
Write-Host "pip install -r requirements.txt"
Write-Host "Copy-Item .env.example .env"
Write-Host "python manage.py makemigrations"
Write-Host "python manage.py migrate"
Write-Host "python manage.py createsuperuser"
Write-Host "python manage.py runserver"
Write-Host ""

Write-Host "API:" -ForegroundColor Cyan
Write-Host "http://127.0.0.1:8000/api/v1/"
Write-Host ""

Write-Host "Health:" -ForegroundColor Cyan
Write-Host "http://127.0.0.1:8000/api/v1/health/"
Write-Host ""

Write-Host "Admin:" -ForegroundColor Cyan
Write-Host "http://127.0.0.1:8000/admin/"
Write-Host ""