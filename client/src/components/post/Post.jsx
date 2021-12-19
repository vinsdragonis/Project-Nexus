import './post.css';

export default function Post() {
    return (
        <div className="post">
            <img
                className="postImg"
                src="https://wallpapercave.com/wp/wp8093349.jpg"
                alt=""
            />
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">Artificial Intelligence</span>
                    <span className="postCat">Smart Devices</span>
                </div>
            </div>
            <span className="postTitle">Robots dominate over mankind!</span>
            <hr />
            <span className="postDate">1 hour ago</span>
            <p className="postDesc">
                Robots appeared out of nowhere in massive amounts and have 
                slaughtered nearly 90% of the human populace. Mankind brought
                this upon itself by being lazy and relying entirely on machines.
            </p>
        </div>
    )
}
