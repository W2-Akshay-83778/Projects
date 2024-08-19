// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfilePage.css'; // Import custom CSS for styling

const ProfilePage = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    profilePicture: '',
  });
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile');
        setUser(response.data);
        setNewUsername(response.data.username);
        setNewEmail(response.data.email);
        setNewProfilePicture(response.data.profilePicture);
      } catch (error) {
        console.error('Failed to fetch user details', error);
        setError('Failed to load profile');
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      username: newUsername,
      email: newEmail,
      profilePicture: newProfilePicture,
    };

    try {
      await axios.put('http://localhost:5000/api/users/profile', updatedUser);
      setUser(updatedUser);
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile', error);
      setError('Failed to update profile');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Profile</h2>
      <div className="text-center mb-4">
        <img
          src={user.profilePicture || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-icon"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture URL</label>
          <input
            type="text"
            className="form-control"
            id="profilePicture"
            value={newProfilePicture}
            onChange={(e) => setNewProfilePicture(e.target.value)}
          />
        </div>
        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <button type="submit" className="btn btn-primary mt-3">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
