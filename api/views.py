from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .model_loader import ai_model
import numpy as np
import torch

@api_view(['POST'])
def predict(request):
    if not ai_model:
        return Response({"error": "Model not loaded"}, status=500)
    
    try:
        # Preprocess input (adapt to your model)
        input_data = np.array(request.data["input"]).astype(np.float32)
        input_tensor = torch.from_numpy(input_data)
        
        # Predict
        with torch.no_grad():
            output = ai_model(input_tensor)
        
        # Postprocess output
        result = output.numpy().tolist()
        return Response({"result": result})
    except Exception as e:
        return Response({"error": str(e)}, status=400)