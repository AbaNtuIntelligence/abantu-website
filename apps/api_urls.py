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
