import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
  userID: String,
  title: String,
  description: String,
  tags: String,
  selectedFile: String,
  date: {
    type: Date,
    default: new Date(),
  },
});

const PostsModel = mongoose.model("Posts", postsSchema);
export default PostsModel;
