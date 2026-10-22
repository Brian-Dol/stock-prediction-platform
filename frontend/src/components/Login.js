import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Clear input fields when the component mounts
        setEmail('');
        setPassword('');
        setError('');
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', email); // Store email in localStorage
            localStorage.setItem('isAdmin', response.data.isAdmin); // Store isAdmin in localStorage
            if (response.data.isAdmin) {
                window.location.href = '/admin'; // Redirect to admin panel
            } else {
                window.location.href = '/dashboard'; // Redirect to dashboard page
            }
        } catch (error) {
            setError('Invalid email or password');
            console.error('Error during login:', error);
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
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "rgb(0, 20, 33)", borderColor: "rgb(0, 20, 33)", width: "100%", padding: "10px" }}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
