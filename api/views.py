from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models.models import CustomUser, MLModel, ChemistModelSelection, PharmaPredictionRequest
from .serializers import MLModelSerializer
from .model_loader import ModelLoader

class ChemistModelSelectionView(APIView):
    def post(self, request):
        chemist_id = request.data.get('chemist_id')
        model_ids = request.data.get('model_ids')  # e.g., [1, 3]

        chemist = get_object_or_404(CustomUser, id=chemist_id, role='chemist')
        selected_models = MLModel.objects.filter(id__in=model_ids)

        selection, _ = ChemistModelSelection.objects.get_or_create(chemist=chemist)
        selection.selected_models.set(selected_models)

        return Response({"status": "Models selected successfully"}, status=status.HTTP_200_OK)


class ActiveModelsListView(APIView):
    def get(self, request):
        active_models = MLModel.objects.filter(is_active=True)
        serializer = MLModelSerializer(active_models, many=True)
        return Response(serializer.data)


class PharmaPredictionView(APIView):
    def post(self, request):
        user = get_object_or_404(CustomUser, id=request.data.get('user_id'), role='pharma')
        features = request.data.get('features')
        model_id = request.data.get('model_id')

        if not features or not model_id:
            return Response({"error": "Missing features or model_id"}, status=status.HTTP_400_BAD_REQUEST)

        model_obj = get_object_or_404(MLModel, id=model_id)
        model = ModelLoader.get_model(model_obj.name)
        if model is None:
            return Response({"error": "Model not loaded or available"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            # Make sure the features match model expectation
            feature_list = [features[k] for k in sorted(features.keys())]  # Order matters!
            prediction = model.predict([feature_list])
        except Exception as e:
            return Response({"error": f"Prediction failed: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        PharmaPredictionRequest.objects.create(
            pharma_user=user,
            features=features,
            selected_model=model_obj,
            prediction_result={"output": prediction[0]}
        )

        return Response({"prediction": prediction[0]}, status=status.HTTP_200_OK)
