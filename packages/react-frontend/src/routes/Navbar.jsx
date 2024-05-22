import { Link } from "react-router-dom";
import React, { useState } from "react";
import CreateAccount from "./CreateAccount";
import "./Navbar.css";
import SignIn from "./SignIn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar({ withLogo }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalSignIn, setShowModalSignIn] = useState(false);

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

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  return (
    // condition for loading page w/o mini logo
    <nav className="navbar">
      {withLogo && (
        <div className="navbar-logo">
          <Link id="small-logo" to="/">
            JUKEBOXD
          </Link>
        </div>
      )}
      <ul className="navbar-links">
        {token === null || token == "null" ? (
          <>
            <li>
              <button
                onClick={handleOpenModalSignIn}
                className="open-modal-button"
              >
                SIGN IN
              </button>
              {showModalSignIn && (
                <SignIn onClose={handleCloseModalSignIn} />
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
                <CreateAccount onClose={handleCloseModal} />
              )}
            </li>
          </>
        ) : (
          <li>
            <Link to="/">
              <AccountCircleIcon></AccountCircleIcon>
              {username}
            </Link>
          </li>
        )}

        <li>
          <Link to="/Albums">ALBUMS</Link>
        </li>
        <li>
          <Link to="/MyReviews">MY REVIEWS</Link>
        </li>
        {(token !== null || token !== "null") && (
          <li>
            <Link
              onClick={() => {
                localStorage.setItem("token", null);
                localStorage.setItem("username", null);
                window.location.reload();
              }}
            >
              LOGOUT
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
