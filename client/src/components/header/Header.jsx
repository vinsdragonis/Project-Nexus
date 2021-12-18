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
                src="https://i.pinimg.com/originals/25/dd/05/25dd05996e495781ab23252c936fa734.jpg"
                alt=""
            />
        </div>
    )
}
