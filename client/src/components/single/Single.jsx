import "./single.scss";
import SideBar from "../sidebar/SideBar";
import SinglePost from "../singlePost/SinglePost";

const Single = () => {
  return (
    <div className="single">
      <SinglePost />
      <SideBar />
    </div>
  );
};

export default Single;
