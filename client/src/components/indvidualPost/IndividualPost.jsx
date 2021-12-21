import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import './individualPost.css';

export default function IndividualPost() {
    const location = useLocation()
    const path =location.pathname.split("/")[2];
    const PF = "http://localhost:5000/images/";
    const [post, setPost] = useState({});  
    // const [title, setTitle] = useState("");
    // const [desc, setDesc] = useState("");
    // const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("http://localhost:5000/api/posts/" + path);
            setPost(res.data);
            // setPost(res.data);
            // setTitle(res.data.title);
            // setDesc(res.data.desc);
        };
        getPost();
    }, [path])

    return (
        <div>
            <div className="indPostWrapper">
                { post.photo &&    
                    <img
                        className="indPostImg"
                        src={ PF + post.photo }
                        alt=""
                    />}
                <h1 className="indPostTitle">
                    { post.title }
                    <div className="indPostEdit">
                        <i className="indPostIcon far fa-edit"></i>
                        <i className="indPostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="indPostInfo">
                    <span>
                        Author:
                        <b className="indPostAuthor">
                            <Link className="link" to={`/?user=${post.username}`}>
                                { post.username }
                            </Link>
                        </b>
                    </span>
                    <span>{ new Date(post.createdAt).toDateString() }</span>
                </div>
                <p className="indPostDesc">
                    { post.desc }
                </p>
            </div>
        </div>
    )
}
