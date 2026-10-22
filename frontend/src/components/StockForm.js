import React, { useState } from 'react';

const StockForm = ({ onPredict }) => {
    const [ticker, setTicker] = useState('');
    const [timeframe, setTimeframe] = useState('days');

    const handleSubmit = (e) => {
        e.preventDefault();
        onPredict(ticker, timeframe);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
            <div className="mb-3">
                <label htmlFor="ticker" className="form-label">Stock Ticker</label>
                <input
                    type="text"
                    id="ticker"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    className="form-control"
                    placeholder="Enter Stock Ticker"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="timeframe" className="form-label">Prediction Timeframe</label>
                <select 
                    id="timeframe"
                    value={timeframe} 
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="form-select">
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Predict</button>
        </form>
    );
};

export default StockForm;
