from rest_framework import serializers
from .models.models import MLModel

class PredictionSerializer(serializers.Serializer):
    model_name = serializers.CharField(max_length=100)  # Matches MLModel.name
    features = serializers.DictField(child=serializers.FloatField())

    def validate_model_name(self, value):
        if not MLModel.objects.filter(name=value, is_active=True).exists():
            raise serializers.ValidationError(f"Model '{value}' is not available.")
        return value

    def validate_features(self, value):
        if not value:
            raise serializers.ValidationError("Feature input cannot be empty.")
        if not all(isinstance(v, (float, int)) for v in value.values()):
            raise serializers.ValidationError("All feature values must be numeric.")
        return value


class MLModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MLModel
        fields = ['id', 'name', 'description', 'file_path', 'is_active']
