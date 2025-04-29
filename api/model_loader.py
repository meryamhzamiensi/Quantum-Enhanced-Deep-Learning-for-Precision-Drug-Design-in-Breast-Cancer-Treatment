import os
import logging
import sys
import pickle  # For loading .pkl models
import torch   # For loading .pth models (if using PyTorch)
from django.conf import settings
from .models import MLModel

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

logger = logging.getLogger(__name__)

class ModelLoader:
    def __init__(self):
        self.models = {}  # Dictionary to store loaded models
        self._models_loaded = False

    def load_all_models(self):
        """
        Load all models from the filesystem and synchronize them with the database.
        """
        if self._models_loaded:
            return

        try:
            self._sync_and_load_models()
            self._models_loaded = True
        except Exception as e:
            logger.error(f"Failed to load models: {str(e)}", exc_info=True)
            raise

    def _sync_and_load_models(self):
        """
        Synchronize the database with the filesystem and load models into memory.
        """
        models_dir = os.path.join(settings.BASE_DIR, 'api', 'models')
        
        if not os.path.isdir(models_dir):
            logger.warning(f"Models directory not found: {models_dir}")
            return

        # Synchronize the database with the filesystem
        self._sync_db_with_filesystem(models_dir)

        # Load models from the filesystem into memory
        for model_record in MLModel.objects.filter(is_active=True):
            model_name = model_record.name
            model_path_pkl = os.path.join(models_dir, f"{model_name}.pkl")
            model_path_pth = os.path.join(models_dir, f"{model_name}.pth")

            try:
                if os.path.exists(model_path_pkl):
                    # Load .pkl model
                    with open(model_path_pkl, 'rb') as f:
                        self.models[model_name] = pickle.load(f)
                        logger.info(f"Loaded model {model_name} from {model_path_pkl}")
                elif os.path.exists(model_path_pth):
                    # Load .pth model (PyTorch)
                    self.models[model_name] = torch.load(model_path_pth)
                    logger.info(f"Loaded model {model_name} from {model_path_pth}")
                else:
                    logger.warning(f"Model file not found for {model_name}")
            except Exception as e:
                logger.error(f"Failed to load model {model_name}: {str(e)}")

    def _sync_db_with_filesystem(self, models_dir):
        """
        Synchronize the database with the filesystem.
        This method ensures that the database reflects the models available in the filesystem.
        """
        logger.info(f"Synchronizing database with filesystem at {models_dir}")
        model_files = set()
        for filename in os.listdir(models_dir):
            if os.path.isfile(os.path.join(models_dir, filename)):
                model_name, ext = os.path.splitext(filename)
                if ext in ('.pkl', '.pth'):
                    model_files.add(model_name)

        # Get all models in the database
        db_models = set(MLModel.objects.values_list('name', flat=True))

        # Add new models to the database
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
        """
        Get a loaded model by name.
        """
        return self.models.get(name)

    def get_db_model(self, name):
        """
        Get the database record for a model.
        """
        try:
            return MLModel.objects.get(name=name)
        except MLModel.DoesNotExist:
            return None

# Singleton instance for use across the app
model_loader = ModelLoader()