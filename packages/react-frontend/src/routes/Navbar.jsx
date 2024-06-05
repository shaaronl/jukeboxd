import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CreateAccount from "./CreateAccount";
import "./Navbar.css";
import SignIn from "./SignIn";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";

export default function Navbar({ withLogo }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalSignIn, setShowModalSignIn] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username")
  );

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUsername(localStorage.getItem("username"));
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalSignIn = () => {
    setShowModalSignIn(true);
  };

  const handleCloseModalSignIn = () => {
    setShowModalSignIn(false);
  };

  const swapToLogin = () => {
    setShowModal(false);
    setShowModalSignIn(true);
  };

  const swapToCreate = () => {
    setShowModal(true);
    setShowModalSignIn(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
    window.location.href = "/"; //directing back to home page after logout
  };

  return (
    <nav className="navbar">
      {withLogo && (
        <div className="navbar-logo">
          <Link id="small-logo" to="/">
            JUKEBOXD
          </Link>
        </div>
      )}
      <ul className="navbar-links">
        {!token || token === "null" ? (
          // everything that shows up when not logged in:
          <>
            <li>
              <button
                onClick={handleOpenModalSignIn}
                className="open-modal-button"
              >
                SIGN IN
              </button>
              {showModalSignIn && (
                <SignIn
                  onClick={swapToCreate}
                  onClose={handleCloseModalSignIn}
                />
              )}
            </li>
            <li>
              <button
                onClick={handleOpenModal}
                className="open-modal-button"
              >
                CREATE ACCOUNT
              </button>
              {showModal && (
                <CreateAccount
                  onClick={swapToLogin}
                  onClose={handleCloseModal}
                />
              )}
            </li>
            <li>
              <Link to="/Albums">ALBUMS</Link>
            </li>
          </>
        ) : (
          // everything that shows when logged in:
          <>
            <li>
              <Link to="/">
                <Avatar
                  alt={username}
                  src={localStorage.getItem("profilePic")}
                />
                {username}
              </Link>
            </li>
            <li>
              <Link to="/Albums">ALBUMS</Link>
            </li>
            <li>
              <Link to={`/reviews/${username}`}>
                MY REVIEWS
              </Link>
            </li>
            <li>
              <Link
                onClick={handleLogout}
                className="logout-button"
              >
                LOGOUT
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

// Define prop types for the component
Navbar.propTypes = {
  withLogo: PropTypes.bool.isRequired
};
