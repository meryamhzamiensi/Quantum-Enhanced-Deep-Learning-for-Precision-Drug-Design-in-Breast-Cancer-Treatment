from django.contrib.auth.models import AbstractUser
from django.db import models
import os
import torch
import joblib
from django.utils import timezone
from backend.settings import MODELS_DIR
import torch.nn as nn
import torch.nn.functional as F

from django.conf import settings
from django.contrib.auth import get_user_model


class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Administrator'),
        ('pharma', 'Pharmaceutical'),
        ('chemist', 'Chemist'),
    ]

    user_type = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
    )
    email = models.EmailField(unique=True)

    REQUIRED_FIELDS = ['user_type']

    def __str__(self):
        return self.email

class ImprovedMLP(nn.Module):
    def __init__(self, input_dim=None, hidden_dims=[128, 64, 32], output_dim=5, dropout_rate=0.3):
        super(ImprovedMLP, self).__init__()
        self.input_dim = input_dim
        self.hidden_dims = hidden_dims
        self.output_dim = output_dim
        self.dropout_rate = dropout_rate

        # Initialize as None, will be built dynamically
        self.fc1 = self.bn1 = self.dropout1 = None
        self.fc2 = self.bn2 = self.dropout2 = None
        self.fc3 = self.bn3 = self.dropout3 = None
        self.output = None

    def build_from_state_dict(self, state_dict):
        """Dynamically build layers based on loaded weights"""
        # Extract input dimension from first layer weights
        self.input_dim = state_dict['fc1.weight'].shape[1]

        # Build network architecture
        self.fc1 = nn.Linear(self.input_dim, self.hidden_dims[0])
        self.bn1 = nn.BatchNorm1d(self.hidden_dims[0])
        self.dropout1 = nn.Dropout(self.dropout_rate)

        self.fc2 = nn.Linear(self.hidden_dims[0], self.hidden_dims[1])
        self.bn2 = nn.BatchNorm1d(self.hidden_dims[1])
        self.dropout2 = nn.Dropout(self.dropout_rate)

        self.fc3 = nn.Linear(self.hidden_dims[1], self.hidden_dims[2])
        self.bn3 = nn.BatchNorm1d(self.hidden_dims[2])
        self.dropout3 = nn.Dropout(self.dropout_rate)

        self.output = nn.Linear(self.hidden_dims[2], self.output_dim)

        # Load weights
        self.load_state_dict(state_dict)
        self.eval()

        # Reinitialize weights
        self._initialize_weights()

    def _initialize_weights(self):
        """Apply appropriate weight initialization to all layers"""
        for m in self.modules():
            if isinstance(m, nn.Linear):
                nn.init.kaiming_normal_(m.weight, mode='fan_in', nonlinearity='relu')
                if m.bias is not None:
                    nn.init.zeros_(m.bias)

    def forward(self, x):
        x = self.fc1(x)
        x = self.bn1(x)
        x = F.relu(x)
        x = self.dropout1(x)

        x = self.fc2(x)
        x = self.bn2(x)
        x = F.relu(x)
        x = self.dropout2(x)

        x = self.fc3(x)
        x = self.bn3(x)
        x = F.relu(x)
        x = self.dropout3(x)

        return self.output(x)


class MLModel(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    model_type = models.CharField(max_length=50, blank=True, null=True)  # 'pytorch', 'sklearn', etc.
    model_architecture = models.CharField(max_length=100, blank=True, null=True)  # 'MLP', 'QuantumEncodedMLP', etc.
    loaded_in_memory = models.BooleanField(default=False)
    last_loaded = models.DateTimeField(blank=True, null=True)

    @property
    def file_path(self):
        # Allow dynamic file extensions: .pkl or .pth
        pkl_path = os.path.join(MODELS_DIR, f"{self.name}.pkl")
        pth_path = os.path.join(MODELS_DIR, f"{self.name}.pth")

        if os.path.exists(pkl_path):
            return pkl_path
        elif os.path.exists(pth_path):
            return pth_path
        return None

    def load_model(self):
        """Load the model into memory and update database record"""
        model_path = self.file_path
        if not model_path:
            raise FileNotFoundError(f"No model file found for {self.name}")

        _, ext = os.path.splitext(model_path)
        model_instance = None

        try:
            if ext == '.pth':
                state_dict = torch.load(model_path, map_location=torch.device('cpu'))
                
                if 'q-en_MLP' in self.name:
                    from api.ml_classes import QuantumEncodedMLP
                    model_instance = QuantumEncodedMLP()
                    self.model_architecture = 'QuantumEncodedMLP'
                else:
                    from api.ml_classes import ImprovedMLP
                    model_instance = ImprovedMLP()
                    self.model_architecture = 'MLP'
                
                model_instance.build_from_state_dict(state_dict)
                self.model_type = 'pytorch'

            elif ext == '.pkl':
                model_instance = joblib.load(model_path)
                self.model_type = 'sklearn'
                self.model_architecture = 'sklearn'

            self.loaded_in_memory = True
            self.last_loaded = timezone.now()
            self.save()
            return model_instance

        except Exception as e:
            self.loaded_in_memory = False
            self.save()
            raise e

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Machine Learning Model"
        verbose_name_plural = "Machine Learning Models"

class Drug(models.Model):
    drug_name = models.CharField(max_length=255)
    drug_id = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return f"{self.drug_name} ({self.drug_id})"

class DrugRemark(models.Model):
    TARGET_PATHWAYS = [
        ('Apoptosis', 'Apoptosis regulation'),
        ('CellCycle', 'Cell cycle'),
        ('HistoneAcetylation', 'Chromatin histone acetylation'),
        ('HistoneMethylation', 'Chromatin histone methylation'),
        ('Cytoskeleton', 'Cytoskeleton'),
        ('DNAReplication', 'DNA replication'),
        ('EGFR', 'EGFR signaling'),
        ('ERKMAPK', 'ERK MAPK signaling'),
        ('GenomeIntegrity', 'Genome integrity'),
        ('PI3KMTOR', 'PI3K/MTOR signaling'),
        ('WNT', 'WNT signaling'),
        ('p53', 'p53 pathway'),
    ]
    
    MSI_STATUS = [
        ('MSS', 'MSS/MSI-L'),
        ('MSI-H', 'MSI-H'),
        ('Unknown', 'Unknown'),
    ]
    
    SCREEN_MEDIUM = [
        ('RPMI', 'RPMI'),
        ('DMEM', 'DMEM'),
        ('EMEM', 'EMEM'),
        ('Other', 'Other'),
    ]
    
    GROWTH_PROPERTIES = [
        ('Suspension', 'Suspension'),
        ('Adherent', 'Adherent'),
        ('Mixed', 'Mixed'),
        ('Other', 'Other'),
    ]

    drug = models.ForeignKey(Drug, on_delete=models.CASCADE, related_name='remarks')
    target = models.CharField(max_length=255)
    target_pathway = models.CharField(max_length=50, choices=TARGET_PATHWAYS)
    cna = models.BooleanField(default=False)
    gene_expression = models.BooleanField(default=False)
    methylation = models.BooleanField(default=False)
    msi_status = models.CharField(max_length=10, choices=MSI_STATUS)
    screen_medium = models.CharField(max_length=10, choices=SCREEN_MEDIUM)
    growth_properties = models.CharField(max_length=10, choices=GROWTH_PROPERTIES)
    auc = models.FloatField()
    z_score = models.FloatField()
    
    def __str__(self):
        return f"{self.drug.drug_name} - {self.target}"