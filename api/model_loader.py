import os
import logging
import sys
from django.conf import settings
from .models import MLModel

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

logger = logging.getLogger(__name__)

class ModelLoader:
    def __init__(self):
        self.models = {}
        self._models_loaded = False

    def load_all_models(self):
        if self._models_loaded:
            return

        try:
            from .models import MLModel  # Import here to avoid circular imports
            self._sync_and_load_models()
            self._models_loaded = True
        except Exception as e:
            logger.error(f"Failed to load models: {str(e)}", exc_info=True)
            raise

    def _sync_and_load_models(self):
        """Actual model loading implementation"""
        from .models import MLModel  # Local import
        
        models_dir = os.path.join(settings.BASE_DIR, 'api', 'models')
        
        if not os.path.isdir(models_dir):
            logger.warning(f"Models directory not found: {models_dir}")
            return

        self._sync_db_with_filesystem(models_dir)
        model_files = set()
        for filename in os.listdir(models_dir):
            if os.path.isfile(os.path.join(models_dir, filename)):
                model_name, ext = os.path.splitext(filename)
                if ext in ('.pkl', '.pth'):
                    model_files.add(model_name)

        # Get all models in database
        db_models = set(MLModel.objects.values_list('name', flat=True))

        # Add new models to database
        for model_name in model_files - db_models:
            try:
                MLModel.objects.create(
                    name=model_name,
                    description=f"Automatically created for {model_name}",
                    is_active=True
                )
                logger.info(f"Created new database record for model {model_name}")
            except Exception as e:
                logger.error(f"Failed to create record for {model_name}: {str(e)}")

        # Mark missing files as inactive
        for model_name in db_models - model_files:
            try:
                MLModel.objects.filter(name=model_name).update(is_active=False)
                logger.warning(f"Marked missing model {model_name} as inactive")
            except Exception as e:
                logger.error(f"Failed to update status for {model_name}: {str(e)}")

    def get_model(self, name):
        """Get a loaded model by name"""
        return self.models.get(name)

    def get_db_model(self, name):
        """Get the database record for a model"""
        try:
            return MLModel.objects.get(name=name)
        except MLModel.DoesNotExist:
            return None

# Singleton instance for use across the app
model_loader = ModelLoader()