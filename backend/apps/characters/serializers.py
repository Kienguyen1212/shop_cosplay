from rest_framework import serializers
from .models import Character, CharacterImage


class CharacterImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CharacterImage
        fields = ['id', 'image', 'caption', 'order']


class CharacterListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views."""
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Character
        fields = [
            'id', 'name', 'slug', 'status', 'rental_price',
            'accent_color', 'image_url', 'rating', 'review_count',
            'is_featured',
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class CharacterDetailSerializer(serializers.ModelSerializer):
    """Full serializer with components, gallery, sizes."""
    image_url = serializers.SerializerMethodField()
    gallery = CharacterImageSerializer(many=True, read_only=True)

    class Meta:
        model = Character
        fields = [
            'id', 'name', 'slug', 'description', 'status',
            'rental_price', 'accent_color', 'image_url',
            'components', 'rating', 'review_count',
            'sizes_available', 'origin_game', 'is_featured',
            'gallery', 'created_at', 'updated_at',
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
