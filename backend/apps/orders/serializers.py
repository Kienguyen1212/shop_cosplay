from rest_framework import serializers
from .models import Order, OrderItem
from apps.characters.serializers import CharacterListSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    character_name = serializers.CharField(source='character.name', read_only=True)
    character_image = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'character', 'character_name', 'character_image',
                  'size', 'daily_price', 'rental_days', 'subtotal']
        read_only_fields = ['subtotal']

    def get_character_image(self, obj):
        if obj.character and obj.character.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.character.image.url)
            return obj.character.image.url
        return None


class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'rental_start', 'rental_end', 'payment_method', 'notes',
            'customer_name', 'customer_phone', 'customer_email',
            'customer_address', 'items',
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        total = 0
        for item_data in items_data:
            item = OrderItem.objects.create(order=order, **item_data)
            total += item.subtotal

        order.total_amount = total
        order.deposit_amount = total * 50 // 100  # 50% deposit
        order.save()

        return order


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    rental_days = serializers.ReadOnlyField()

    class Meta:
        model = Order
        fields = [
            'id', 'status', 'total_amount', 'deposit_amount',
            'payment_method', 'rental_start', 'rental_end', 'rental_days',
            'notes', 'customer_name', 'customer_phone', 'customer_email',
            'customer_address', 'items', 'created_at', 'updated_at',
        ]
