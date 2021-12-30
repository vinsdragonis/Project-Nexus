import './about.css';
import Sidebar from '../../components/sidebar/Sidebar';

export default function About() {
    return (
        <div>
            <div className="aboutWrapper">
                <div className="about">
                    <div className="section">
                        <h1 className="title">
                            About Project Nexus
                        </h1>
                        <p className="description">
                            Project Nexus is an open source project and community where users can read and write blog posts and share their experience with others.
                            Whether you are a tech enthusiast, a gamer, a developer, a vlogger, or someone who is interested in music and lifestyle, you can share your experiences with people.
                            We aim to create a community where many people are brought together to share their thoughts and experience with others.
                        </p>
                    </div>
                    <div className="section">
                        <h1 className="title">
                            Our Mission
                        </h1>
                        <p className="description">
                            To create an open source community for people to share their experience with others.
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
