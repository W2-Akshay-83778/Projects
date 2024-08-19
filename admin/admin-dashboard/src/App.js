// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DonationManagement from './components/DonationManagement';
import CategoryManagement from './components/CategoryManagement';
import RecipientManagement from './components/RecipientManagement';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login by default */}
                        <Route path="/login" element={<Login />} /> {/* Login route */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/donations" element={<DonationManagement />} />
                        <Route path="/categories" element={<CategoryManagement />} />
                        <Route path="/recipients" element={<RecipientManagement />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
