import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Resources from './components/Resources';
import Dashboard from './components/Dashboard';
import StockPrediction from './components/StockPrediction';
import AdminPanel from './components/AdminPanel';
import AdminUserDetails from './components/AdminUserDetails'; // Import AdminUserDetails component
import CreateAdmin from './components/CreateAdmin'; // Import CreateAdmin component
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    return token && isAdmin ? children : <Navigate to="/login" />;
};

function App() {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <a className="navbar-brand" href="/">Stock Prediction</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/resources">Resources</Link></li>
                            {isAdmin && (
                                <>
                                    <li className="nav-item"><Link className="nav-link" to="/admin">Admin Panel</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/admin/users">User Details</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/create-admin">Create Admin</Link></li>
                                </>
                            )}
                            {token && <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>}
                            {token && <li className="nav-item"><Link className="nav-link" to="/predict">Predict</Link></li>}
                            <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
                            <li className="nav-item">
                                {token ? (
                                    <button className="btn btn-secondary text-white" onClick={() => {
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('isAdmin');
                                        window.location.href = '/';
                                    }}>Logout</button>
                                ) : (
                                    <Link className="btn btn-primary text-white" to="/login" style={{ backgroundColor: "rgb(0, 20, 33)", borderColor: "rgb(0, 20, 33)" }}>Login</Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container mt-5 pt-5 flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/predict" element={<PrivateRoute><StockPrediction /></PrivateRoute>} />
                        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
                        <Route path="/admin/users" element={<AdminRoute><AdminUserDetails /></AdminRoute>} />
                        <Route path="/create-admin" element={<AdminRoute><CreateAdmin /></AdminRoute>} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
