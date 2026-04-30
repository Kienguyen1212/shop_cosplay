from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline
from .models import Character, CharacterImage


class CharacterImageInline(TabularInline):
    model = CharacterImage
    extra = 1
    fields = ['image', 'caption', 'order']


@admin.register(Character)
class CharacterAdmin(ModelAdmin):
    list_display = ['name', 'status', 'rental_price', 'is_featured', 'rating', 'created_at']
    list_filter = ['status', 'is_featured', 'origin_game']
    search_fields = ['name', 'description']
    list_editable = ['status', 'is_featured']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at', 'updated_at']
    inlines = [CharacterImageInline]
    fieldsets = [
        ('Thông tin cơ bản', {
            'fields': ['name', 'slug', 'description', 'origin_game'],
        }),
        ('Giá & Trạng thái', {
            'fields': ['rental_price', 'status', 'is_featured', 'sizes_available'],
        }),
        ('Hình ảnh & Giao diện', {
            'fields': ['image', 'accent_color'],
        }),
        ('Trang phục', {
            'fields': ['components'],
        }),
        ('Đánh giá', {
            'fields': ['rating', 'review_count'],
        }),
        ('Thời gian', {
            'fields': ['created_at', 'updated_at'],
        }),
    ]


@admin.register(CharacterImage)
class CharacterImageAdmin(ModelAdmin):
    list_display = ['character', 'caption', 'order']
    list_filter = ['character']
