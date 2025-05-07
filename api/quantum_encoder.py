import pennylane as qml
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin


# Set up quantum device (using 4 qubits)
n_qubits = 4
dev = qml.device('default.qubit', wires=n_qubits)

# Define quantum circuit for feature embedding
@qml.qnode(dev)
def quantum_circuit(inputs, weights):
    """
    Quantum circuit that processes inputs using data re-uploading technique
    to handle high-dimensional data with limited qubits
    """
    # For high-dimensional data, we'll use a data re-uploading strategy
    # This allows us to process all features through multiple circuit layers
    
    # Calculate number of complete "feature blocks" we need to process all inputs
    # Each qubit can handle one feature at a time, but we reuse qubits for multiple features
    features_per_layer = n_qubits
    
    # Normalize all inputs to range [0, π]
    normalized_inputs = np.clip(inputs, -1, 1) * np.pi
    
    # Process each feature block (data re-uploading technique)
    for start_idx in range(0, len(normalized_inputs), features_per_layer):
        # Get the next block of features (up to features_per_layer)
        end_idx = min(start_idx + features_per_layer, len(normalized_inputs))
        feature_block = normalized_inputs[start_idx:end_idx]
        
        # Pad the block if needed to match qubit count
        if len(feature_block) < features_per_layer:
            feature_block = np.pad(feature_block, (0, features_per_layer - len(feature_block)))
        
        # Encode this block of features into quantum states
        for i in range(features_per_layer):
            qml.RY(feature_block[i], wires=i)
        
        # Apply entangling operations between adjacent qubits
        for i in range(n_qubits-1):
            qml.CNOT(wires=[i, i+1])
    
    # Final parameterized rotation gates controlled by weights
    for i in range(n_qubits):
        qml.RX(weights[i], wires=i)
    
    # Measure all qubits
    return [qml.expval(qml.PauliZ(i)) for i in range(n_qubits)]

# Initialize quantum weights - with proper seed for reproducibility
np.random.seed(42)
quantum_weights = np.random.randn(n_qubits)

def quantum_transform(X_data):
    """
    Transform data using quantum circuit - processing all features
    via data re-uploading technique
    
    Args:
        X_data: Input features (all features will be used)
    """
    # Ensure 2D array input
    if len(X_data.shape) == 1:
        X_data = X_data.reshape(1, -1)
    
    print(f"Processing all {X_data.shape[1]} features through {n_qubits} qubits using data re-uploading")
    
    # Track processing time for large datasets
    import time
    start_time = time.time()
    
    quantum_features = []
    total_samples = X_data.shape[0]
    
    # Process each sample
    for idx, sample in enumerate(X_data):
        # Show progress for large datasets
        if idx % max(1, total_samples // 10) == 0:
            elapsed = time.time() - start_time
            print(f"Processing sample {idx}/{total_samples} ({idx/total_samples*100:.1f}%) - Elapsed: {elapsed:.2f}s")
        
        # Convert sample to numpy array and flatten
        sample = np.array(sample, dtype=np.float32).flatten()
        
        # Get quantum features for this sample using all original features
        quantum_features.append(quantum_circuit(sample, quantum_weights))
    
    print(f"Quantum transformation completed in {time.time() - start_time:.2f} seconds")
    
    # Convert to numpy array - shape will be (n_samples, n_qubits)
    return np.array(quantum_features)
import pennylane as qml
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin

class QuantumNumericalTransformer(BaseEstimator, TransformerMixin):
    def __init__(self, n_qubits=4):
        self.n_qubits = n_qubits
        self.dev = qml.device('default.qubit', wires=n_qubits)
        self.weights = np.random.randn(n_qubits)
        
        # Define the circuit as a bound method
        self.circuit = self._create_circuit()
    
    def _create_circuit(self):
        """Helper method to create the quantum circuit"""
        @qml.qnode(self.dev)
        def circuit(inputs, weights):
            for i in range(self.n_qubits):
                qml.RY(np.pi * inputs[i % len(inputs)], wires=i)
            for i in range(self.n_qubits-1):
                qml.CNOT(wires=[i, i+1])
            for i in range(self.n_qubits):
                qml.RX(weights[i], wires=i)
            return [qml.expval(qml.PauliZ(i)) for i in range(self.n_qubits)]
        return circuit
    
    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        if len(X.shape) == 1:
            X = X.reshape(1, -1)
            
        quantum_features = []
        for sample in X:
            sample = np.array(sample, dtype=np.float32).flatten()
            quantum_features.append(self.circuit(sample, self.weights))
        
        return np.array(quantum_features)