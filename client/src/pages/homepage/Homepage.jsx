import { useEffect, useState } from "react";
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Categories from '../../components/categories/Categories';
import SearchPosts from '../../components/searchbar/SearchPosts';
import SyncLoader from "react-spinners/SyncLoader";
import './homepage.css';
import Posts from "../../components/posts/Posts";

export default function Homepage({p, setQuery, list, loading}) {    

const [width, setWidth] = useState(window.innerWidth);
const breakpoint = 768;
    
  useEffect(() => {
   const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
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
                    <>
                        <Header />
                        <div className="home">
                            <Categories />
                            <div className="main-content">
                                {width > breakpoint ? <SearchPosts setQuery={setQuery} /> : <div></div>}
                                 { list ? <Posts posts={ p } /> : <div className="postless">No Posts Found :(</div> }
                            </div>
                            <Sidebar />
                        </div>
                    </>
                )
            }
        </>
    )
}
