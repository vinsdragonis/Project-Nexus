import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SyncLoader from "react-spinners/SyncLoader";
import './register.css';

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        
        try {
            const res = await axios.post("https://shrouded-basin-56205.herokuapp.com/api/auth/register", {
                fullname,
                username,
                email,
                password,
            });
            res.data && window.location.replace("/login");
        } catch (err) {
            setError(true);
        }
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, []);

    return (
        <>
            { loading ? 
                (
                    <div className="loader">  
                        <SyncLoader
                            color={"#ffa000"}
                            loading={loading}
                            size={25}
                            margin={5}
                        />
                    </div>
                ) : (
                    <div className="register">
                        <span className="registerTitle">Register</span>
                        <form className="registerForm" onSubmit={handleSubmit}>
                            <label>Full name</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter full name"
                                required
                                onChange={ (e) => setFullname(e.target.value) }
                            />
                            <label>Username</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter username"
                                required
                                onChange={ (e) => setUsername(e.target.value) }
                            />
                            <label>Email</label>
                            <input
                                className="registerInput"
                                type="text"
                                placeholder="Enter email"
                                required
                                onChange={ (e) => setEmail(e.target.value) }
                            />
                            <label>Password</label>
                            <input
                                className="registerInput"
                                type="password"
                                placeholder="Enter password"
                                required
                                onChange={ (e) => setPassword(e.target.value) }
                            />
                            <button className="registerButton" type="submit">
                                <Link className="link" to="/">
                                    Register
                                </Link>
                            </button>
                        </form>
                        {/* <button className="registerLoginButton">
                            <Link className="link" to="/login">
                                Login
                            </Link>
                        </button> */}
                        {
                            error &&
                            <span style={{ color:"red", marginTop:"10px" }}>Something went wrong!</span>
                        }
                    </div>
                )
            }
        </>
    )
}
