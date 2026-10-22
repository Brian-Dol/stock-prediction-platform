import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminUserDetails = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:3000/admin/users', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUsers(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="container mt-5 pt-5">
            <h2 className="mb-4"><i className="bi bi-people"></i> User Details</h2>
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
        </div>
    );
};

export default AdminUserDetails;
