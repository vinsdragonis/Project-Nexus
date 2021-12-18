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
                src="https://mocah.org/thumbs/509763-Black-Hole-Sci.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
            />
        </div>
    )
}
