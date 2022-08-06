import express from "express";

import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import postRoutes from "./post.js";
import catRoutes from "./category.js";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/categories", catRoutes);

export default router;

