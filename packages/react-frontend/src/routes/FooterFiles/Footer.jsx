import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Footer.css";


export default function Footer(){
    
    useEffect(() => {
        const handleLinkClick = () => {
          window.scrollTo(0, 0); // Scroll to the top of the page whenever a link is clicked
        };
    
        const links = document.querySelectorAll('a');
        links.forEach(link => {
          link.addEventListener('click', handleLinkClick);
        });
    
        // Clean up the event listeners when the component unmounts
        return () => {
          links.forEach(link => {
            link.removeEventListener('click', handleLinkClick);
          });
        };
      }, []); 
  return (
    <footer>
      <div className="footer-container">

        <div className="footer-column">
          <h3>Navigate</h3>
          <Link to="/">Home</Link>
          <Link to="/Albums">Albums</Link>
        </div>
        <div className="footer-column">
          <h3>About Us</h3>
          <Link to="/about">Our Story</Link>
        </div>
        <div className="footer-column">
          <h3>FAQs</h3>
          <Link to="/faqs">Click here</Link>
        </div>
        <div className="footer-column">
          <h3>Navigate</h3>
          <Link to="/">Home</Link>
          <Link to="/Albums">Albums</Link>
        </div>
        <div className="footer-column">
          <h3>Help</h3>
          <Link to="/help">Creating An Account</Link>
          <Link to="/help">General</Link>       
        </div>

      </div>
    </footer>
  );
}
