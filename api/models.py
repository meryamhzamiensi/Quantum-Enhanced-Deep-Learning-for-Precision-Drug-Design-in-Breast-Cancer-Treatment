from django.contrib.auth.models import AbstractUser
from django.db import models
import os
import torch
import joblib
from django.utils import timezone
from backend.settings import MODELS_DIR


class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Administrator'),
        ('pharma', 'Pharmaceutical'),
        ('chemist', 'Chemist'),
    ]

    user_type = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='admin'
    )
    email = models.EmailField(unique=True)

    REQUIRED_FIELDS = ['user_type']

    def __str__(self):
        return self.email


class MLModel(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    model_type = models.CharField(max_length=50, blank=True, null=True)  # 'pytorch', 'sklearn', etc.
    model_architecture = models.CharField(max_length=100, blank=True, null=True)  # 'MLP', 'QuantumEncodedMLP', etc.
    loaded_in_memory = models.BooleanField(default=False)
    last_loaded = models.DateTimeField(blank=True, null=True)

    @property
    def file_path(self):
        # Allow dynamic file extensions: .pkl or .pth
        pkl_path = os.path.join(MODELS_DIR, f"{self.name}.pkl")
        pth_path = os.path.join(MODELS_DIR, f"{self.name}.pth")

        if os.path.exists(pkl_path):
            return pkl_path
        elif os.path.exists(pth_path):
            return pth_path
        return None

    def load_model(self):
        """Load the model into memory and update database record"""
        model_path = self.file_path
        if not model_path:
            raise FileNotFoundError(f"No model file found for {self.name}")

        _, ext = os.path.splitext(model_path)
        model_instance = None

        try:
            if ext == '.pth':
                state_dict = torch.load(model_path, map_location=torch.device('cpu'))
                
                if 'q-en_MLP' in self.name:
                    from api.ml_classes import QuantumEncodedMLP
                    model_instance = QuantumEncodedMLP()
                    self.model_architecture = 'QuantumEncodedMLP'
                else:
                    from api.ml_classes import ImprovedMLP
                    model_instance = ImprovedMLP()
                    self.model_architecture = 'MLP'
                
                model_instance.build_from_state_dict(state_dict)
                self.model_type = 'pytorch'

            elif ext == '.pkl':
                model_instance = joblib.load(model_path)
                self.model_type = 'sklearn'
                self.model_architecture = 'sklearn'

            self.loaded_in_memory = True
            self.last_loaded = timezone.now()
            self.save()
            return model_instance

        except Exception as e:
            self.loaded_in_memory = False
            self.save()
            raise e

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Machine Learning Model"
        verbose_name_plural = "Machine Learning Models"