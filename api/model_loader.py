import os
import joblib
import logging
from django.conf import settings
from .models.models import MLModel
from django.db import OperationalError, ProgrammingError
logger = logging.getLogger(__name__)

class ModelLoader:
    _models = {}

    @classmethod
    def load_models(cls):
        cls._models = {}  # Clear cache
        try:
            active_models = MLModel.objects.filter(is_active=True)
            for ml_model in active_models:
                try:
                    full_path = os.path.join(
                        settings.BASE_DIR,
                        ml_model.file_path.name if hasattr(ml_model.file_path, 'name') else ml_model.file_path
                    )
                    cls._models[ml_model.name] = joblib.load(full_path)
                    logger.info(f"Loaded model: {ml_model.name} from {full_path}")
                except Exception as e:
                    logger.error(f"Error loading model {ml_model.name}: {e}")
        except (OperationalError, ProgrammingError) as db_error:
            logger.warning(f"Skipping ML model loading: {db_error}")


    @classmethod
    def get_model(cls, name):
        model = cls._models.get(name)
        if model is None:
            logger.warning(f"Model {name} not found in cache.")
        return model
