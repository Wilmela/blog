import Post from "../models/Post.js";
import User from "../models/User.js";

//Create
export const createPost = async (req, res) => {
  const { title, desc, username } = req.body;
  if (!title || !desc || !username) {
    return res.status(403).json("credentials missing");
  }

  try {
    const newPost = new Post(req.body);
    const post = await newPost.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update
export const update = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.username === req.body.username) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      const { password, ...others } = updatedPost._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("You can only update your post");
  }
};

//delete
export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.username === req.body.username) {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("Post deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("You can only delete your post");
  }
};

//get post
export const getOnePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    try {
      await Post.findOne({post});
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json('Post does not exist');
  }
};

//get All posts
export const getAllPosts = async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
