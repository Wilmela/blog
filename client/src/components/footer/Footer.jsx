import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

import "./footer.scss";

const Footer = () => {
  return <div className="footer">
  <span className="company">BLOGGER</span>
   <ul className="footerSocials">
      <li className="socialIcon"> <FaFacebook /> </li>
      <li className="socialIcon"> <FaTwitter /> </li>
      <li className="socialIcon"> <FaInstagram /> </li>
      <li className="socialIcon"> <FaWhatsapp /> </li>
    </ul>

    <div className="footerEnd">
      <span className="champ">@BLOGGER 2022</span>
      <span>All rights reserved.</span>
    </div>
  </div>;
};

export default Footer;
