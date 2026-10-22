import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faShieldAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import './Features.css';

const Features = () => {
    const iconStyle = { color: "rgb(0, 21, 36)" };

    return (
        <div className="container my-5">
            <div className="row text-center">
                <div className="col-lg-4 col-md-6 mb-4">
                    <FontAwesomeIcon icon={faChartLine} size="3x" style={iconStyle} className="feature-icon" />
                    <h4 className="mt-3">Real-Time Data</h4>
                    <p>Get the latest stock data to make informed decisions.</p>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <FontAwesomeIcon icon={faShieldAlt} size="3x" style={iconStyle} className="feature-icon" />
                    <h4 className="mt-3">Secure</h4>
                    <p>Your data and predictions are always secure with us.</p>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <FontAwesomeIcon icon={faTachometerAlt} size="3x" style={iconStyle} className="feature-icon" />
                    <h4 className="mt-3">Fast and Efficient</h4>
                    <p>Our algorithms ensure quick and accurate predictions.</p>
                </div>
            </div>
        </div>
    );
};

export default Features;
