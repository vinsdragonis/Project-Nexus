import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    src="https://media.istockphoto.com/photos/cute-artificial-intelligence-robot-with-headset-picture-id1283257467?b=1&k=20&m=1283257467&s=170667a&w=0&h=5NF5-7_2H4LOfeuKxWnGVdyZkV5uq8qeVxK-tfA7NL8="
                    alt=""
                />
                <p>
                    Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
                    amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link className="link" to="/posts?cat=Life">
                            Life
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link className="link" to="/posts?cat=Music">
                            Music
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link className="link" to="/posts?cat=Sport">
                            Sport
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link className="link" to="/posts?cat=Style">
                            Style
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link className="link" to="/posts?cat=Tech">
                            Tech
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link className="link" to="/posts?cat=Cinema">
                            Cinema
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                </div>
            </div>
        </div>
    );
}