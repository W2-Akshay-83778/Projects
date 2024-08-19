import React from 'react';
import './Footer.css'; // Import custom CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Footer = () => (
  <footer className="footer bg-dark text-white py-4">
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-sm-12 mb-3 mb-md-0">
          <p className="mb-0">&copy; 2024 Food Donation. All rights reserved.</p>
        </div>
        <div className="col-md-6 col-sm-12 text-md-right text-sm-left">
          <ul className="list-inline mb-0">
            <li className="list-inline-item mr-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="list-inline-item mr-3">
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
