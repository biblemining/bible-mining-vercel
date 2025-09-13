import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Bible Mining. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/contact">మమ్మల్ని సంప్రదించండి</a>
          <a href="https://www.youtube.com">YouTube</a>
          <a href="https://www.facebook.com">Facebook</a>
          <a href="https://www.instagram.com">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;