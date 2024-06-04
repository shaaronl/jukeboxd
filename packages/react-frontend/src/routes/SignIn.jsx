import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import PropTypes from "prop-types";

export default function SignIn({ onClick, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    const response = await fetch(
      "https://jukeboxd-music.azurewebsites.net/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      }
    );
    const result = await response.json();
    if (result) {
      console.log(result);
      // Store the jwt token
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.username);
      localStorage.setItem("profilePic", result.profilePic);
      window.location.reload();

      alert("Login!");
    } else {
      alert("Error logging in: " + result.message);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
          X
        </button>
        <p className="title">Sign In</p>

        <form className="account-form" onSubmit={handleSubmit}>
          <p className="form-header">Username</p>
          <label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </label>
          <p className="form-header">Password</p>
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </label>
          <input
            type="submit"
            value="Sign In"
            className="submit-button"
          />
          <Link onClick={onClick} className="sign-up-link">
            Not a User? Click here to sign up
          </Link>
        </form>
      </div>
    </div>
  );
}

// Define prop types for the component
SignIn.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
