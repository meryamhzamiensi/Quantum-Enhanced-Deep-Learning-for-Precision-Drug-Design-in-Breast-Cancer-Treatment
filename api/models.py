from django.contrib.auth.models import AbstractUser
from django.db import models
import os
from django.utils import timezone
from backend.settings import MODELS_DIR

class CustomUser(AbstractUser):
    USER_TYPES = (
        ('ADMIN', 'Admin'),
        ('PHARMA', 'Pharmaceutical'),
        ('CHEMIST', 'Chemist'),
    )
    user_type = models.CharField(
        max_length=10,
        choices=USER_TYPES,
        default='ADMIN'  # Important default value
    )
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


class MLModel(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    @property
    def file_path(self):
        return os.path.join(MODELS_DIR, f"{self.name}.pkl")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Machine Learning Model"
        verbose_name_plural = "Machine Learning Models"