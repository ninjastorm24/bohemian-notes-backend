import { Router } from "express";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
} from "../controllers/blogController";
import { authorize, protect } from "../middlewares/auth";

const router = Router();

// create blog - POST /api/blogs - private
router.post("/", protect, authorize("ADMIN"), createBlog);
// get all blogs GET /api/blogs - public
router.get("/", getBlogs);
// update blog - PUT /api/blogs/:id - private
router.put("/:id", protect, authorize("ADMIN"), updateBlog);
// delete blog
router.delete("/:id", protect, authorize("ADMIN"), deleteBlog);
// get single blog
router.get("/:id", getBlogById);

export default router;
