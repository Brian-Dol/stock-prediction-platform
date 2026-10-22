import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components and scales
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const getLabels = (timeframe) => {
    switch (timeframe) {
        case 'days':
            return ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
        case 'weeks':
            return ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
        case 'months':
            return ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'];
        case 'years':
            return ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
        default:
            return [];
    }
};

const PredictionResult = ({ prediction, timeframe }) => {
    const labels = getLabels(timeframe);

    useEffect(() => {
        return () => {
            // Properly destroy all chart instances
            Object.values(ChartJS.instances).forEach(instance => {
                instance.destroy();
            });
        };
    }, [prediction]);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Stock Price',
                data: prediction,  // Ensure prediction is an array of prices
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                display: true,
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                type: 'linear',
                display: true,
                title: {
                    display: true,
                    text: 'Price (USD)'
                }
            }
        }
    };

    return (
        <div>
            <h2>Prediction Result</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default PredictionResult;
