import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DonationPage = () => {
  const [userID, setUserID] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [donations, setDonations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/donations');
        setDonations(response.data);
      } catch (error) {
        console.error('Failed to fetch donations', error);
      }
    };

    fetchDonations();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/foodcategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleDonationSubmit = async (e) => {
    e.preventDefault();

    const donationData = {
      user: { userID },
      category: { categoryID },
      donationDescription: description,
      quantity,
      unit,
    };

    try {
      await axios.post('http://localhost:8080/donations', donationData);
      setMessage('Donation successfully submitted!');

      setUserID('');
      setCategoryID('');
      setQuantity('');
      setUnit('');
      setDescription('');

      const response = await axios.get('http://localhost:8080/donations');
      setDonations(response.data);
    } catch (error) {
      setMessage('Submission failed!');
      console.error('Failed to submit donation', error);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    const newCategory = { categoryName: newCategoryName };

    try {
      await axios.post('http://localhost:8080/foodcategories', newCategory);
      setMessage('Category successfully created!');

      setNewCategoryName('');

      const response = await axios.get('http://localhost:8080/foodcategories');
      setCategories(response.data);
    } catch (error) {
      setMessage('Failed to create category!');
      console.error('Failed to create category', error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Donation Form */}
      <h2 className="text-center mb-4">Donate Food</h2>
      <form onSubmit={handleDonationSubmit}>
        <div className="form-group">
          <label htmlFor="userID">User ID</label>
          <input
            type="text"
            className="form-control"
            id="userID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryID">Food Category</label>
          <select
            id="categoryID"
            className="form-control"
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.categoryID} value={category.categoryID}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <input
            type="text"
            className="form-control"
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {message && <div className="alert alert-info mt-3">{message}</div>}
        <button type="submit" className="btn btn-primary mt-3">
          Submit Donation
        </button>
      </form>

      {/* Create Category Form */}
      <h3 className="mt-5">Create Food Category</h3>
      <form onSubmit={handleCategorySubmit}>
        <div className="form-group">
          <label htmlFor="newCategoryName">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="newCategoryName"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            required
          />
        </div>
        {message && <div className="alert alert-info mt-3">{message}</div>}
        <button type="submit" className="btn btn-primary mt-3">
          Create Category
        </button>
      </form>

      {/* List of Donations */}
      <h3 className="mt-5">List of Donations</h3>
      <ul className="list-group mt-3">
        {donations.length > 0 ? (
          donations.map((donation) => (
            <li key={donation.donationID} className="list-group-item">
              <h5>{donation.category ? donation.category.categoryName : 'No Category'}</h5>
              <p><strong>Quantity:</strong> {donation.quantity} {donation.unit}</p>
              <p><strong>Description:</strong> {donation.donationDescription}</p>
              <p><strong>Date:</strong> {new Date(donation.donationDate).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <li className="list-group-item">No donations found.</li>
        )}
      </ul>

      {/* List of Categories */}
      <h3 className="mt-5">List of Food Categories</h3>
      <ul className="list-group mt-3">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.categoryID} className="list-group-item">
              <h5>{category.categoryName}</h5>
            </li>
          ))
        ) : (
          <li className="list-group-item">No categories found.</li>
        )}
      </ul>
    </div>
  );
};

export default DonationPage;
