# api/apps.py

from django.apps import AppConfig
import sys
import logging

logger = logging.getLogger(__name__)

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        # Avoid model loading during migrations or tests
        if 'runserver' in sys.argv or 'gunicorn' in sys.argv:
            from .model_loader import model_loader
            try:
                model_loader.load_all_models()
                logger.info("Successfully loaded all ML models at startup.")
            except Exception as e:
                logger.error(f"Failed to load ML models at startup: {str(e)}")
