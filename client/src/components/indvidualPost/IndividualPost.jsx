import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import SyncLoader from "react-spinners/SyncLoader";
import './individualPost.css';

export default function IndividualPost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getPost = async () => {
            const res = await axios.get(process.env.REACT_APP_BASE_URL+"/api/posts/" + path);
            setPost(res.data);
            setLoading(false);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path]);

    const handleUpvote = async () => {
        const newVote = {
            post: post._id,
            user: user._id,
            type: true
        };
        try{
            const res = await axios.post(process.env.REACT_APP_BASE_URL+`/api/posts/upvote`, newVote);
        } catch (err){
            // console.log(err);
        }
    }

    const handleDelete = async () => {
        try {
        await axios.delete(process.env.REACT_APP_BASE_URL+`/api/posts/${post._id}`, {
            data: { username: user.username },
        });
        window.location.replace("/");
        } catch (err) {}
    };

    const handleUpdate = async () => {
        try {
            await axios.put(process.env.REACT_APP_BASE_URL+`/api/posts/${post._id}`, {
                user: user._id,
                title,
                desc,
            });
            setUpdateMode(false)
        } catch (err) {}
    };

    return (
        <>
            { loading ? 
                (
                    <div className="loader">  
                        <SyncLoader
                            color={"#ffa000"}
                            loading={loading}
                            size={25}
                            margin={5}
                        />
                    </div>
                ) : (
                    <div>        
                        <div className="indPostWrapper">
                            { post.photo &&    
                                <img
                                    className="indPostImg"
                                    src={ post.photo }
                                    alt=""
                                />
                            }
                            { updateMode ? (
                                <input
                                    type="text"
                                    value={title}
                                    className="indPostTitleInput"
                                    autoFocus
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            ) : (
                                <h1 className="indPostTitle">
                                    { title }
                                    {user && post.user ? post.user._id === user._id && (
                                    <div className="indPostEdit">
                                        <i
                                            className="indPostIcon far fa-edit"
                                            onClick={() => setUpdateMode(true)}
                                        ></i>
                                        <i
                                        className="indPostIcon far fa-trash-alt"
                                        onClick={handleDelete}
                                        ></i>
                                    </div>
                                    ):""}
                                </h1>
                            )}
                            <div className="indPostInfo">
                                <span>
                                    Author:
                                    <b className="indPostAuthor">
                                        <Link className="link" to={`/?user=${post.user?post.user._id:""}`}>
                                            { post.user?post.user.fullname:"" }
                                        </Link>
                                    </b> | {post.votes?post.votes.length +" Votes":""} {user?(<button onClick={handleUpvote}>Upvote</button>):""}
                                </span>
                                <span>{ new Date(post.createdAt).toDateString() }</span>
                            </div>
                            {updateMode ? (
                                <textarea
                                    className="indPostDescInput"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                                ) : (
                                    <p className="indPostDesc">{desc}</p>
                                )}
                                {updateMode && (
                                <button className="indPostButton" onClick={handleUpdate}>
                                    Update
                                </button>
                            )}
                        </div>
                    </div>
                )
            }
        </>
    )
}
