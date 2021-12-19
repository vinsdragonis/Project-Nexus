import { Link } from 'react-router-dom';
import './register.css';

export default function Register() {
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm">
                <label>Username</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter username"
                />
                <label>Email</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter email"
                />
                <label>Password</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter password"
                />
                <button className="registerButton">
                    <Link className="link" to="/">
                        Register
                    </Link>
                </button>
            </form>
            <button className="registerLoginButton">
                <Link className="link" to="/login">
                    Login
                </Link>
            </button>
        </div>
    )
}
