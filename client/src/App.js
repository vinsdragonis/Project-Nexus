import Homepage from './pages/homepage/Homepage';
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

function App() {
  const currentUser = false;
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route exact path="/" element={ <Homepage /> } />
        <Route path="/posts" element={ <Homepage /> } />
        <Route path="/post/:id" element={ <Individual /> } />
        <Route path="/write" element={ currentUser ? <Write /> : <Login /> } />
        <Route path="/settings" element={ currentUser ? <Settings /> : <Login /> } />
        <Route path="/login" element={ currentUser ? <Homepage /> : <Login /> } />
        <Route path="/register" element={ currentUser ? <Homepage /> : <Register /> } />
      </Routes>
    </Router>
  );
}

export default App;
