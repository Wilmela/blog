import { createError } from "../utils/errors.js";
import bcrypt from "bcrypt";

import User from "../models/User.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    //check if email is already taken
    const isTaken = await User.findOne({ email }).select(
      "email, username, password"
    );
    if (isTaken) {
      return next(createError(403, "Email already taken"));
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Register new user
    const newUser = new User({ username, email, password: hashedPassword });
    const user = await newUser.save();

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }).select(
      "username email password"
    );
    if (!user) return next(createError(404, "User not found"));

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return next(createError(404, "Enter your credentials"));

    const { password, ...others } = user._doc; //removes password form res.json

    return res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};
