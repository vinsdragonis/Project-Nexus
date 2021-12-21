import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import './topbar.css';

export default function Topbar() {
    const { user, dispatch } = useContext(Context);
    // const PF = "http://localhost:5000/api/images/"

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
                <i className="topIcon fab fa-github-square"></i>
                <i className="topIcon fab fa-reddit-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <Link className="link" to="/">
                        <li className="topListItem">HOME</li>
                    </Link>
                    <Link className="link" to="/">
                        <li className="topListItem">ABOUT</li>
                    </Link>
                    <Link className="link" to="/">
                        <li className="topListItem">CONTACT</li>
                    </Link>
                    <Link className="link" to="/write" >
                        <li className="topListItem">WRITE</li>
                    </Link>
                    <li className="topListItem" onClick={handleLogout}>{ user && "LOGOUT" }</li>
                </ul>
            </div>
            <div className="topRight">
                { user ? (
                    <Link className="link" to="/settings">
                        <img
                            className="topImg"
                            src={ user.profilePic }
                            alt=""
                        />
                    </Link>
                ) : (
                    <ul className="topList">
                        <Link className="link" to="/login">
                            <li className="topListItem">LOGIN</li>
                        </Link>
                        <Link className="link" to="/register">
                            <li className="topListItem">REGISTER</li>
                        </Link>
                    </ul>
                )}
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
