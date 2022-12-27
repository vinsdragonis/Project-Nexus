import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Categories from '../../components/categories/Categories';
import Posts from '../../components/posts/Posts';
import SyncLoader from "react-spinners/SyncLoader";
import './homepage.css';

export default function Homepage() {    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { search } = useLocation();

    useEffect(() => {
        setLoading(true);
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:5000/api/posts" + search, {mode: 'cors'});
            setLoading(false);
            setPosts(res.data);
        };
        
        fetchPosts();
    }, [search]);

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
                    <>
                        <Header />
                        <div className="home">
                            <Categories />
                            <Posts posts={ posts } />
                            <Sidebar />
                        </div>
                    </>
                )
            }
        </>
    )
}
