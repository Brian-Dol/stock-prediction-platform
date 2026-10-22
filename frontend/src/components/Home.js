import React from 'react';
import { Link } from 'react-router-dom';
import Features from './Features';


const Home = () => {
    const heroSectionStyle = {
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    };

    const heroContentStyle = {
        background: "rgba(0, 0, 0, 0.6)",
        padding: "2rem",
        borderRadius: "10px"
    };

    return (
        <div>
            <div style={heroSectionStyle} className="hero-section">
                <div style={heroContentStyle} className="hero-content text-center text-white">
                    <h1 className="display-4">Predict the Future of Stocks</h1>
                    <p className="lead">Accurate and real-time stock predictions at your fingertips.</p>
                    <Link to="/predict" className="btn btn-light btn-lg">Get Started</Link>
                </div>
            </div>
            <Features />
        </div>
    );
};

export default Home;
