import yfinance as yf
import pandas as pd

def collect_stock_data(ticker, period='5y'):
    stock = yf.Ticker(ticker)
    data = stock.history(period=period)
    return data
