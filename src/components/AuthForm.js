import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
                setNewAccount(false);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
                setNewAccount(false);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    const onChange = (e) => {
        const {target: {name, value}} = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    return ( 
    <>
        <form onSubmit={onSubmit} className="container">
            <input name="email" type="email" placeholder="email" required value={email} onChange={onChange} className="authInput"/>
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="authInput" />
            <input type="submit" value="로그인" value={newAccount ? "Create Account" : "Log In"} className="authInput authSubmit"/>
        </form>
        {error && <span className="authError">{error}</span>}
        <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign in" : "create Account"}</span>
    </>
    )
}
export default AuthForm;