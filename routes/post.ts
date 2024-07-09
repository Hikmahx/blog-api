import express from "express";
import { body } from "express-validator";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/post";

const router = express.Router();

// GET ALL POSTS
router.get("/", getPosts);

// GET POST BY ID
router.get("/:postId", getPostById);

// CREATE NEW POST
router.post(
  "/",
  body("title", "Title cannot be empty").not().isEmpty(),
  body("content", "Content cannot be empty").not().isEmpty(),
  body("author.name", "Author name cannot be empty").not().isEmpty(),
  body("author.avatar", "Author avatar cannot be empty").not().isEmpty(),
  createPost
);

// UPDATE POST
router.put(
  "/:postId",
  body("title", "Title cannot be empty").not().isEmpty(),
  body("content", "Content cannot be empty").not().isEmpty(),
  body("author.name", "Author name cannot be empty").not().isEmpty(),
  body("author.avatar", "Author avatar cannot be empty").not().isEmpty(),
  updatePost
);

// DELETE POST
router.delete("/:postId", deletePost);

module.exports = router;
