# api/ml_classes.py
import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from .quantum_encoder import quantum_transform  # import your quantum function


class CustomDecisionTree(DecisionTreeClassifier):
    def __init__(self, criterion='gini', max_depth=None, random_state=None):
        super(CustomDecisionTree, self).__init__(criterion=criterion, max_depth=max_depth, random_state=random_state)
class CustomRandomForest(RandomForestClassifier):
    def __init__(self, n_estimators=100, max_depth=None, random_state=None):
        super(CustomRandomForest, self).__init__(n_estimators=n_estimators, max_depth=max_depth, random_state=random_state)



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


class QuantumEncodedMLP(nn.Module):
    def __init__(self, hidden_dims=[128, 64, 32], output_dim=5, dropout_rate=0.3):
        super(QuantumEncodedMLP, self).__init__()
        self.input_dim = 4  # Because your quantum circuit returns 4 features (4 qubits)
        self.hidden_dims = hidden_dims
        self.output_dim = output_dim
        self.dropout_rate = dropout_rate

        # Define the network
        self.fc1 = nn.Linear(self.input_dim, hidden_dims[0])
        self.bn1 = nn.BatchNorm1d(hidden_dims[0])
        self.dropout1 = nn.Dropout(dropout_rate)

        self.fc2 = nn.Linear(hidden_dims[0], hidden_dims[1])
        self.bn2 = nn.BatchNorm1d(hidden_dims[1])
        self.dropout2 = nn.Dropout(dropout_rate)

        self.fc3 = nn.Linear(hidden_dims[1], hidden_dims[2])
        self.bn3 = nn.BatchNorm1d(hidden_dims[2])
        self.dropout3 = nn.Dropout(dropout_rate)

        self.output = nn.Linear(hidden_dims[2], output_dim)

    def forward(self, x):
        if isinstance(x, torch.Tensor):
            x_np = x.detach().cpu().numpy()
        else:
            x_np = np.array(x)

        # Apply quantum transformation
        x_q = quantum_transform(x_np)

        # Convert back to torch tensor
        x = torch.tensor(x_q, dtype=torch.float32)

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


