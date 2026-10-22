import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [predictions, setPredictions] = useState([]);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const email = localStorage.getItem('email');

    useEffect(() => {
        const fetchPredictions = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:3000/predictions', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setPredictions(response.data);
                } catch (error) {
                    console.error('Error fetching predictions:', error);
                }
            }
        };

        fetchPredictions();
    }, []);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/changepassword', 
                { currentPassword, newPassword }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error changing password:', error);
            setError('Unable to change password. Please try again.');
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <h2>Dashboard</h2>
            <p>Welcome! Here is your profile information:</p>
            <ul className="list-group">
                <li className="list-group-item"><strong>Email:</strong> {email}</li>
            </ul>
            <h3>Your Previous Predictions</h3>
            <ul className="list-group">
                {predictions.map((prediction) => (
                    <li className="list-group-item" key={prediction._id}>
                        {new Date(prediction.date).toLocaleString()}: {prediction.prediction}
                    </li>
                ))}
            </ul>
            <h3>Change Password</h3>
            <form onSubmit={handleChangePassword}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                </div>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="btn btn-primary mt-3" style={{ backgroundColor: "rgb(0, 20, 33)", borderColor: "rgb(0, 20, 33)" }}>Change Password</button>
            </form>
        </div>
    );
};

export default Dashboard;
