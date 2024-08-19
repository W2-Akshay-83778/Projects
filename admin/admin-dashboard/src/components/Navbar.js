// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <h1>Admin Panel</h1>
            <div className="nav-links">
                <a href="/">Dashboard</a>
                <a href="/donations">Donations</a>
                <a href="/categories">Categories</a>
                <a href="/recipients">Recipients</a>
            </div>
        </div>
    );
};

export default Navbar;
