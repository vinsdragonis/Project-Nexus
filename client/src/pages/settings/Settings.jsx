import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";

export default function Settings() {
    // const [file, setFile] = useState(null);
    const [file] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [desc, setDesc] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const { user, dispatch } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            file,
            fullname,
            username,
            email,
            desc,
            password,
        };

        // if (file) {
        //     const data = new FormData();
        //     const filename = Date.now() + file.name;
        //     data.append("name", filename);
        //     data.append("file", file);
        //     updatedUser.profilePic = filename;
        //     try {
        //         await axios.post("/upload", data);
        //     } catch (err) {}
        // }

        if (updatedUser.fullname === "") {
            updatedUser.fullname = user.fullname;
        }

        if (updatedUser.username === "") {
            updatedUser.username = user.username;
        }
        
        if (updatedUser.email === "") {
            updatedUser.email = user.email;
        }
        
        if (updatedUser.password === "") {
            updatedUser.password = user.password;
        }
        

        try {
            const res = await axios.put("http://localhost:5000/api/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    const handleDeleteAcc = async () => {
        try {
        await axios.delete(`http://localhost:5000/api/users/${user._id}`, {
            data: { userId: user._id },
        });
            window.location.replace("/");
            dispatch({ type: "LOGOUT" });
        } catch (error) {}
    };

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
                    <div className="settings">
                        <div className="settingsWrapper">
                            <div className="settingsTitle">
                                <span className="settingsTitleUpdate">Update Your Account</span>
                                <span className="settingsTitleDelete"
                                    onClick={ handleDeleteAcc }
                                >
                                    Delete Account
                                </span>
                            </div>
                            <form
                                className="settingsForm"
                                autoComplete='off'
                                onSubmit={ handleSubmit }
                            >
                                <label>Profile Picture</label>
                                <div className="settingsPP">
                                    <img
                                        src={ file ? URL.createObjectURL(file) : user.profilePic }
                                        alt=""
                                    />
                                    {/* <label htmlFor="fileInput">
                                        <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                                    </label>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        style={{ display: "none" }}
                                        className="settingsPPInput"
                                        onChange={ (e) => setFile(e.target.files[0]) }
                                    /> */}
                                    {/* <input
                                        id="fileInput"
                                        type="text"
                                        name="fileInput"
                                        placeholder="Profile image URL"
                                        className="fileInput"
                                        autoComplete="off"
                                        onChange={ (e) => setFile(e.target.files[0]) }
                                    /> */}
                                </div>
                                <label>Full name</label>
                                <input
                                    type="text"
                                    placeholder="Timmy"
                                    name="name"
                                    autoComplete="off"
                                    onChange={ (e) => setFullname(e.target.value) }
                                />
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder="Tim01"
                                    name="name"
                                    autoComplete="off"
                                    onChange={ (e) => setUsername(e.target.value) }
                                />
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="example@domain.com"
                                    autoComplete="off"
                                    name="email"
                                    onChange={ (e) => setEmail(e.target.value) }
                                />
                                <label>Description</label>
                                <input
                                    type="text"
                                    placeholder="Hey there! I'm new around here..."
                                    autoComplete="off"
                                    name="Description"
                                    onChange={ (e) => setDesc(e.target.value) }
                                />
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="off"
                                    name="password"
                                    onChange={ (e) => setPassword(e.target.value) }
                                />
                                <button className="settingsSubmitButton" type="submit">
                                    Update
                                </button>
                                { success && (
                                    <span
                                        style={{
                                            color: "green",
                                            textAlign: "center",
                                            marginTop: "20px"
                                        }}
                                    >
                                        Profile has been updated...
                                    </span>
                                )}
                            </form>
                        </div>
                        <Sidebar />
                    </div>
                )
            }
        </>
    )
}
