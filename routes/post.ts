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

// GET ALL TASKS
router.get("/", getPosts);

// GET TASKS BY ID
router.get("/:postId", getPostById);

// CREATE NEW TASK
router.post(
  "/",
  body("title", "Title cannot be empty").not().isEmpty(),
  body("content", "Content cannot be empty").not().isEmpty(),
  body("author", "Author cannot be empty").not().isEmpty(),
  createPost
);

// UPDATE TASK
router.put(
  "/:postId",
  body("title", "Title cannot be empty").not().isEmpty(),
  body("content", "Content cannot be empty").not().isEmpty(),
  body("author", "Author cannot be empty").not().isEmpty(),
  updatePost
);

// DELETE TASK
router.delete("/:postId", deletePost);

module.exports = router;
