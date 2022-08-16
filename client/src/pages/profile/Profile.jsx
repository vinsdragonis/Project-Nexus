import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import SyncLoader from "react-spinners/SyncLoader";
import "./profile.css";

export default function Profile() {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, []);
    // console.log(user.fullname);
    return (
        <>
            {/* { loading ?
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
                    <div className="profile">
                        {
                            user &&
                            <div className="profileWrapper">
                                <div className="profileContainer">
                                    <div className="profileDetails glow-on-hover">
                                        <h1 className="profileTitle">MY PROFILE</h1>
                                        <div className="profileImgContainer" style={{ paddingBottom: '20px' }}>
                                            <img
                                                src={ user.profilePic }
                                                alt=""
                                            />
                                        </div>
                                        <ul className="user-profile" style={{ listStyleType: 'none' }}>
                                            <li>
                                                <p className="userProfileDetails">
                                                    <strong>Full name:</strong> 
                                                    <span>
                                                        { user.fullname }
                                                    </span>
                                                </p>
                                            </li>
                                            <li>
                                                <p className="userProfileDetails">
                                                    <strong>Username:</strong>
                                                    <Link className="link" to={`/?user=${user.username}`}>
                                                        <span>
                                                            { user.username }
                                                        </span>
                                                    </Link>
                                                </p>
                                            </li>
                                            <li>
                                                <p className="userProfileDetails">
                                                    <strong>Email:</strong>
                                                    <span>
                                                        { user.email }
                                                    </span>
                                                </p>
                                            </li>
                                            <li>
                                                <p className="userProfileDetails">
                                                    <strong>Joined on:</strong>
                                                    <span>
                                                        { new Date(user.createdAt).toDateString() }
                                                    </span>
                                                </p>
                                            </li>
                                            {
                                                user.desc && 
                                                <li>
                                                    <p className="userProfileDetails">
                                                        <strong>Bio:</strong> 
                                                        <span>
                                                            { user.desc }
                                                        </span>
                                                    </p>
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            user &&
                            <div className="settingsButtonContainer">
                                <div className="settingsButton">
                                    {
                                        user &&
                                        <Link className="link" to="/settings">
                                            <p>Settings</p>
                                        </Link>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                        
                )
            } */}
                                <div className="profile">
                        {/* {
                            user && */}
                            <div className="profileWrapper">
                                <div className="profileContainer">
                                    <div className="profileDetails glow-on-hover">
                                        <h1 className="profileTitle">MY PROFILE</h1>
                                        <div className="profileImgContainer" style={{ paddingBottom: '20px' }}>
                                            <img
                                                // src={ user.profilePic }
                                                src="https://source.unsplash.com/v2aKnjMbP_k/"
                                    alt=""
                                    style={{objectFit: 'cover'}}
                                            />
                                        </div>
                                        <ul className="user-profile" style={{ listStyleType: 'none' }}>
                                            <li>
                                                <p className="userProfileDetails">
                                                    <strong>Full name:</strong> 
                                                    <span>
                                            {/* { user } */}
                                            Sam Takahashi
                                                    </span>
                                                </p>
                                            </li>
                                            <li>
                                                <p className="userProfileDetails">
                                                    <strong>Username:</strong>
                                                    <Link className="link" to={`/`}>
                                                    {/* <Link className="link" to={`/?user=${user.username}`}> */}
                                                        <span>
                                                {/* { user.username } */}
                                                SamT
                                                        </span>
                                                    </Link>
                                                </p>
                                            </li>
                                            <li>
                                                <p className="userProfileDetails">
                                                    <strong>Email:</strong>
                                                    <span>
                                            {/* { user.email } */}
                                            sam.takahashi.sam@gmail.com
                                                    </span>
                                                </p>
                                            </li>
                                            <li>
                                                <p className="userProfileDetails">
                                                    <strong>Joined on:</strong>
                                                    <span>
                                            {/* { new Date(user.createdAt).toDateString() } */}
                                            22.08.01
                                                    </span>
                                                </p>
                                            </li>
                                            {/* {
                                                user.desc &&  */}
                                                <li>
                                                    <p className="userProfileDetails">
                                                        <strong>Bio:</strong> 
                                                        <span>
                                            {/* { user.desc } */}
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ab ea repudiandae repellat! itaque maxime error incidunt ut officiis, enim dolorem, sed aliquid fugit voluptatem rerum excepturi? Ad voluptatibus molestias corrupti, debitis distinctio nobis.
                                                        </span>
                                                    </p>
                                                </li>
                                            {/* // } */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        {/* // }
                        // {
                        //     user && */}
                            <div className="settingsButtonContainer">
                                <div className="settingsButton">
                                    {/* {
                                        user && */}
                                        <Link className="link" to="/settings">
                                            <p>Settings</p>
                                        </Link>
                                    {/* } */}
                                </div>
                            </div>
                        {/* // } */}
                    </div>
        </>
    );
}