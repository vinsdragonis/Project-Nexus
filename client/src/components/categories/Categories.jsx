import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import './categories.css';

export default function Categories() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        let isMounted = true; 
        const getCats = async () => {
            const res = await axios.get(process.env.REACT_APP_BASE_URL+"/api/categories");
            if (isMounted) setCats(res.data);
        };
        
        getCats();
        return () => { isMounted = false };
    }, []);

    return (
        <div className="catBar">
            <div className="catBarItem">
                <span className="catBarTitle">CATEGORIES</span>
                <ul className="catBarList">
                    { cats.map((c) => (
                        <Link key={ c._id } to={`/?cat=${c.name}`} className="link">
                            <li className="catBarListItem">
                                { c.name }
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}
