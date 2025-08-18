import { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import Posts from "../../components/posts/Posts";
import Pagination from "../../components/pagination/Pagination";
import "./userProfile.css";

export default function UserProfile() {
  const { user } = useContext(Context);
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/users/username/${username}`
        );
        setProfileUser(res.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  // Fetch user's posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/posts?user=${username}`
        );
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };

    if (username) {
      fetchUserPosts();
    }
  }, [username]);

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page (Pagination)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!user) {
    return null; // Will redirect to login due to useEffect
  }

  return (
    <>
      {loading ? (
        <div className="loader">
          <SyncLoader
            color={"#ffa000"}
            loading={loading}
            size={25}
            margin={5}
          />
        </div>
      ) : (
        <div className="profile">
          {profileUser ? (
            <div className="prof-container">
              <div className="prof-hero">
                <img
                  src="https://source.unsplash.com/phIFdC6lA4E/"
                  alt="Profile cover"
                />
              </div>

              <div className="prof-section">
                <div className="prof-img">
                  <img
                    src={profileUser.profilePic}
                    alt={profileUser.fullname}
                  />
                </div>
                <div className="prof-detail-main">
                  <h1>{profileUser.fullname}</h1>
                  <h4 className="prof-username">{profileUser.username}</h4>
                  <p className="prof-bio">{profileUser.desc}</p>
                </div>
                <div className="prof-detail-sub">
                  <div className="prof-cta">
                    <div className="prof-meta">
                      <h3>
                        <span className="prof-meta-title">Username: </span>
                        <span className="prof-meta-value">
                          {profileUser.username}
                        </span>
                      </h3>
                      <h3>
                        <span className="prof-meta-title">Joined on: </span>
                        <span className="prof-meta-value">
                          {new Date(profileUser.createdAt).toDateString()}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="user-not-found">
              <h2>User not found</h2>
              <p>The user you're looking for doesn't exist or has been removed.</p>
              <Link to="/" className="link">
                Return to homepage
              </Link>
            </div>
          )}

          {profileUser && (
            <div className="prof-feat-container">
              <div className="prof-posts">
                <h2>{profileUser.username}'s Posts</h2>
                {posts.length > 0 ? (
                  <>
                    <Posts posts={currentPosts} />
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={posts.length}
                      paginate={paginate}
                      currentPosts={currentPosts}
                    />
                  </>
                ) : (
                  <p className="no-posts-message">
                    This user hasn't published any posts yet.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}