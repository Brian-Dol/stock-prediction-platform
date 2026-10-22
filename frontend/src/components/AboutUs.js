import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faUsers, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
    const heroSectionStyle = {
        backgroundImage: "url('/about-hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        color: "white"
    };

    const heroContentStyle = {
        background: "rgba(0, 0, 0, 0.6)",
        padding: "2rem",
        borderRadius: "10px",
        textAlign: "center"
    };

    const containerStyle = {
        padding: "2rem"
    };

    const horizontalContainerStyle = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexWrap: "wrap" // Ensures it wraps on smaller screens
    };

    const sectionStyle = {
        width: "30%",
        margin: "10px",
        textAlign: "center"
    };

    const iconStyle = { color: "rgb(0, 21, 36)", marginBottom: "10px" };

    return (
        <div>
            <div style={heroSectionStyle} className="hero-section">
                <div style={heroContentStyle} className="hero-content">
                    <h1>About Us</h1>
                    <p>We strive to provide the most accurate and real-time stock predictions to help you make informed decisions. Our advanced algorithms and data analysis ensure reliable insights for your investment strategies.</p>
                </div>
            </div>
            <div style={containerStyle} className="container mt-5">
                <div style={horizontalContainerStyle} className="horizontal-container">
                    <div style={sectionStyle} className="section">
                        <FontAwesomeIcon icon={faBullseye} size="3x" style={iconStyle} />
                        <h2>Our Mission</h2>
                        <p>Our mission is to empower investors with the tools they need to succeed in the stock market. We believe in leveraging technology to provide actionable insights and foster financial literacy.</p>
                    </div>
                    <div style={sectionStyle} className="section">
                        <FontAwesomeIcon icon={faUsers} size="3x" style={iconStyle} />
                        <h2>Our Team</h2>
                        <p>Our team consists of experienced financial analysts, software engineers, and data scientists who are passionate about making stock market predictions accessible to everyone.</p>
                    </div>
                    <div style={sectionStyle} className="section">
                        <FontAwesomeIcon icon={faEnvelope} size="3x" style={iconStyle} />
                        <h2>Contact Us</h2>
                        <p>If you have any questions or need support, feel free to <a href="/contact">contact us</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
