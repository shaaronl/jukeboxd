import { Link } from 'react-router-dom';
import React, { useState } from "react";
import CreateAccount from './CreateAccount';
import './Navbar.css'; 

export default function Navbar({ withLogo }) {
  const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

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
               <button onClick={handleOpenModal} className="open-modal-button">CREATE ACCOUNT</button>
                {showModal && <CreateAccount onClose={handleCloseModal} />}
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
