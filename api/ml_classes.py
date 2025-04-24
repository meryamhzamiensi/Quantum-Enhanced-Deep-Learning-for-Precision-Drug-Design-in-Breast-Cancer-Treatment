# api/ml_classes.py
import torch
import torch.nn as nn
import torch.nn.functional as F
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

class CustomDecisionTree(DecisionTreeClassifier):
    pass
class CustomRandomForest(RandomForestClassifier):
    pass



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
