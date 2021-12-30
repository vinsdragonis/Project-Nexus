import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import './login.css';

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
            setError(true);
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };

    return (
        <div className="login">
            <span className="loginTitle">LOGIN</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    className="loginInput"
                    placeholder="Enter username"
                    required
                    ref={ userRef }
                />
                <label>Password</label>
                <input
                    type="password"
                    className="loginInput"
                    placeholder="Enter password"
                    required
                    ref={ passwordRef }
                />
                <button className="loginButton" type="submit" disabled={ isFetching }>
                    Login
                </button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to="/register">
                    Register
                </Link>
            </button>
            {
                error &&
                <span style={{ color:"red", marginTop:"10px" }}>Something went wrong!</span>
            }
        </div>
    )
}
