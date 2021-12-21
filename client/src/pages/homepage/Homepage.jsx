import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Posts from '../../components/posts/Posts';
import './homepage.css';

export default function Homepage() {    
    const [posts, setPosts] = useState([]);
    const { search } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:5000/api/posts" + search, {mode: 'cors'});
            setPosts(res.data);
        };
        
        fetchPosts();
    }, [search]);

    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={ posts } />
                <Sidebar />
            </div>
        </>
    )
}
