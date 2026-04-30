from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user model for cosplay shop customers."""

    phone = models.CharField(max_length=20, blank=True, verbose_name='Số điện thoại')
    address = models.TextField(blank=True, verbose_name='Địa chỉ')
    avatar = models.ImageField(
        upload_to='avatars/', blank=True, null=True, verbose_name='Ảnh đại diện'
    )
    is_vip = models.BooleanField(default=False, verbose_name='VIP')

    class Meta:
        verbose_name = 'Người dùng'
        verbose_name_plural = 'Người dùng'

    def __str__(self):
        return self.get_full_name() or self.username
