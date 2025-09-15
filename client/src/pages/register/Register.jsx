import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css';

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
 

  
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        try {
            const res = await axios.post(process.env.REACT_APP_BASE_URL+"/api/auth/register", {
                fullname,
                username,
                email,
                password,
            });
            console.log(res.data)
            
                toast.success("Registration successful!", {
                  autoClose: 3000, 
                  position: "top-center"
                });
              
                setTimeout(() => {
                  navigate("/"); // Redirect to homepage after successful registration
                }, 3000); 
            
            console.log(res)
        } catch (err) {
            console.log(err)
            toast.error("Registration failed! Please try again.", {
                autoClose: 3000,
                position: "top-center"
            });
            setTimeout(() => {
                navigate("/"); // Redirect to homepage even on error
              }, 3000); 
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
                                {/* <Link className="link" to="/"> */}
                                    Register
                                {/* </Link> */}
                            </button>
                        </form>
                        
                        
                    </div>
                )
            }
        </>
    )
}
