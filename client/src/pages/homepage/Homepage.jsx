import { useLocation } from "react-router";
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Posts from '../../components/posts/Posts';
import './homepage.css';

export default function Homepage() {
    const location = useLocation();
    console.log(location);
    
    return (
        <>
            <Header />
            <div className="home">
                <Posts />
                <Sidebar />
            </div>
        </>
    )
}
