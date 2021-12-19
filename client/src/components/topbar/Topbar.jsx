import './topbar.css';
import { Link } from 'react-router-dom';

export default function Topbar() {
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
                    <li className="topListItem">ABOUT</li>
                    <li className="topListItem">CONTACT</li>
                    <Link className="link" to="/write" >
                        <li className="topListItem">WRITE</li>
                    </Link>
                    <li className="topListItem">LOGOUT</li>
                </ul>
            </div>
            <div className="topRight">
                <Link className="link" to="/settings">
                    <img
                        className="topImg"
                        src="https://avatars.githubusercontent.com/u/37930821?v=4"
                        alt=""
                    />
                </Link>
                <ul className="topList">
                    <Link className="link" to="/login">
                        <li className="topListItem">LOGIN</li>
                    </Link>
                    <Link className="link" to="/register">
                        <li className="topListItem">REGISTER</li>
                    </Link>
                </ul>
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
