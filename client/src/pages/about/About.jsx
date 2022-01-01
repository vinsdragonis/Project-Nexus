import { useState, useEffect } from "react";
import Sidebar from '../../components/sidebar/Sidebar';
import Categories from '../../components/categories/Categories';
import SyncLoader from "react-spinners/SyncLoader";
import './about.css';

export default function About() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, []);

    return (
        <>
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
                    <div>
                        <div className="aboutWrapper">
                            <Categories />
                            <div className="about">
                                <div className="section">
                                    <h1 className="title">
                                        About Project Nexus
                                    </h1>
                                    <p className="description">
                                        Project Nexus is an open source project and community where users can read and write blog posts and share their experience with others.
                                        Whether you are a tech enthusiast, a gamer, a developer, a vlogger, or someone who is interested in music and lifestyle, you can share your experiences with people.
                                        Our aim is to create a community where many people are brought together to share their thoughts and life experiences with others.
                                    </p>
                                </div>
                                <div className="section">
                                    <h1 className="title">
                                        Our Mission
                                    </h1>
                                    <p className="description">
                                        To create a world wide community for people to share their experience with others.
                                    </p>
                                </div>
                                <div className="section">    
                                    <h1 className="title">
                                        Our Vision
                                    </h1>
                                    <p className="description">
                                        To connect people together from all over the world.
                                    </p>
                                </div>
                            </div>
                            <Sidebar />
                        </div>
                    </div>
                )
            }
        </>
    )
}
