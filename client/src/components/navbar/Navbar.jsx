import "./navbar.scss";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

import PROFILE from "../../assets/profile.jpg";//

import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import SideMenu from "../sideMenu/SideMenu";

const Navbar = () => {
  const { toggle, setToggle, user } = useContext(AppContext);
  const PF = "http://localhost:5000/images/";

  return (
    <nav>
      <div className="navLeft">
        <h3 className="navLogo ">
          <Link className="link" to="/">
            Blogger
          </Link>
        </h3>
      </div>
      <div className="navRight">
        <AiOutlineSearch className="navIcon search" />
        {user ? (
          <Link className="link" to="/settings">
            <img
              src={PF + user?.profilePicture}
              alt="settings"
              className="navProfileImg"
            />
          </Link>
        ) : (
          <>
            <Link className="link linkMargin" to="/login">
              Login
            </Link>
            <Link className="link" to="/register">
              Register
            </Link>
          </>
        )}

        {toggle ? (
          <AiOutlineClose
            onClick={() => setToggle(false)}
            className="navIcon"
          />
        ) : (
          <AiOutlineMenu onClick={() => setToggle(true)} className="navIcon" />
        )}
      </div>
      <SideMenu />
    </nav>
  );
};

export default Navbar;
