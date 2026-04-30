from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Character
from .serializers import CharacterListSerializer, CharacterDetailSerializer


class CharacterViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for cosplay characters.
    Supports filtering by status, searching by name, and ordering.
    """
    queryset = Character.objects.all()
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'is_featured', 'origin_game']
    search_fields = ['name', 'description', 'origin_game']
    ordering_fields = ['rental_price', 'name', 'created_at', 'rating']
    ordering = ['-is_featured', '-created_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CharacterDetailSerializer
        return CharacterListSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Return only featured characters."""
        featured = self.queryset.filter(is_featured=True)
        serializer = CharacterListSerializer(
            featured, many=True, context={'request': request}
        )
        return Response(serializer.data)
