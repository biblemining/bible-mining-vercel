import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

function Header() {
  const [logo, setLogo] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get('');
        if (response.data.image_url) {
          setLogo(response.data.image_url);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };
    fetchLogo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          {logo && <img src={logo} alt="Bible Mining Logo" className="logo" />}
          <h1 className="site-name">Bible Mining</h1>
        </Link>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/songs">Songs</Link></li>
          <li><Link to="/videos">Videos</Link></li>
          <li><Link to="/sermons">Sermons</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {isAuthenticated && (
            <li>
              <button onClick={handleLogout} className="logout-btn">లాగౌట్</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;