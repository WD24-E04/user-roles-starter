import mongoose, { model } from "mongoose";

const { model, Schema } = mongoose;

const postSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  content: String,
});

const Post = model("Posts", postSchema);
export default Post;
