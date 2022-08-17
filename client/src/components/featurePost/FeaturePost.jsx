import { Link } from 'react-router-dom';
import './featurePost.css';

export default function FeaturePost({ post }) {
	console.log(post);
	return (
		<div className="posts">
			<Link className="link" to={`/post/${ post._id }`}>
				<div className="feat-container">
					<div className="feat-hero">
						<img src={ post.photo } alt="" />
					</div>
					<div className="feat-user-img">
						{post.photo &&
							//TODO: Feature Post Author Image here
						<img src="https://source.unsplash.com/phIFdC6lA4E/200x200" alt="" />
						}
					</div>
					<div className="feat-body">
						<h3><span className="feat-user">User: </span>{ post.username }</h3>
						<p className="feat-cat">Category: <span>{ post.categories }</span></p>
						<div className="feat-title">
							<h3>{ post.title }</h3>
							<span>{ new Date(post.createdAt).toDateString() }</span>
							<p className="feat-desc">
									{ post.desc }
							</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
        // <div className="post">
        //     { post.photo && 
        //         <img
        //             className="postImg"
        //             src={ post.photo }
        //             alt=""
        //         />
        //     }
        //     <div className="postInfo">
        //         <div className="postCats">
        //             { post.categories.map((c) => (
        //                 <span key={ "c._id" } className="postCat">{ c.name }</span>
        //             )) }
        //         </div>
        //     </div>
        //     <span className="postTitle">
        //         <Link className="link" to={`/post/${ post._id }`}>
        //             { post.title }
        //         </Link>
        //     </span>
        //     <hr />
        //     <span className="postDate">{ new Date(post.createdAt).toDateString() }</span>
        //     <p className="postDesc">
        //         { post.desc }
        //     </p>
        // </div>
    )
}
