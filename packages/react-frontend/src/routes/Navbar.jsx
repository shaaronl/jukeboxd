import { Link } from 'react-router-dom';
import './Navbar.css'; 

export default function Navbar({ withLogo }) {
    return (
      // condition for loading page w/o mini logo
        <nav className="navbar"> 
          {withLogo && (
            <div className="navbar-logo"> 
              <Link id = 'small-logo' to="/">JUKEBOXD</Link>
            </div>
          )}
          <ul className="navbar-links"> 
            <li>
              <Link to="/">SIGN IN</Link>
            </li>
            <li>
              <Link to="/CreateAccount">CREATE ACCOUNT</Link>
            </li>
            <li>
              <Link to="/">USERNAME</Link>
            </li>
            <li>
              <Link to="/Albums">ALBUMS</Link>
            </li>
            <li>
              <Link to="/MyReviews">MY REVIEWS</Link>
            </li>
          </ul>
        </nav>
    );
}
