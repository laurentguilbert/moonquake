from django.conf.urls import include
from django.contrib import admin
from django.urls import path
from event.views import EventViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register("events", EventViewSet)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
