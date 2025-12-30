import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// Get all blogs
// router.get("/", async (req, res) => {
//   try {
//     const blogs = await Blog.find();
//     res.json(blogs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.get("/", async (req, res) => {
  console.log(" Blog request received at /api/blogs");
  try {
    // Check if Blog model is initialized correctly
    if (!Blog) {
        return res.status(500).json({ error: "Blog model not initialized" });
    }
    
    const blogs = await Blog.find();
    console.log(`✅ Found ${blogs.length} blogs`);
    res.json(blogs);
  } catch (err) {
    console.error("❌ Error fetching blogs:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new blog
router.post("/", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

