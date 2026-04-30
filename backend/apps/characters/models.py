import uuid
from django.db import models
from django.utils.text import slugify


class Character(models.Model):
    """Cosplay character/costume available for rental."""

    STATUS_CHOICES = [
        ('Available', 'Còn hàng'),
        ('In Stock', 'Trong kho'),
        ('Limited Availability', 'Số lượng có hạn'),
        ('Out of Stock', 'Hết hàng'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, verbose_name='Tên nhân vật')
    slug = models.SlugField(max_length=200, unique=True, blank=True, verbose_name='Slug')
    description = models.TextField(blank=True, verbose_name='Mô tả')
    status = models.CharField(
        max_length=30, choices=STATUS_CHOICES, default='Available',
        verbose_name='Trạng thái'
    )
    rental_price = models.DecimalField(
        max_digits=10, decimal_places=0, verbose_name='Giá thuê (k/ngày)'
    )
    accent_color = models.CharField(
        max_length=7, default='#7C3AED', verbose_name='Màu chủ đạo'
    )
    image = models.ImageField(
        upload_to='characters/', blank=True, verbose_name='Ảnh chính'
    )
    components = models.JSONField(
        default=list, blank=True,
        help_text='Danh sách thành phần trang phục [{"icon": "🎩", "name": "Mũ"}]',
        verbose_name='Thành phần trang phục'
    )
    rating = models.DecimalField(
        max_digits=2, decimal_places=1, default=5.0, verbose_name='Đánh giá'
    )
    review_count = models.IntegerField(default=0, verbose_name='Số đánh giá')
    sizes_available = models.JSONField(
        default=list, blank=True,
        help_text='Danh sách size ["S", "M", "L", "XL"]',
        verbose_name='Size có sẵn'
    )
    origin_game = models.CharField(
        max_length=100, blank=True, verbose_name='Game/Anime gốc'
    )
    is_featured = models.BooleanField(default=False, verbose_name='Nổi bật')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Ngày tạo')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Cập nhật')

    class Meta:
        ordering = ['-is_featured', '-created_at']
        verbose_name = 'Nhân vật'
        verbose_name_plural = 'Nhân vật'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
            # Ensure unique slug
            original_slug = self.slug
            counter = 1
            while Character.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
                self.slug = f'{original_slug}-{counter}'
                counter += 1
        super().save(*args, **kwargs)


class CharacterImage(models.Model):
    """Additional images for a character gallery."""

    character = models.ForeignKey(
        Character, on_delete=models.CASCADE, related_name='gallery',
        verbose_name='Nhân vật'
    )
    image = models.ImageField(upload_to='characters/gallery/', verbose_name='Ảnh')
    caption = models.CharField(max_length=200, blank=True, verbose_name='Chú thích')
    order = models.IntegerField(default=0, verbose_name='Thứ tự')

    class Meta:
        ordering = ['order']
        verbose_name = 'Ảnh bổ sung'
        verbose_name_plural = 'Ảnh bổ sung'

    def __str__(self):
        return f'{self.character.name} - Ảnh {self.order}'
