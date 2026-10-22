import React, { useState } from 'react';
import StockForm from './StockForm';
import PredictionResult from './PredictionResult';

const StockPrediction = () => {
    const [prediction, setPrediction] = useState(null);
    const [timeframe, setTimeframe] = useState('days');

    const handlePredict = async (ticker, selectedTimeframe) => {
        setTimeframe(selectedTimeframe);  // Store the selected timeframe
        console.log(`Predicting for ticker: ${ticker} with timeframe: ${selectedTimeframe}`);
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ features: ticker, timeframe: selectedTimeframe }),
            });

            console.log('Response:', response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Data:', data);
            setPrediction(data.prediction);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <StockForm onPredict={handlePredict} />
            {prediction && <PredictionResult prediction={prediction} timeframe={timeframe} />}
        </div>
    );
};

export default StockPrediction;
