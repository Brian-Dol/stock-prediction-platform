import React, { useState } from 'react';
import axios from 'axios';

const CreateAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/create-admin', 
                { email, password }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error during admin creation:', error);
            setMessage('Error: Unable to create admin user. Please try again.');
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <h2>Create Admin User</h2>
            <form onSubmit={handleCreateAdmin}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
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
                        placeholder="Enter password"
                    />
                </div>
                {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
                <button type="submit" className="btn btn-primary mt-3" style={{ backgroundColor: "rgb(0, 20, 33)", borderColor: "rgb(0, 20, 33)" }}>Create Admin</button>
            </form>
        </div>
    );
};

export default CreateAdmin;
