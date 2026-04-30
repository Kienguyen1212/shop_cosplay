from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline
from .models import Order, OrderItem


class OrderItemInline(TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['subtotal']
    fields = ['character', 'size', 'daily_price', 'rental_days', 'subtotal']


@admin.register(Order)
class OrderAdmin(ModelAdmin):
    list_display = [
        '__str__', 'status', 'total_amount', 'deposit_amount',
        'rental_start', 'rental_end', 'customer_phone', 'created_at',
    ]
    list_filter = ['status', 'payment_method', 'created_at']
    search_fields = ['customer_name', 'customer_phone', 'customer_email']
    list_editable = ['status']
    readonly_fields = ['id', 'total_amount', 'deposit_amount', 'created_at', 'updated_at']
    inlines = [OrderItemInline]
    date_hierarchy = 'created_at'

    fieldsets = [
        ('Thông tin đơn hàng', {
            'fields': ['id', 'user', 'status', 'payment_method'],
        }),
        ('Thời gian thuê', {
            'fields': ['rental_start', 'rental_end'],
        }),
        ('Thanh toán', {
            'fields': ['total_amount', 'deposit_amount'],
        }),
        ('Thông tin khách hàng', {
            'fields': ['customer_name', 'customer_phone', 'customer_email', 'customer_address'],
        }),
        ('Ghi chú', {
            'fields': ['notes'],
        }),
        ('Thời gian', {
            'fields': ['created_at', 'updated_at'],
        }),
    ]
