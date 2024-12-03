import axios from "axios";
import { useContext, useRef, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [passwordField, setPasswordField] = useState("password");

    const handleShowPassword = (e) =>{
        passwordField === "password" ? setPasswordField("text") : setPasswordField("password");
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post(process.env.REACT_APP_BASE_URL+"/api/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            toast.success("Login successful!", {
                autoClose: 3000, 
                position: "top-center",
            });
            setTimeout(() => {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            }, 1000);
            
        } catch (err) {
            
            toast.error("Login failed! Please try again.", {
                autoClose: 3000,
                position: "top-center",
            });
            dispatch({ type: "LOGIN_FAILURE" });
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
            <ToastContainer />
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
                                type={passwordField}
                                className="loginInput"
                                placeholder="Enter password"
                                required
                                ref={ passwordRef }
                            />
                            <span className="showPasswordToggle" onClick={handleShowPassword} style={{marginLeft:"auto", marginTop:"5px", cursor:"pointer"}}>{passwordField === "password" ? "Show Password" : "Hide Password"}</span>
                            <button className="loginButton" type="submit" disabled={ isFetching }>
                                Login
                            </button>
                        </form>
                        
                        
                    </div>
                )
            }
        </>
    )
}
