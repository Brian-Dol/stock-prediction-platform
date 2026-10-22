import React from 'react';

const Admin = () => {
    return (
        <div className="container mt-5">
            <h1>Admin Panel</h1>
            <p>Manage users and stock predictions from this admin panel.</p>
            <ul>
                <li><a href="#manage-users">Manage Users</a></li>
                <li><a href="#manage-predictions">Manage Predictions</a></li>
                <li><a href="#system-settings">System Settings</a></li>
            </ul>
        </div>
    );
};

export default Admin;
