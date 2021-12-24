import Post from '../../components/post/Post';
import './posts.css';

export default function Posts({ posts }) {
    return (
        <div className="posts">
            { posts.slice().reverse().map((p) => (
                <Post key={ p._id } post={ p } />
            ))}
        </div>
    )
}
