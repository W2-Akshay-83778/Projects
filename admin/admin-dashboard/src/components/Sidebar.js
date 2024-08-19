import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication data here (e.g., remove tokens from localStorage)
        localStorage.removeItem('authToken');
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                Admin Panel
            </div>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/donations">Donations</Link></li>
                <li><Link to="/categories">Categories</Link></li>
                <li><Link to="/recipients">Recipients</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </ul>
        </div>
    );
};

export default Sidebar;
