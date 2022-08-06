import { useContext } from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import Register from "./pages/register/Register";
import Single from "./components/single/Single";
import Write from "./components/write/Write";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import { AppContext } from "./context/AppContext";
import Footer from "./components/footer/Footer";

const App = () => {
  const {user} = useContext(AppContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={user ? <Home/> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register/>} />
        <Route path="/settings" element={user ? <Settings /> : <Register/>} />
        <Route path="/register" element={user ? <Login /> : <Register/>} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
