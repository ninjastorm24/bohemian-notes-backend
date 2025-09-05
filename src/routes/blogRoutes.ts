import { Router } from "express";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
} from "../controllers/blogController";

const router = Router();

// create blog - POST /api/blogs
router.post("/", createBlog);
// get all blogs GET /api/blogs
router.get("/", getBlogs);
// update blog
router.put("/:id", updateBlog);
// delete blog
router.delete("/:id", deleteBlog);
// get single blog
router.get("/:id", getBlogById);

export default router;
