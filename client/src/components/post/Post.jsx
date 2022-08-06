import { Link } from "react-router-dom";
import "./post.scss";

// import POST from "../../assets/post1.jpg";

const Post = ({ _id, title, desc, photo, username, categories, createdAt }) => {
  const PF ='http://localhost:5000/images/'
  return (
    <div className="post">
      {photo && <img src={PF + photo} alt="tech" loading="lazy" className="postImg" />}
      <div className="postInfo">
        <div className="postCats">
          {categories.map((cat) => (
            <span key={cat._id} className="postCat">{cat.name}</span>
          ))}
        </div>
        <Link className='link' to={`/post/${_id}`}>
          <span className="postTitle">{title}</span>
        </Link>
        <hr />
        <span className="postDate">{new Date(createdAt).toDateString()}</span>
        <p className="postDesc"> {desc} </p>
      </div>
    </div>
  );
};

export default Post;
