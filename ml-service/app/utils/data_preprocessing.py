import pandas as pd

def preprocess_data(data):
    data = data.dropna()
    data['Return'] = data['Close'].pct_change()
    data = data.dropna()
    return data
