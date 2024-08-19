// src/pages/HomePage.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import custom CSS if needed

const HomePage = () => (
  <div className="container text-center my-5">
    <Carousel>
      <Carousel.Item>
        <img 
          src={`${process.env.PUBLIC_URL}/food1.jpg`} 
          alt="Food Donation 1"
          className="d-block w-100 img-fluid rounded mb-4" 
        />
        <Carousel.Caption>
          <h3>Help us provide food for those in need.</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img 
          src={`${process.env.PUBLIC_URL}/food3.webp`} 
          alt="Food Donation 3"
          className="d-block w-100 img-fluid rounded mb-4" 
        />
        <Carousel.Caption>
          <h3>Join us in fighting hunger.</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <p className="lead">Your contributions makes a difference!</p>
    <Link to="/donations" className="btn btn-primary">Donate/Request Food</Link>  </div>
);

export default HomePage;
