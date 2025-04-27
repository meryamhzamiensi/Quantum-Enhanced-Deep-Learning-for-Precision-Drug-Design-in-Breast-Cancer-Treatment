# api/apps.py
from django.apps import AppConfig
import sys
import logging
from django.conf import settings

logger = logging.getLogger(__name__)

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        """Initialize the application and load ML models when appropriate."""
        if self._should_load_models():
            try:
                self._initialize_model_loader()
            except Exception as e:
                logger.error(f"Error initializing model loader: {str(e)}", exc_info=True)

    def _should_load_models(self):
        """Determine if we should load models based on the command being run."""
        if self._is_management_command():
            return False
        return True

    def _is_management_command(self):
        """Check if we're running a management command that shouldn't load models."""
        commands_to_skip = {
            'makemigrations', 'migrate', 
            'test', 'shell', 'shell_plus',
            'collectstatic', 'createsuperuser'
        }
        return any(cmd in sys.argv for cmd in commands_to_skip)

    def _initialize_model_loader(self):
        """Initialize the model loader with proper error handling."""
        # Import inside function to avoid circular imports during Django init
        from .model_loader import model_loader
        
        logger.info("Starting ML model loading process...")
        model_loader.load_all_models()
        
        loaded_count = len(model_loader.models)
        logger.info(f"Loaded {loaded_count} ML models at startup.")