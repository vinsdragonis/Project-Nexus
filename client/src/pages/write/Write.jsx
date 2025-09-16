import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./write.css";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import { Context } from "../../context/Context";

export default function Write() {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [categoriesString, setCategoriesString] = useState("");
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            photo,
            title,
            categories,
            desc,
        };

        // if (photo) {
        //     const data =new FormData();
        //     const filename = Date.now() + photo.name;
        //     data.append("name", filename);
        //     data.append("photo", photo);
        //     newPost.photo = filename;
        //     try {
        //         await axios.post(process.env.REACT_APP_BASE_URL+"/api/upload", data);
        //     } catch (err) {}
        // }

        try {
            console.log("Sending post data:", newPost); // Debug log
            const res = await axios.post(process.env.REACT_APP_BASE_URL+"/api/posts", newPost);
            console.log("Post created successfully:", res.data); // Debug log
            navigate("/post/" + res.data._id); // Use navigate instead of window.location.replace
        } catch (err) {
            console.error("Error creating post:", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        setCategories(categoriesString.split(',').map((ele) => {
            return ele.trim();
        }))
    },[categoriesString])

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, []);

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
                    <div className="write">
                        {/* {photo && (
                            <img
                                className="writeImg"
                                src={URL.createObjectURL(photo)}
                                alt=""
                                width="500px"
                                height="250px"
                            />
                        )} */}
                        <form className="writeForm" onSubmit={ handleSubmit }>
                            <div className="writeFormGroup">
                                {/* <label htmlFor="fileInput">
                                    <i className="writeIcon fas fa-plus"></i>
                                </label> */}
                                <input
                                    className="writeInput"
                                    placeholder="Title"
                                    type="text"
                                    autoFocus={ true }
                                    onChange={ e=>setTitle(e.target.value) }
                                />
                            </div>
                            <div className="writeFormGroup">
                                <input
                                    className="writeInput"
                                    type="text"
                                    placeholder="Enter image URL"
                                    onChange={ (e) => setPhoto(e.target.value) }
                                />
                                <input
                                    className="writeInput"
                                    placeholder="categories separated by ','"
                                    type="text"
                                    autoFocus={ true }
                                    onChange={ e=> setCategoriesString(e.target.value) }
                                />
                            </div>
                            <div className="writeFormGroup">
                                <textarea
                                    className="writeInput writeText"
                                    placeholder="Tell your story..."
                                    type="text"
                                    autoFocus={ true }
                                    onChange={ e=>setDesc(e.target.value) }
                                />
                            </div>
                            <button className="writeSubmit" type="submit">
                                Publish
                            </button>
                        </form>
                    </div>
                )
            }
        </>        
    )
}
