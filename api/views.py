from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics, permissions, viewsets, serializers  
from .serializers import RegisterSerializer, LoginSerializer, CustomUserSerializer, DrugSerializer, DrugRemarkSerializer
from .models import Drug, DrugRemark,ImprovedMLP
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import MLModel
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
import numpy as np
from backend.settings import MODELS_DIR
import torch
import logging
import api.model_loader
from rest_framework_simplejwt.views import TokenObtainPairView
import joblib
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
logger = logging.getLogger(__name__)
# views.py
import pickle
import torch
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from sklearn.preprocessing import LabelEncoder, StandardScaler
import numpy as np

# Dictionary to keep loaded models in memory to avoid reloading
import joblib
import torch
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
from .models import MLModel

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import joblib
import torch
import pandas as pd
from .models import MLModel
from .quantum_encoder import QuantumNumericalTransformer  # Import your custom transformer


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import os
import pandas as pd
import torch
import joblib
from .models import MLModel

class PredictView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            model_name = request.data.get('model_name')
            features = request.data.get('features')

            if not model_name or not features:
                return Response({'error': 'Model name and features are required'}, status=400)

            model_obj = MLModel.objects.get(name=model_name)
            model_path = model_obj.file_path
            if not model_path:
                return Response({'error': 'Model file not found'}, status=404)

            # Expected feature order
            columns = [
                'DRUG_ID', 'DRUG_NAME', 'TARGET', 'TARGET_PATHWAY',
                'CNA', 'Gene Expression', 'Methylation',
                'Microsatellite instability Status (MSI)', 'Screen Medium',
                'Growth Properties', 'AUC', 'Z_SCORE'
            ]
            input_df = pd.DataFrame([features], columns=columns)

            if model_path.endswith('.pkl'):
                model_pipeline = joblib.load(model_path)

            elif model_path.endswith('.pth'):
                # Your pipeline should be saved using joblib or torch.save(pipeline)
                model_pipeline = torch.load(model_path, map_location=torch.device('cpu'))
            else:
                return Response({'error': 'Unsupported model file type'}, status=400)

            # Convert sparse to dense if necessary
            if hasattr(input_df, "toarray"):
                input_df = input_df.toarray()

            # Prediction
            if hasattr(model_pipeline, 'predict'):
                prediction = model_pipeline.predict(input_df)[0]
            else:
                return Response({'error': 'Model pipeline is not callable for prediction'}, status=500)

            # Optional: hardcoded labels
            class_labels = ['very_low', 'low', 'medium', 'high', 'excellent']
            label = class_labels[int(prediction)] if 0 <= int(prediction) < len(class_labels) else str(prediction)

            return Response({
                'prediction': int(prediction),
                'label': label
            })

        except MLModel.DoesNotExist:
            return Response({'error': 'Model not found in database'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

User = get_user_model()


class RegisterView(TokenObtainPairView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'user_type': user.user_type  
                },
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(TokenObtainPairView):
    def post(self, request):
        username = request.data.get('username', '')  # Instead of email
        password = request.data.get('password', '')
        user_type = request.data.get('user_type', '')
        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'user_type': user.user_type 
                },
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]  # Add this line


    def perform_destroy(self, instance):
        if instance == self.request.user:
            raise serializers.ValidationError("You cannot delete yourself!")
        instance.delete()



class DrugViewSet(viewsets.ModelViewSet):
    queryset = Drug.objects.all()
    serializer_class = DrugSerializer
    permission_classes = [AllowAny]  # Add this line
    lookup_field = 'drug_id'  # Add this line to use drug_id as lookup field

    def perform_destroy(self, instance):
        instance.delete()  # Simplified version

class DrugRemarkViewSet(viewsets.ModelViewSet):
    queryset = DrugRemark.objects.all().select_related('drug')  # Add select_related
    serializer_class = DrugRemarkSerializer
    permission_classes = [AllowAny]  # Add this line

    



