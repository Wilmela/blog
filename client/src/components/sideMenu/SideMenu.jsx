import "./sideMenu.scss";
import PROFILE from "../../assets/profile.jpg";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const { toggle, setToggle, user, dispatch } = useContext(AppContext);
  const PF = "http://localhost:5000/images/";

  const ListItem = ({ className, children }) => (
    <li className={className} onClick={()=>setToggle(false)}>
      {children}
    </li>
  );
  const handleClick =()=>{
    dispatch({type:'LOGOUT'})
    setToggle(false)
    window.location.reload();
  }
  return (
    <>
      {toggle && (
        <motion.div
          whileInView={{ x: [-100, -32] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="sideMenu"
        >
          <div className="sideMenuWrapper">
            <div className="sideMenuTop">
              {user && (
                <>
                  <img src={PF + user?.profilePicture} alt="profile" className="sideMenuProfileImg" />

                  <ul className="sideMenuTopSocials">
                    <ListItem className="sideMenuTopSocialIcon"> <FaFacebook /> </ListItem>
                    <ListItem className="sideMenuTopSocialIcon"> <FaTwitter /> </ListItem>
                    <ListItem className="sideMenuTopSocialIcon"> <FaInstagram /> </ListItem>
                    <ListItem className="sideMenuTopSocialIcon"> <FaWhatsapp /> </ListItem>
                  </ul>

                  <hr className="sideMenuHr" />
                </>
              )}
            </div>

            <div className="sideMenuBottom">
              <ul className="sideMenuBottomItems">
               <ListItem className="sideMenuBottomItem" > <Link to='/' className="link"> home </Link> </ListItem>
               <ListItem className="sideMenuBottomItem" > <Link to='/about' className="link"> about </Link> </ListItem>
               <ListItem className="sideMenuBottomItem" > <Link to='/write' className="link"> write </Link> </ListItem>
               <ListItem className="sideMenuBottomItem" > <Link to='/contact' className="link"> contact </Link> </ListItem>
               <Link to='/login' onClick={handleClick} className="sideMenuBottomItem link"> {user && 'logout'} </Link>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SideMenu;
