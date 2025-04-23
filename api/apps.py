from django.apps import AppConfig
import logging

logger = logging.getLogger(__name__)

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        try:
            from .model_loader import ModelLoader
            ModelLoader.load_models()
            logger.info("ML models loaded successfully at startup.")
        except Exception as e:
            logger.error(f"Failed to load ML models at startup: {e}")
