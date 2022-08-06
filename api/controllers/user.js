import bcrypt from "bcrypt";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const update = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(401).json(err);
      }
    }
  } else {
    res.status(500).json("you can update only your account");
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    try {
      await Post.deleteMany({ username: user.username });
      await User.deleteOne({ username: user.username });

      res.status(200).json("user deleted successfully.");
    } catch (error) {
      res.status(401).json(error);
    }
  } else {
    res.status(401).json("User does not exist");
  }
};

export const getOne = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.status(200).json(foundUser);
  } catch (error) {
    // res.status(500).json(error);
    res.status(404).json("User does not exist");
  }
};
