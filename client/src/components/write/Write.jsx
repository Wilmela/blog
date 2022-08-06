import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import "./write.scss";

import POST3 from "../../assets/post3.jpg";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Write = () => {
  const [post, setPost] = useState({ title: "", desc: "", file: undefined });
  const { user } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title: post.title,
      desc: post.desc,
      username: user.username,
      // photo:''
    };
    if (post.file) {
      const data = new FormData();
      const fileName = Date.now() + post.file.name;
      data.append("name", fileName);
      data.append("file", post.file);
      newPost.photo = fileName;

      try {
        await axios.post("/upload", data);
      } catch (error) {}
    }

    try {
      const res = await axios.post("/posts/", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {}
  };

  return (
    <div className="write">
      <div className="writeWrapper">
        {post.file && (
          <img
            src={URL.createObjectURL(post.file)}
            alt="post"
            className="writeImg"
          />
        )}
        <form onSubmit={handleSubmit} className="writeForm">
          <div className="fileInputGroup">
            <label htmlFor="fileInput">
              <FaPlus className="writeIcon" />
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setPost({ ...post, file: e.target.files[0] })}
            />
          </div>
          <div className="writeFormGroup">
            <input
              className="writeInput"
              autoFocus
              type="text"
              placeholder="Title"
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              placeholder="create your post..."
              type="text"
              className="writeInput writeText"
              onChange={(e) => setPost({ ...post, desc: e.target.value })}
            />
          </div>
          <button type="submit" className="writeSubmit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Write;
