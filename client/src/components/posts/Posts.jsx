import { useState } from 'react';
import Post from '../../components/post/Post';
import './posts.css';

export default function Posts({ posts }) {
    const [num, setNum] = useState(6)

    return (
        <div className='postsContainer'>
            <div className="posts">
                { posts.slice().reverse().map((p,idx) => (
                    idx < num && <Post key={ p._id } post={ p } />
                ))}
            </div>
            <div className='loadMore'>
                {
                    num < posts.length && <button className='loadMoreBtn' onClick={() => setNum((p) => p+6)}>Load More</button>
                }
            </div>
        </div>
    )
}
