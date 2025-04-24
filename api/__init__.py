from .model_loader import model_loader

default_app_config = 'api.apps.ApiConfig'

# This will load models when Django starts
try:
    model_loader.load_all_models()
except Exception as e:
    print(f"Failed to load ML models at startup: {str(e)}")