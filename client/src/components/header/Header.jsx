import './header.css';

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">Project Nexus</span>
                <span className="headerTitleLg">BLOG</span>
            </div>
            <img
                className="headerImg"
                src="https://wallpapercave.com/wp/wp2988278.jpg"
                alt=""
            />
        </div>
    )
}
