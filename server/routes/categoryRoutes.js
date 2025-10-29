const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Category Schema
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Category = mongoose.model("Category", CategorySchema);

// ✅ GET /api/categories – all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST /api/categories – add category
router.post("/", async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
