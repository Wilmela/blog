import express from "express";
import {
  createPost,
  getOnePost,
  getAllPosts,
  update,
  deletePost,
} from "../controllers/post.js";

const router = express.Router();

router.post("/", createPost);
router.put("/:id", update);
router.delete("/:id", deletePost);
router.get("/:id", getOnePost);
router.get("/", getAllPosts);

export default router;
