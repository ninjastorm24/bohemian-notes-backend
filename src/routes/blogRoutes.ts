import { Router } from "express";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
} from "../controllers/blogController";
import { protect, requireAdmin } from "../middlewares/auth";

const router = Router();

// create blog - POST /api/blogs - private
router.post("/", protect, requireAdmin, createBlog);
// get all blogs GET /api/blogs - public
router.get("/", getBlogs);
// update blog - PUT /api/blogs/:id - private
router.put("/:id", protect, requireAdmin, updateBlog);
// delete blog
router.delete("/:id", protect, requireAdmin, deleteBlog);
// get single blog
router.get("/:id", getBlogById);

export default router;
