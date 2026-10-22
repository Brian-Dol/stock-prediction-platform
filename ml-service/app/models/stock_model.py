from sklearn.linear_model import LinearRegression
import pandas as pd
import pickle

def train_model(data):
    X = data[['Return']].values
    y = data['Close'].values
    model = LinearRegression()
    model.fit(X, y)
    with open('model.pkl', 'wb') as f:
        pickle.dump(model, f)
    return model

def load_model():
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    return model
