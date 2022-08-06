import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.scss";

import POST2 from "../../assets/post2.jpg";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const SinglePost = () => {
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(AppContext);

  const [post, setPost] = useState({});
  const [updatePost, setUpdatePost] = useState({ title: "", desc: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];


  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title: updatePost.title,
        desc: updatePost.desc,
      });
      setIsEditMode(false);
      // window.location.reload();
    } catch (error) {}
  };

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get("/posts/" + path);
      setPost(data);
      setUpdatePost({
        title: data.title,
        desc: data.desc,
      });
    };
    getPost();
  }, [path]);

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="post" className="singlePostImg" />
        )}
        {isEditMode ? (
          <input
            value={updatePost.title}
            autoFocus
            className="singlePostTitleInput"
            onChange={(e) =>
              setUpdatePost({ ...updatePost, title: e.target.value })
            }
          />
        ) : (
          <h1 className="singlePostTitle">
            {updatePost.title}
            <div className="singlePostEdit">
              {post.username === user?.username && (
                <FaEdit
                  className="singlePostIcon"
                  onClick={() => setIsEditMode((prev) => !prev)}
                />
              )}
              <FaTrash className="singlePostIcon" onClick={handleDelete} />
            </div>
          </h1>
        )}
        <div className="singPostInfo">
          <span className="singlePostAuthor">
            <Link className="link" to={`/?user=${post.username}`}>
              <b>Author: {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {isEditMode ? (
          <textarea
            value={updatePost.desc}
            className="singlePostDescInput"
            onChange={(e) =>
              setUpdatePost({ ...updatePost, desc: e.target.value })
            }
          />
        ) : (
          <p className="singlePostDesc">{updatePost.desc}</p>
        )}
      </div>
      {isEditMode && (
        <button className="singPostButton" onClick={handleUpdate}>
          Update
        </button>
      )}
    </div>
  );
};

export default SinglePost;
