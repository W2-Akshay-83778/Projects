import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import custom CSS if any
import AuthContext from '../context/AuthContext'; // Import your AuthContext

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Access auth state from context

  return (
    <header className="bg-primary text-white p-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Food Donation</h1>
          <nav>
            <Link to="/" className="text-white mx-2">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/donations" className="text-white mx-2">Donate Food</Link>
                <Link to="/create-category" className="text-white mx-2">Create Category</Link>
                <Link to="/update-category" className="text-white mx-2">Update Category</Link>
                <Link to="/search-category" className="text-white mx-2">Search Category</Link>
                <Link to="/edit-profile" className="text-white mx-2">Edit Profile</Link>
                <button onClick={logout} className="btn btn-secondary mx-2">Logout</button>
              </>
            ) : (
              <>
                {/* <Link to="/login" className="text-white mx-2">Logout</Link> */}
                <Link to="/register" className="text-white mx-2">Register</Link>
              </>
            )}
            <Link to="/about" className="text-white mx-2">About</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
