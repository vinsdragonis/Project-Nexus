import './topbar.css';
// import { Link } from 'react-router-dom';

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
                    <li className="topListItem">HOME</li>
                    <li className="topListItem">ABOUT</li>
                    <li className="topListItem">CONTACT</li>
                    <li className="topListItem">WRITE</li>
                </ul>
            </div>
            <div className="topRight">
                <ul className="topList">
                    <li className="topListItem">LOGIN</li>
                    <li className="topListItem">REGISTER</li>
                </ul>
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
