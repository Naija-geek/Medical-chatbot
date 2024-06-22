import torch
import torch.nn as nn


class NeuralNet(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
       
        # Initializes a new instance of the NeuralNet class.
    
        # Parameters:
        # - input_size (int): The number of input features.
        # - hidden_size (int): The number of neurons in each hidden layer.
        # - num_classes (int): The number of output classes.
    
        # Returns:
        # - None
        
        super(NeuralNet, self).__init__()
        self.l1 = nn.Linear(input_size, hidden_size)  # First linear layer
        self.l2 = nn.Linear(hidden_size, hidden_size)  # Second linear layer
        self.l3 = nn.Linear(hidden_size, num_classes)  # Output linear layer
        self.relu = nn.ReLU()  # ReLU activation function
    
    def forward(self, x):
        out = self.l1(x)
        out = self.relu(out)
        out = self.l2(out)
        out = self.relu(out)
        out = self.l3(out)
        # no activation and no softmax at the end
        return out
