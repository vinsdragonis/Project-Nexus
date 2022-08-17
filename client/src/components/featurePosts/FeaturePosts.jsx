import FeaturePost from '../featurePost/FeaturePost';
import './featurePosts.css';

export default function FeaturePosts({ posts }) {
    return (
        <div className="posts">
            { posts.slice().reverse().map((p) => (
                <FeaturePost key={ p._id } post={ p } />
            ))}
        </div>
    )
}
