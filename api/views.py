from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics, permissions
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import MLModel
from .models import CustomUser
import numpy as np
import joblib
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

class PredictView(APIView):
    def post(self, request):
        # Get model name and input data from request
        model_name = request.data.get('model')
        input_data = request.data.get('features')

        # Validate input
        if not model_name or not input_data:
            return Response(
                {'error': 'Both model name and features are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # 1. Get model from database
            ml_model = MLModel.objects.get(name=model_name, is_active=True)

            # 2. Load the model file
            model = joblib.load(ml_model.file_path)

            # 3. Prepare input data (convert to numpy array)
            try:
                input_array = np.array(input_data).reshape(1, -1)
            except ValueError as e:
                return Response(
                    {'error': f'Invalid input format: {str(e)}'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # 4. Make prediction
            prediction = model.predict(input_array)

            # 5. Return prediction
            return Response({
                'model': model_name,
                'prediction': prediction.tolist(),
                'model_description': ml_model.description
            })

        except MLModel.DoesNotExist:
            return Response(
                {'error': f'Model {model_name} not found or not active'},
                status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            return Response(
                {'error': f'Prediction failed: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

User = get_user_model()


class RegisterView(APIView):
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


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username', '')  # Instead of email
        password = request.data.get('password', '')
        user_type = request.data.get('user_type', '')
        user = authenticate(username=username, password=password, user_type=user_type)

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


