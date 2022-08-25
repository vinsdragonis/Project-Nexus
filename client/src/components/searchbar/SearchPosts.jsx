import "./searchPosts.css";
import SearchIcon from "../icons/SearchIcon";

export default function SearchPosts({ setQuery }) {

    return (
      <div className="search-container">
        <div className="searchInputWrapper">
          <input
            onChange={(e) => setQuery(e.target.value)}
            className="searchInput"
            type="text"
            placeholder="Seach posts..."
          />
          <div className="searchIcon">
            <SearchIcon />
          </div>
        </div>
      </div>
    );
}