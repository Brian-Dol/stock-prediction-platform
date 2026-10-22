import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-3 mt-auto">
            <div className="container">
                <p>&copy; 2024 Stock Prediction App. All rights reserved.</p>
                <p><a href="/about" className="text-white">About Us</a> | <a href="/contact" className="text-white">Contact</a></p>
            </div>
        </footer>
    );
};

export default Footer;
