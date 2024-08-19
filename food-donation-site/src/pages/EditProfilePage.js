import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProfilePage = () => {
  const { id } = useParams(); // Get user ID from the URL parameters
  const navigate = useNavigate(); // Replaces useHistory
  const [user, setUser] = useState({
    userName: '',
    email: '',
    passwordHash: '', // Consider using a separate field for password update
    userType: 'DONOR',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/users/${id}`, user);
      setMessage('Profile updated successfully!');
      // Redirect to another page if needed
      navigate('/profile'); // Use navigate instead of history.push
    } catch (error) {
      console.error('Failed to update profile', error);
      setMessage('Failed to update profile');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userType">User Type</label>
          <select
            id="userType"
            name="userType"
            className="form-control"
            value={user.userType}
            onChange={handleChange}
            required
          >
            <option value="DONOR">Donor</option>
            <option value="RECIPIENT">Recipient</option>
          </select>
        </div>
        {message && <div className="alert alert-info mt-3">{message}</div>}
        <button type="submit" className="btn btn-primary mt-3">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
