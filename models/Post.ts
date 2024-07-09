import { Schema, model, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  img?: string;
  author: {
    name: string;
    avatar: string;
  };
  hashtags: string[];
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    img: {type: String},
    content: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    hashtags: { type: [String], required: true },
  },
  { timestamps: true }
);

const Post = model<IPost>("Post", postSchema);

export default Post;
