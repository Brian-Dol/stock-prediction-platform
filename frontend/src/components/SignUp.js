import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Clear input fields when the component mounts
        setEmail('');
        setPassword('');
        setMessage('');
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            const response = await axios.post('http://localhost:3000/signup', { email, password });
            console.log('Response:', response);  // Debugging log

            if (response.data.message === 'Sign-up successful') {
                setMessage('Sign-up successful! Please log in.'); // Success message
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            setMessage('Error: Unable to sign up. Please try again.'); // Error message
        }
    };

    const heroSectionStyle = {
        backgroundImage: "url('/login-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        color: "white"
    };

    const formContainerStyle = {
        background: "rgba(0, 0, 0, 0.6)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        width: "100%"
    };

    const inputStyle = {
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        width: "100%",
        boxSizing: "border-box"
    };

    return (
        <div style={heroSectionStyle}>
            <div style={formContainerStyle}>
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            style={inputStyle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            style={inputStyle}
                        />
                    </div>
                    {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "rgb(0, 20, 33)", borderColor: "rgb(0, 20, 33)", width: "100%", padding: "10px" }}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
