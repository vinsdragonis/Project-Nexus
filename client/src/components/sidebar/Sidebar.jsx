// import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    src="https://wallpapercave.com/wp/wp9584059.jpg"
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
                        Artificial Intelligence
                    </li>
                    <li className="sidebarListItem">
                        Cloud Computing
                    </li>
                    <li className="sidebarListItem">
                        Information Security
                    </li>
                    <li className="sidebarListItem">
                        Software Engineering
                    </li>
                    <li className="sidebarListItem">
                        Smart Devices
                    </li>
                    <li className="sidebarListItem">
                        Wireless Networks
                    </li>
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                    <i className="sidebarIcon fab fa-github-square"></i>
                    <i className="sidebarIcon fab fa-reddit-square"></i>
                </div>
            </div>
        </div>
    );
}