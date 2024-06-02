import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  useEffect(() => {
    const handleLinkClick = () => {
      window.scrollTo(0, 0); // Scroll to the top of the page whenever a link is clicked
    };

    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
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
          <Link to="/faqs">Get the Scoop</Link>
        </div>
        <div className="footer-column">
          <h3>Help</h3>
          <Link to="/help/create-account">Creating An Account</Link>
          <Link to="/help/general">General</Link>
        </div>
        <div className="footer-column">
          <h3>Terms and Conditions</h3>
          <Link to="/terms-and-conditions">User Agreement</Link>
        </div>
      </div>
    </footer>
  );
}
