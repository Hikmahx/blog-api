import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Post, { IPost } from "../models/Post";

interface AuthRequest extends Request {
  post?: IPost;
}

// CREATE POST
export const createPost = async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, hashtags, img, author } = req.body;

    const newPost = new Post({
      title,
      content,
      hashtags,
      img,
      author,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET ALL POSTS
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET POST BY ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE POST
export const updatePost = async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const { title, content, hashtags, img, author } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { title, content, hashtags, img, author },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE POST
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Post.findByIdAndDelete(req.params.postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
