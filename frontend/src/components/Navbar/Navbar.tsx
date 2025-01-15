import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [searchId, setSearchId] = useState<string>(''); // State to track the search input
  const navigate = useNavigate();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (searchId) {
      // Navigate to the /pokemon/{id} page
      navigate(`/pokemon/${searchId}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <a className="navbar-brand" href="#">
        <img src={logo} alt="Logo" />
      </a>
      <div className="navbar-content">
        <ul className="navbar-nav">
          <li className="nav-item" onClick={() => navigate('/')}>
            <p className="nav-link">Home</p>
          </li>
          <li className="nav-item" onClick={() => navigate('/addpokemon')}>
            <p className="nav-link">Add Pokemon</p>
          </li>
          <li className="nav-item" onClick={() => navigate('/editpokemon')}>
            <p className="nav-link">Edit Pokemon</p>
          </li>
        </ul>
        <form className="form-inline nav-input">
          <input
            className="form-control"
            type="search"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)} // Update searchId as user types
          />
          <button className="btn btn-outline-success" type="submit" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
