const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// ====== Multer Setup for Image Uploads ======
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder for images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ====== Mongoose Schemas ======
const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    featuredImage: { type: String },
    comments: [CommentSchema],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "posts" }
);

const Post = mongoose.model("Post", PostSchema);

// ====== Routes ======

// GET /api/posts — Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts); // returns flat array for frontend compatibility
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/posts/:id — Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/posts — Create a new post (with image upload)
router.post("/", upload.single("featuredImage"), async (req, res) => {
  const { title, content, category } = req.body;
  const featuredImage = req.file ? req.file.path : null;

  const newPost = new Post({ title, content, category, featuredImage });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/posts/:id — Update post
router.put("/:id", upload.single("featuredImage"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.featuredImage = req.file.path;

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedPost) return res.status(404).json({ message: "Post not found" });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/posts/:id — Delete post
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/posts/:id/comments — Add comment
router.post("/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const { text, author } = req.body;
    post.comments.push({ text, author });
    await post.save();

    res.status(201).json(post.comments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/posts/:id/comments — Get all comments for a post
router.get("/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
