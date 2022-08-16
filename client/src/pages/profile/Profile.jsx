import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useLocation } from "react-router";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import Posts from "../../components/posts/Posts";
import Pagination from "../../components/pagination/Pagination";
import "./profile.css";

export default function Profile() {
  const { user } = useContext(Context);
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const res = await axios.get(
        "https://shrouded-basin-56205.herokuapp.com/api/posts" + search,
        { mode: "cors" }
      );
      setLoading(false);
      setPosts(res.data);
    };

    fetchPosts();
  }, [search]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
	}, []);

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	// Change page
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
            // <div className="profileWrapper">
            //     <div className="profileContainer">
            //         <div className="profileDetails glow-on-hover">
            //             <h1 className="profileTitle">MY PROFILE</h1>
            //             <div className="profileImgContainer" style={{ paddingBottom: '20px' }}>
            //                 <img
            //                     src={ user.profilePic }
            //                     alt=""
            //                 />
            //             </div>
            //             <ul className="user-profile" style={{ listStyleType: 'none' }}>
            //                 <li>
            //                     <p className="userProfileDetails">
            //                         <strong>Full name:</strong>
            //                         <span>
            //                             { user.fullname }
            //                         </span>
            //                     </p>
            //                 </li>
            //                 <li>
            //                     <p className="userProfileDetails">
            //                         <strong>Username:</strong>
            //                         <Link className="link" to={`/?user=${user.username}`}>
            //                             <span>
            //                                 { user.username }
            //                             </span>
            //                         </Link>
            //                     </p>
            //                 </li>
            //                 <li>
            //                     <p className="userProfileDetails">
            //                         <strong>Email:</strong>
            //                         <span>
            //                             { user.email }
            //                         </span>
            //                     </p>
            //                 </li>
            //                 <li>
            //                     <p className="userProfileDetails">
            //                         <strong>Joined on:</strong>
            //                         <span>
            //                             { new Date(user.createdAt).toDateString() }
            //                         </span>
            //                     </p>
            //                 </li>
            //                 {
            //                     user.desc &&
            //                     <li>
            //                         <p className="userProfileDetails">
            //                             <strong>Bio:</strong>
            //                             <span>
            //                                 { user.desc }
            //                             </span>
            //                         </p>
            //                     </li>
            //                 }
            //             </ul>
            //         </div>
            //     </div>
            // </div>
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
								<h2>{ user.username}'s Posts</h2>
								<Posts posts={currentPosts} />
								<Pagination
									postsPerPage={postsPerPage}
									totalPosts={posts.length}
									paginate={paginate}
								/>
							</div>
							<div className="feature-posts">
								<h2>Featured Posts</h2>
            		<Posts posts={posts} />
							</div>
          </div>
        </div>
      )}
    </>
  );
}
