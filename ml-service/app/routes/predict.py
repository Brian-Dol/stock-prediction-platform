from flask import Blueprint, request, jsonify
import yfinance as yf

predict_bp = Blueprint('predict', __name__)

@predict_bp.route('/predict', methods=['POST'])
def predict():
    data = request.json
    ticker = data['features']
    timeframe = data.get('timeframe', 'days')
    
    # Log the received parameters
    print(f"Received ticker: {ticker}, timeframe: {timeframe}")
    
    # Map user-friendly timeframes to yfinance periods
    periods = {
        'days': '5d',
        'weeks': '5wk',
        'months': '5mo',
        'years': '5y'
    }

    period = periods.get(timeframe, '5d')

    # Use yfinance to fetch stock data
    stock = yf.Ticker(ticker)
    history = stock.history(period=period)
    
    # Log the fetched data
    print(f"Fetched data: {history}")

    # Return a simple JSON response with the closing prices
    prediction = list(history['Close'])
    return jsonify({'prediction': prediction})
