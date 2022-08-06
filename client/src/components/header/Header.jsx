import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="headerText">
        <span className="welcome">welcome!</span>
        <span className="champ">blogger</span>

        <a href="#posts" className="explore">EXPLORE</a>
      </div>
    </header>
  );
};

export default Header;
