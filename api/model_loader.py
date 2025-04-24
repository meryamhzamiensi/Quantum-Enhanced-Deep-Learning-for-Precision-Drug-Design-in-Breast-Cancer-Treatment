# api/model_loader.py

import os
import sys
import logging
import joblib
import torch
from django.conf import settings

# Ensure project path is available for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api.ml_classes import ImprovedMLP

logger = logging.getLogger(__name__)

class ModelLoader:
    def __init__(self):
        self.models = {}

    def load_all_models(self):
        models_dir = os.path.join(settings.BASE_DIR, 'api', 'models')

        if not os.path.isdir(models_dir):
            logger.warning(f"Models directory not found: {models_dir}")
            return

        for filename in os.listdir(models_dir):
            model_name, ext = os.path.splitext(filename)
            model_path = os.path.join(models_dir, filename)

            # Skip directories like __pycache__
            if not os.path.isfile(model_path):
                continue

            try:
                if ext == '.pth' and 'MLP' in model_name:
                    # Load PyTorch model from state_dict
                    state_dict = torch.load(model_path, map_location='cpu')
                    model = ImprovedMLP()
                    model.build_from_state_dict(state_dict)
                    self.models[model_name] = model
                    logger.info(f"Loaded PyTorch model (ImprovedMLP): {model_name}")

                elif ext == '.pkl':
                    # Load sklearn model
                    model = joblib.load(model_path)
                    self.models[model_name] = model
                    logger.info(f"Loaded sklearn model: {model_name}")

                else:
                    logger.warning(f"Unknown model format: {filename}")

            except Exception as e:
                logger.error(f"Failed to load model {model_name}: {str(e)}")

    def get_model(self, name):
        return self.models.get(name, None)

# Singleton instance for use across the app
model_loader = ModelLoader()
