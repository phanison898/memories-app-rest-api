import { getPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/posts.js";
import Verification from "../routes/verify.js";
import express from "express";

const router = express.Router();

router.get("/", Verification, getPosts);
router.get("/:id", Verification, getPostById);
router.post("/", createPost);
router.patch("/:id", Verification, updatePost);
router.delete("/:id", Verification, deletePost);

export default router;
