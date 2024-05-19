import React, { useState } from "react";
import { Link } from "react-router-dom";
import './CreateAccount.css';

export default function CreateAccount({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const result = await response.json();
        if (result.success) {
            alert("Account created successfully!");
        } else {
            alert("Error creating account: " + result.message);
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="close-button">X</button>
                <p className="title">Create An Account</p>

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
                    <input type="submit" value="Create Account" className="submit-button" />
                    <Link to="/home" className="sign-in-link">Already a User? Click here to sign in</Link>
                </form>
            </div>
        </div>
    );
}
