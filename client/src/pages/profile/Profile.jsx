import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import Posts from "../../components/posts/Posts";
import Pagination from "../../components/pagination/Pagination";
import "./profile.css";

export default function Profile() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
    
  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {      
      const res = await axios.get(
        "https://shrouded-basin-56205.herokuapp.com/api/posts",
        {
          mode: "cors"
        }
      );
      setLoading(false);
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  // Return Single users Posts
  const allUserPosts = posts.map((un) => {
    if (un.username === user.username) {
      return ({
        username: un.username,
        categories: un.categories,
        createdAt: un.createdAt,
        desc: un.desc,
        photo: un.photo,
        title: un.title,
        updatedAt: un.updatedAt,
        __v: un.__v,
        _id: un._id,
      });
    }
    return null;
  });
  
  const OnlyUserPosts = allUserPosts;
  const filteredUserPosts = OnlyUserPosts.filter(function (x) {
    return x !== null || undefined;
  });
  // console.log(filteredPosts);

  // Return All Posts except current users posts
  const allPosts = posts.map((ap) => {
    if (ap.username !== user.username) {
      return ({
        username: ap.username,
        categories: ap.categories,
        createdAt: ap.createdAt,
        desc: ap.desc,
        photo: ap.photo,
        title: ap.title,
        updatedAt: ap.updatedAt,
        __v: ap.__v,
        _id: ap._id,
      });
    }
    return null;
  });
  
  const userPosts = allPosts;
  const filteredPosts = userPosts.filter(function (x) {
    return x !== null || undefined;
  });
  console.log(filteredPosts);

  // TODO: refactor to use single endpoint "posts" for pagination
	// Get current posts
	const indexOfLastUserPost = currentPage * postsPerPage;
	const indexOfFirstUserPost = indexOfLastUserPost - postsPerPage;
	const currentUserPosts = filteredUserPosts.slice(indexOfFirstUserPost, indexOfLastUserPost);
	// Change page(Pagination)
  const userPaginate = (pageNumber) => setCurrentPage(pageNumber);

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
	// Change page(Pagination)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
	
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
          {user && (
            <div className="prof-container">
              <div className="prof-hero">
                <img
                  src="https://source.unsplash.com/phIFdC6lA4E/"
                  alt=""
                />
              </div>

              <div className="prof-section">
                <div className="prof-img">
                  <img
                    src={user.profilePic}
                    alt={user.fullname}
                  />
                </div>
                <div className="prof-detail-main">
										<h1>{ user.fullname}</h1>
										<h4 className="prof-username">{ user.username}</h4>
                  <p className="prof-bio">
                    { user.desc }
                  </p>
                </div>
                <div className="prof-detail-sub">
										<div className="prof-cta">
											<div className="prof-meta">
												<h3><span>Username: </span>{ user.username }</h3>
												<h3><span>Email: </span>{ user.email }</h3>
												<h3><span>Joined on: </span>{ new Date(user.createdAt).toDateString() }</h3>
											</div>
                    {user && (
                      <div className="prof-btn-container">
                        <div className="prof-btn">
                          {user && (
                            <Link className="link prof-link" to="/settings">
                              <p>Settings</p>
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
						<div className="prof-feat-container">
							<div className="prof-posts">
                <h2>{user.username}'s Posts</h2>
								<Posts posts={currentUserPosts} />
								<Pagination
									postsPerPage={postsPerPage}
									totalPosts={filteredPosts.length}
									paginate={userPaginate}
									currentPosts={currentUserPosts}
								/>
							</div>
							<div className="feature-posts">
								<h2>Featured Posts</h2>
								<Posts posts={currentPosts} />
								<Pagination
									postsPerPage={postsPerPage}
									totalPosts={filteredPosts.length}
									paginate={paginate}
									currentPosts={currentPosts}
								/>
							</div>
          </div>
        </div>
      )}
    </>
  );
}
