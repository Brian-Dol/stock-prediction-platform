import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [predictions, setPredictions] = useState([]);
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [adminMessage, setAdminMessage] = useState('');

    useEffect(() => {
        const fetchAdminData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:3000/admin', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUsers(response.data.users);
                    setPredictions(response.data.predictions);
                } catch (error) {
                    console.error('Error fetching admin data:', error);
                }
            }
        };

        fetchAdminData();
    }, []);

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        setAdminMessage(''); // Clear previous messages

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/create-admin', 
                { email: newAdminEmail, password: newAdminPassword }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAdminMessage(response.data.message);
        } catch (error) {
            console.error('Error during admin creation:', error);
            setAdminMessage('Error: Unable to create admin user. Please try again.');
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <h2 className="mb-4"><i className="bi bi-person-badge"></i> Admin Panel</h2>
            
            <h3 className="mb-3"><i className="bi bi-people"></i> Users</h3>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Email</th>
                            <th>Signup Date</th>
                            <th>Last Login Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.email}</td>
                                <td>{new Date(user.signupDate).toLocaleString()}</td>
                                <td>{user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleString() : 'Never'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3 className="mb-3"><i className="bi bi-bar-chart"></i> Predictions</h3>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Date</th>
                            <th>Prediction</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predictions.map((prediction) => (
                            <tr key={prediction._id}>
                                <td>{new Date(prediction.date).toLocaleString()}</td>
                                <td>{prediction.prediction}</td>
                                <td>{prediction.userId.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3 className="mb-3"><i className="bi bi-person-plus"></i> Create New Admin</h3>
            <form onSubmit={handleCreateAdmin}>
                <div className="form-group mb-3">
                    <label htmlFor="newAdminEmail">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="newAdminEmail"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="newAdminPassword">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newAdminPassword"
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </div>
                {adminMessage && <p style={{ color: adminMessage.startsWith('Error') ? 'red' : 'green' }}>{adminMessage}</p>}
                <button type="submit" className="btn btn-primary mt-3" style={{ backgroundColor: "rgb(0, 20, 33)", borderColor: "rgb(0, 20, 33)" }}>Create Admin</button>
            </form>
        </div>
    );
};

export default AdminPanel;
