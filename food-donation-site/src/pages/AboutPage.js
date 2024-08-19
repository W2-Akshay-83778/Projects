// src/pages/AboutPage.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './AboutPage.css';

const AboutPage = () => (
  <div className="about-container container mt-5">
    <div className="row">
      <div className="col-md-6 mb-4">
        <h2 className="text-primary">About Us</h2>
        <p>We are dedicated to providing food to those in need. Our mission is to eliminate hunger and improve the quality of life for everyone we serve.</p>
        <p>We value compassion, integrity, and community support. Join us in our mission to make a difference in the world.</p>
      </div>
      <div className="col-md-6 mb-4">
        <img
          src={`${process.env.PUBLIC_URL}/aboutus.jpeg`}
          alt="About Us"
          className="img-fluid rounded shadow"
        />
      </div>
    </div>
  </div>
);

export default AboutPage;
