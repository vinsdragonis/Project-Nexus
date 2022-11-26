import Homepage from './pages/homepage/Homepage';
import About from './pages/about/About';
import Individual from './pages/individual/Individual';
import Profile from './pages/profile/Profile';
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Topbar from "./components/topbar/Topbar";
import {
  BrowserRouter as
  Router,
  Routes,
  Route,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context/Context";
import './app.css';
import axios from 'axios';

function App() {
  const { user } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [list, setList] = useState(true);
  const keys = ["title", "desc"];

  useEffect(() => {
      setLoading(true);
      const fetchPosts = async () => {
          const res = await axios.get(process.env.REACT_APP_BASE_URL+"/api/posts", {mode: 'cors'});
          setLoading(false);
          setPosts(res.data);
      };
      
      fetchPosts();
  }, []);

  const searchs = (posts) => {
    // return posts.filter((item) =>
    // keys.some(key => item[key].toLowerCase().includes(query.toLowerCase()))
    // || item.categories.join("").toString().toLowerCase().includes(query.toLowerCase())
    // );
    return posts;
  };
  
  const p = searchs(posts);

  useEffect(() => {
      if (p.length === 0) {
          setList(false);
      }
      if (p.length) {
          setList(true);
      }
  }, [p.length]);


  return (
    <div className="app">
      <Router>
        <Topbar
          p={p}
          setQuery={setQuery}
          list={list}
          loading={loading}
        />
        <Routes>
          <Route exact path="/" element={<Homepage
            p={p}
            setQuery={setQuery}
            list={list}
            loading={loading} />
          }/>
          <Route exact path="/" element={ <Homepage /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/posts" element={ <Homepage /> } />
          <Route path="/post/:id" element={ <Individual /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/write" element={ user ? <Write /> : <Login /> } />
          <Route path="/settings" element={ user ? <Settings /> : <Login /> } />
          <Route path="/login" element={ user ? <Homepage /> : <Login /> } />
          <Route path="/register" element={ user ? <Homepage /> : <Register /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
