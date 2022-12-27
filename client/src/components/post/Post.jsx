import { Link } from 'react-router-dom';
import './post.css';

export default function Post({ post }) {
    return (
        <div className="post">
            { post.photo && 
                <img
                    className="postImg"
                    src={ post.photo }
                    alt=""
                />
            }
            <div className="postInfo">
                <div className="postCats">
                    { post.categories.map((c) => (
                        <span key={ "c._id" } className="postCat">{ c.name }</span>
                    )) }
                </div>
            </div>
            <span className="postTitle">
                <Link className="link" to={`/post/${ post._id }`}>
                    { post.title }
                </Link>
            </span>
            <hr />
            <span className="postDate">{ new Date(post.createdAt).toDateString() }</span>
            <p className="postDesc">
                { post.desc }
            </p>
        </div>
    )
}
