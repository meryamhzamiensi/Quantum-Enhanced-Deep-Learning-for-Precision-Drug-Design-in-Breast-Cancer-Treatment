from django.db import models
import torch
import torch.nn as nn
import pennylane as qml

# Create your models here.
class QNNModel(nn.Module):
    def __init__(self, n_qubits, n_layers, n_classes):
        super(QNNModel, self).__init__()
        self.n_qubits = n_qubits
        self.n_layers = n_layers

        # Initialize random quantum circuit weights
        weight_shapes = {"weights": (n_layers, n_qubits, 3)}
        self.qlayer = qml.qnn.TorchLayer(quantum_circuit, weight_shapes)

        # Classical post-processing layers
        self.post_processing = nn.Sequential(
            nn.Linear(n_qubits, 32),  # Input size should match n_qubits
            nn.ReLU(),
            nn.Linear(32, n_classes)
        )

    def forward(self, x):
        # Make sure input features match the number of qubits
        # Pad or truncate as necessary
        batch_size = x.shape[0]
        # Pad with zeros if x has fewer features than n_qubits
        x_padded = torch.zeros(batch_size, self.n_qubits, device=x.device)
        x_padded[:, :x.shape[1]] = x[:, :self.n_qubits]

        # Apply the quantum layer, processing each input individually
        quantum_outputs = []
        for i in range(batch_size):
            quantum_output = self.qlayer(x_padded[i])  # Process one input at a time
            quantum_outputs.append(quantum_output)

        # Stack the quantum outputs
        x = torch.stack(quantum_outputs)

        # Apply classical post-processing
        return self.post_processing(x)
    
# Define the quantum device
n_qubits = 6  # Adjust based on feature dimensionality after preprocessing
dev = qml.device("default.qubit", wires=n_qubits)

# Define the quantum circuit for the QNN
@qml.qnode(dev, interface="torch")
def quantum_circuit(inputs, weights):
    # Encode the classical input data into quantum states
    for i in range(n_qubits):
        qml.RY(inputs[i], wires=i)

    # Entangling layers
    for layer in range(2):  # Using 2 layers for entanglement
        # Apply parameterized rotation gates
        for i in range(n_qubits):
            qml.RX(weights[layer][i][0], wires=i)
            qml.RY(weights[layer][i][1], wires=i)
            qml.RZ(weights[layer][i][2], wires=i)

        # Apply entangling gates (CZ gates between adjacent qubits)
        for i in range(n_qubits - 1):
            qml.CZ(wires=[i, i + 1])
        if n_qubits > 2:  # Connect the last qubit with the first one to form a ring
            qml.CZ(wires=[n_qubits - 1, 0])

    # Measure the expectation values of Z operators
    return [qml.expval(qml.PauliZ(i)) for i in range(n_qubits)]