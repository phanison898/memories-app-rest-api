import PostsModel from "../models/postsModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostsModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostsModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const data = req.body;
  const post = new PostsModel(data);
  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const post = req.body;
  try {
    const updatedPost = await PostsModel.findByIdAndUpdate(id, post, { new: true });
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await PostsModel.findByIdAndRemove(id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
