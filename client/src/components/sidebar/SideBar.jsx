import { useState, useEffect, useContext } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

import "./siderbar.scss";

import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const ListItem = ({ className, handleClick, children }) => (
  <li className={className} onClick={handleClick}>
    {children}
  </li>
);

const SideBar = () => {
  const {user} = useContext(AppContext);
  const PF = "http://localhost:5000/images/";

  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      const { data } = await axios.get("/categories");
      setCats(data);
    };
    getCat();
  }, []);

  return (
    <div className="sideBar">
      <div className="sideBarItem">
        <span className="title">ABOUT</span>
        <img src={PF + user?.profilePicture} alt="profile" className="sideBarImg" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
          voluptatum esse distinctio saepe rem excepturi laboriosam eaque,
        </p>
      </div>
      <div className="sideBarItem">
        <span className="title">CATEGORIES</span>
        <ul className="sideBarList">
          {cats.map((cat) => (
            <Link key={cat._id} className="link" to={`/?cat=${cat.name}`}>
              <li className="sidebarListItem cat">{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sideBarItem">
        <span className="title">CHAT US</span>
        <ul className="sideBarSocials">
          <ListItem className="sideSocialIcon">
            <FaFacebook />
          </ListItem>
          <ListItem className="sideSocialIcon">
            <FaTwitter />
          </ListItem>
          <ListItem className="sideSocialIcon">
            <FaInstagram />
          </ListItem>
          <ListItem className="sideSocialIcon">
            <FaWhatsapp />
          </ListItem>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
