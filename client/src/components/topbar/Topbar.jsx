import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import './topbar.css';

export default function Topbar() {
    const { user, dispatch } = useContext(Context);
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const handleLogout = () => {
        setHamburgerOpen(false);
        dispatch({ type: "LOGOUT" });
    };

    const handleHamburger = (e) => {
        setHamburgerOpen(current => !current)
    }

    return (
        <div className="top">
            <div className="mobile-hamburger" onClick={handleHamburger}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={hamburgerOpen ? "menu-wrapper menu-wrapper-open" : "menu-wrapper"}>
                <div className="topLeft">
                    <a href="https://www.facebook.com/vineeth.bv.12"
                        rel="noreferrer"
                        target="_blank"
                        className="link"
                        onClick={() => setHamburgerOpen(false)}
                    >
                        <i className="topIcon fab fa-facebook-square"></i>
                    </a>
                    <a href="https://www.instagram.com/vins._.dragonis/"
                        rel="noreferrer"
                        target="_blank"
                        className="link"
                        onClick={() => setHamburgerOpen(false)}
                    >
                        <i className="topIcon fab fa-instagram-square"></i>
                    </a>
                    <a href="https://github.com/vinsdragonis"
                        rel="noreferrer"
                        target="_blank"
                        className="link"
                        onClick={() => setHamburgerOpen(false)}
                    >
                        <i className="topIcon fab fa-github-square"></i>
                    </a>
                    <a href="https://www.reddit.com/user/KingDragonis"
                        rel="noreferrer"
                        target="_blank"
                        className="link"
                        onClick={() => setHamburgerOpen(false)}
                    >
                        <i className="topIcon fab fa-reddit-square"></i>
                    </a>
                </div>
                <div className="topCenter">
                    <ul className="topList">
                        <Link onClick={() => setHamburgerOpen(false)} className="link" to="/">
                            <li className="topListItem">HOME</li>
                        </Link>
                        <Link onClick={() => setHamburgerOpen(false)} className="link" to="/about">
                            <li className="topListItem">ABOUT</li>
                        </Link>
                        <Link onClick={() => setHamburgerOpen(false)} className="link" to="/write" >
                            <li className="topListItem">WRITE</li>
                        </Link>
                        <li className="topListItem" onClick={handleLogout}>
                            {user && "LOGOUT"}
                        </li>
                    </ul>
                </div>
                <div className="topRight">
                    {user ? (
                        <Link onClick={() => setHamburgerOpen(false)} className="link" to="/profile">
                            <img
                                className="topImg"
                                src={user.profilePic}
                                alt=""
                            />
                        </Link>
                    ) : (
                        <ul className="topList">
                            <Link onClick={() => setHamburgerOpen(false)} className="link" to="/login">
                                <li className="topListItem">LOGIN</li>
                            </Link>
                            <Link onClick={() => setHamburgerOpen(false)} className="link" to="/register">
                                <li className="topListItem">REGISTER</li>
                            </Link>
                        </ul>
                    )}
                    {/* <i className="topSearchIcon fas fa-search"></i> */}
                </div>
                <div className="close-hamburger" onClick={handleHamburger}>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
