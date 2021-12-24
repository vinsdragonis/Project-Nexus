import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./sidebar.css";

export default function Sidebar() {
    const { user } = useContext(Context);
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("http://localhost:5000/api/categories");
            setCats(res.data);
        };
        getCats();
    }, []);

    return (
        <div className="sidebar">
            {
                user && 
                <div className="sidebarItem">
                    <span className="sidebarTitle">ABOUT ME</span>
                    <img
                        src={ user.profilePic }
                        alt=""
                    />
                    <ul className="user-profile" style={{ listStyleType:'none' }}>
                        <li>
                            <p className="userDetails">
                                <strong>Username: </strong> 
                                <Link className="link" to={`/?user=${user.username}`}>
                                    <span>
                                        { user.username }
                                    </span>
                                </Link>
                            </p>
                        </li>
                        <li>
                            <p className="userDetails">
                                <strong>Email: </strong> 
                                <span>
                                    { user.email }
                                </span>
                            </p>
                        </li>
                        <li>
                            <p className="userDetails">
                                <strong>Joined on: </strong>
                                <span>
                                    { new Date(user.createdAt).toDateString() }
                                </span>
                            </p>
                        </li>
                        {
                            user.desc && 
                            <li>
                                <p className="userDetails">
                                    <strong>Description: </strong>
                                    <br />
                                    <span>
                                        { user.desc }
                                    </span>
                                </p>
                            </li>
                        }
                    </ul>
                </div>
            }

            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    { cats.map((c) => (
                        <Link key={ c._id } to={`/?cat=${c.name}`} className="link">
                            <li className="sidebarListItem">
                                { c.name }
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            {/* <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW ME</span>
                    <div className="sidebarSocial">
                        <a href="https://www.facebook.com/vineeth.bv.12"
                        rel="noreferrer"
                        target="_blank"
                        className="link"
                    >
                        <i className="sidebarIcon fab fa-facebook-square"></i>
                    </a>
                    <a href="https://www.instagram.com/vins._.dragonis/"
                        rel="noreferrer"
                        target="_blank"
                        className="link"
                    >
                        <i className="sidebarIcon fab fa-instagram-square"></i>
                    </a>
                    <a href="https://github.com/vinsdragonis"
                        rel="noreferrer"
                        target="_blank"
                        className="link"
                    >
                        <i className="sidebarIcon fab fa-github-square"></i>
                    </a>
                    <a href="https://www.reddit.com/user/KingDragonis"
                        rel="noreferrer"
                        target="_blank"
                        className="link"
                    >
                        <i className="sidebarIcon fab fa-reddit-square"></i>
                    </a>
                </div>
            </div> */}
        </div>
    );
}