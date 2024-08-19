// src/pages/RegistrationPage.js
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './RegistrationPage.css'; // Custom CSS if needed

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usertype, setUsertype] = useState('DONOR'); // Default to 'DONOR'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const user = { 
      user_name: username, 
      email: email, 
      password_hash: password, 
      user_type: usertype 
    };

    try {
      
      const response = await axios.post('http://172.18.6.213:8080/users', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response);

      
      setSuccess('Registration successful!');
      setError('');
      // Clear the form after successful submission
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsertype('DONOR');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to register');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="usertype">User Type</label>
          <select
            id="usertype"
            className="form-control"
            value={usertype}
            onChange={(e) => setUsertype(e.target.value)}
            required
          >
            <option value="DONOR">Donor</option>
            <option value="RECIPIENT">Recipient</option>
          </select>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
