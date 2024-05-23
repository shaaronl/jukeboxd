import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

export default function SignIn({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    const response = await fetch(
      "http://localhost:8000/login",
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
      // Store the jwt token
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.username);
      console.log(localStorage.getItem("token"));
      console.log(localStorage.getItem("username"));
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
          <Link to="/home" className="sign-up-link">
            Not a User? Click here to sign up
          </Link>
        </form>
      </div>
    </div>
  );
}
