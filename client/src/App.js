import Homepage from './pages/homepage/Homepage';
import About from './pages/about/About';
import Individual from './pages/individual/Individual';
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Topbar from "./components/topbar/Topbar";
import {
  BrowserRouter as
  Router,
  Routes,
  Route
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import './app.css';

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route exact path="/" element={ <Homepage /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/posts" element={ <Homepage /> } />
        <Route path="/post/:id" element={ <Individual /> } />
        <Route path="/write" element={ user ? <Write /> : <Login /> } />
        <Route path="/settings" element={ user ? <Settings /> : <Login /> } />
        <Route path="/login" element={ user ? <Homepage /> : <Login /> } />
        <Route path="/register" element={ user ? <Homepage /> : <Register /> } />
      </Routes>
    </Router>
  );
}

export default App;
