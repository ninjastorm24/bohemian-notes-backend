import { Request, Response } from "express";
import Blog, { IBlog } from "../models/Blog";

import "../models/Category";

/**
 * POST /api/blogs
 * @param _req
 * @param res
 * @returns
 */
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, slug, content, author, category } = req.body as IBlog;
    // basic validation
    if (!title || !slug || !content || !category) {
      return res
        .status(400)
        .json({ message: "Title, Slug, Content and Category are required" });
    }
    const blog: IBlog = new Blog({
      title,
      slug,
      content,
      author,
      category,
    });
    await blog.save();
    return res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error("Error creating blog", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/blogs
 * @param _req
 * @param res
 * @returns
 */
export const getBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await Blog.find()
      .populate("category", "name slug -_id")
      .sort({ createdAt: -1 });
    return res.status(200).json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/blogs/:id
 * @param _req
 * @param res
 * @returns
 */
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog: IBlog | null = await Blog.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Error updating blog", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/blogs/:id
 * @param _req
 * @param res
 * @returns
 */
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog is not found." });
    }
    await blog.deleteOne();
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog", error);
    return res.status(400).json({ message: "Server error" });
  }
};

/**
 * GET /api/blogs/:id
 * @param _req
 * @param res
 * @returns
 */
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ blog });
  } catch (error) {
    console.error("Error finding blog", error);
    return res.status(500).json({ message: "Server error" });
  }
};
