from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

# Custom user with role support
class CustomUser(AbstractUser):
    ROLE_CHOICES = [('chemist', 'Chemist'), ('pharma', 'Pharmaceutical')]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

# ML models uploaded by admin or saved manually
class MLModel(models.Model):
    name = models.CharField(max_length=100)
    file_path = models.FileField(upload_to='models/')  # Upload to /media/models/

    def __str__(self):
        return self.name

# Optional: Through table to allow metadata per selection
class ChemistModelLink(models.Model):
    selection = models.ForeignKey('ChemistModelSelection', on_delete=models.CASCADE)
    ml_model = models.ForeignKey(MLModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.selection.chemist.role != 'chemist':
            raise ValidationError("Only users with role 'chemist' can select models.")


class ChemistModelSelection(models.Model):
    chemist = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    selected_models = models.ManyToManyField(MLModel, through='ChemistModelLink')

    def clean(self):
        if self.chemist.role != 'chemist':
            raise ValidationError("Only users with role 'chemist' can select models.")


# Prediction request from pharmaceutical user
class PharmaPredictionRequest(models.Model):
    pharma_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    features = models.JSONField()
    selected_model = models.ForeignKey(MLModel, on_delete=models.CASCADE)
    prediction_result = models.JSONField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.pharma_user.role != 'pharma':
            raise ValidationError("Only pharmaceutical users can make predictions.")
