import React from "react";
import { Link } from "react-router-dom";

export default function CreateAccount() {
    return (
        <>
            <Link to="/">X</Link>
            <p className="title">Create An Account</p>

            <form className="accountForm">
            <p className="formHeader">Username</p>
                <label>
                    Username <input type="text" /> 
                </label>
                <p className="formHeader">Password</p>
                <input type="password" />
                <input type={"submit"} />
                <Link to="\home">Already a User? Click here to sign in</Link>
            </form>
        </>
    );
}
