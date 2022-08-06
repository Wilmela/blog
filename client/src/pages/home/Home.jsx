import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import "./home.scss";

const Home = () => {
  
  return (
    <div>
      <Header />
      <div className="container">
        <Posts />
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
