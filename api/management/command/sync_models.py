# api/management/commands/sync_models.py
from django.core.management.base import BaseCommand
import os
from api.models import MLModel
from backend.settings import MODELS_DIR


class Command(BaseCommand):
    help = 'Synchronizes database with physical model files'

    def handle(self, *args, **options):
        # Get all .pkl files in models directory
        model_files = [f for f in os.listdir(MODELS_DIR) if f.endswith('.pkl')]

        for model_file in model_files:
            model_name = os.path.splitext(model_file)[0]
            MLModel.objects.get_or_create(
                name=model_name,
                defaults={
                    'description': f"Automatically registered {model_name} model"
                }
            )
            self.stdout.write(f"Registered model: {model_name}")

        # Deactivate models that no longer exist
        MLModel.objects.exclude(
            name__in=[os.path.splitext(f)[0] for f in model_files]
        ).update(is_active=False)