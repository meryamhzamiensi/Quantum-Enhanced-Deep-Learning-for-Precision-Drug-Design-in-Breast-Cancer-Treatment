# api/model_loader.py
import torch
from api.models.models import QNNModel  # Import your model class
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models/qnn_gdsc_model.pth')

def load_model():
    try:
        model = QNNModel()  # Initialize model
        model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device('cpu')))  # Load weights
        model.eval()  # Set to evaluation mode
        print("✅ Model loaded successfully")
        return model
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return None

# Load model when Django starts
ai_model = load_model()