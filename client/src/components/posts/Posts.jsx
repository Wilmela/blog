import axios from "axios";
import { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import "./posts.scss";
import Post from "../post/Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("/posts" + search);
      setPosts(data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      {posts.length > 0 ? (
        <div id="posts" className="posts">
          {posts.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      ) : (
        <span className="noPost">
          <Link to='/write' className="link">Add a po</Link>st
        </span>
      )}
    </>
  );
};

export default Posts;
