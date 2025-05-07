from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
User = get_user_model()
from .models import Drug, DrugRemark

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'user_type')
        extra_kwargs = {
            'password': {'write_only': True},
            'user_type': {'required': True}  # Enforce role selection
        }

    def create(self, validated_data):
        print("Received data:", validated_data)
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            user_type=validated_data.get('user_type')
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'user_type']
        extra_kwargs = {
            'password': {'write_only': True}
        }
# serializers.py
class DrugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drug
        fields = ['id', 'drug_name', 'drug_id']

class DrugRemarkSerializer(serializers.ModelSerializer):
    drug_id = serializers.CharField(source='drug.drug_id', read_only=True)
    drug_name = serializers.CharField(source='drug.drug_name', read_only=True)
    class Meta:
        model = DrugRemark
        fields = '__all__'
    
    def to_internal_value(self, data):
        # Handle decimal separator conversion for float fields
        if 'auc' in data:
            data['auc'] = str(data['auc']).replace(',', '.')
        if 'z_score' in data:
            data['z_score'] = str(data['z_score']).replace(',', '.')
        
        return super().to_internal_value(data)