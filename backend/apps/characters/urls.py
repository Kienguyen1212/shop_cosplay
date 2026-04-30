from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CharacterViewSet

router = DefaultRouter()
router.register('', CharacterViewSet, basename='character')

urlpatterns = [
    path('', include(router.urls)),
]
