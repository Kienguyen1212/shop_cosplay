import uuid
from django.db import models
from django.conf import settings
from apps.characters.models import Character


class Order(models.Model):
    """Rental order for cosplay costumes."""

    STATUS_CHOICES = [
        ('Pending', 'Chờ xử lý'),
        ('Confirmed', 'Đã xác nhận'),
        ('Shipped', 'Đang giao'),
        ('Active', 'Đang thuê'),
        ('Returned', 'Đã trả'),
        ('Cancelled', 'Đã hủy'),
    ]

    PAYMENT_CHOICES = [
        ('bank_transfer', 'Chuyển khoản'),
        ('momo', 'Momo'),
        ('zalopay', 'ZaloPay'),
        ('cash', 'Tiền mặt'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
        null=True, blank=True, related_name='orders',
        verbose_name='Khách hàng'
    )
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='Pending',
        verbose_name='Trạng thái'
    )
    total_amount = models.DecimalField(
        max_digits=12, decimal_places=0, default=0,
        verbose_name='Tổng tiền (k)'
    )
    deposit_amount = models.DecimalField(
        max_digits=12, decimal_places=0, default=0,
        verbose_name='Tiền cọc (k)'
    )
    payment_method = models.CharField(
        max_length=20, choices=PAYMENT_CHOICES, default='bank_transfer',
        verbose_name='Phương thức thanh toán'
    )
    rental_start = models.DateField(verbose_name='Ngày bắt đầu thuê')
    rental_end = models.DateField(verbose_name='Ngày trả')
    notes = models.TextField(blank=True, verbose_name='Ghi chú')

    # Customer info (for guest checkout or override)
    customer_name = models.CharField(max_length=200, verbose_name='Tên khách hàng')
    customer_phone = models.CharField(max_length=20, verbose_name='Số điện thoại')
    customer_email = models.EmailField(blank=True, verbose_name='Email')
    customer_address = models.TextField(verbose_name='Địa chỉ giao hàng')

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Ngày đặt')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Cập nhật')

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Đơn thuê'
        verbose_name_plural = 'Đơn thuê'

    def __str__(self):
        return f'#{str(self.id)[:8]} - {self.customer_name}'

    @property
    def rental_days(self):
        return (self.rental_end - self.rental_start).days + 1


class OrderItem(models.Model):
    """Individual item in a rental order."""

    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='items',
        verbose_name='Đơn hàng'
    )
    character = models.ForeignKey(
        Character, on_delete=models.SET_NULL, null=True,
        verbose_name='Nhân vật'
    )
    size = models.CharField(max_length=10, verbose_name='Size')
    daily_price = models.DecimalField(
        max_digits=10, decimal_places=0, verbose_name='Giá/ngày (k)'
    )
    rental_days = models.IntegerField(verbose_name='Số ngày thuê')
    subtotal = models.DecimalField(
        max_digits=12, decimal_places=0, verbose_name='Thành tiền (k)'
    )

    class Meta:
        verbose_name = 'Chi tiết đơn'
        verbose_name_plural = 'Chi tiết đơn'

    def __str__(self):
        return f'{self.character.name if self.character else "N/A"} - Size {self.size}'

    def save(self, *args, **kwargs):
        self.subtotal = self.daily_price * self.rental_days
        super().save(*args, **kwargs)
