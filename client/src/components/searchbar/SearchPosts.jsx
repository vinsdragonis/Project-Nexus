import { useState, useEffect } from "react";
import Posts from "../posts/Posts";
import "./searchPosts.css";
import SearchIcon from "../icons/SearchIcon";

export default function SearchPosts({ posts }) {

  const [query, setQuery] = useState("");
  const [list, setList] = useState(true);
  const keys = ["username", "title", "desc"];

  const search = (posts) => {
    return posts.filter((item) =>
      keys.some(key => item[key].toLowerCase().includes(query))
      || item.categories.join("").toString().toLowerCase().includes(query)
    )
  };

  const p = search(posts);

  useEffect(() => {
    if (p.length === 0) {
      setList(false);
    }
    if (p.length) {
      setList(true);
    }
  }, [p.length])

    return (
        <div className="search-container">
         <div className="searchInputWrapper">
          <input
            onChange={(e) => setQuery(e.target.value)}
            className="searchInput"
            type="text"
            placeholder="Seach..."
          />
          <div className="searchIcon">
            <SearchIcon />
          </div>
        </div>
        { list ? <Posts posts={ search(posts) } /> : <div className="postless">No Posts Found :(</div> }
        </div>
    );
}