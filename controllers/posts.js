import PostsModel from "../models/postsModel.js";
import { PostValidation } from "../validations/users.js";

export const getPostCount = async (req, res) => {
  const userID = req.user;
  try {
    const count = await PostsModel.countDocuments({ userID: userID }, (err, count) => count);
    res.status(200).json(count);
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

// Returns all posts belongs to logged in user
export const getPosts = async (req, res) => {
  const userID = req.user;
  try {
    const posts = await PostsModel.find({ userID: userID }).sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

export const getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostsModel.findOne({ _id: id, userID: req.user });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

export const createPost = async (req, res) => {
  const userID = req.user;
  const data = req.body;
  try {
    const { error } = PostValidation(data);
    if (error) return res.status(400).json({ status: false, message: error.details[0].message, post: {} });

    const titleExist = await PostsModel.findOne({ title: data.title, userID: userID });
    if (titleExist) return res.status(401).json({ status: false, message: "Title already exists", post: {} });

    const post = new PostsModel({ ...data, userID: userID });

    const savedPost = await post.save();
    res.status(201).json({ status: true, message: "Successfully created", post: savedPost });
  } catch (error) {
    res.status(409).json({ status: false, message: error.message, post: {} });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const post = req.body;
  try {
    const { error } = PostValidation(post);
    if (error) return res.status(400).json({ status: false, message: error.details[0].message, post: {} });

    const titleExist = await PostsModel.findOne({ title: post.title, userID: req.user, _id: { $ne: id } });
    if (titleExist) return res.status(401).json({ status: false, message: "Title already exists", post: {} });

    const updatedPost = await PostsModel.findOneAndUpdate({ _id: id, userID: req.user }, { ...post, userID: req.user }, { new: true });
    res.status(201).json({ status: true, message: "Successfully updated", post: updatedPost });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message, post: {} });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await PostsModel.findOneAndRemove({ _id: id, userID: req.user });
    res.json({ status: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};
