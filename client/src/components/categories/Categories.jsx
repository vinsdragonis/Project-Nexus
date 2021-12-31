import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import './categories.css';

export default function Categories() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("http://localhost:5000/api/categories");
            setCats(res.data);
        };
        getCats();
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
