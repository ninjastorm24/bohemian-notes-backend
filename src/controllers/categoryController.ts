import { Request, Response } from "express";
import Category, { ICategory } from "../models/Category";

/**
 * Create a new category
 * POST /api/categories
 * @access Private
 * @param req
 * @param res
 * @returns
 */

export const createCategory = async (req: Request, res: Response) => {
  try {
    // destructure body
    const { name, slug, description } = req.body as ICategory;
    // basic validation
    if (!name || !slug) {
      return res.status(400).json({ message: "Name and Slug are required" });
    }
    // find by slug from db
    const existingCategory = await Category.findOne({ slug });
    // if category - return
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category with this slug already exists" });
    }
    // if no category - create category
    const category: ICategory = new Category({
      name,
      slug,
      description,
    });
    await category.save();
    return res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    console.error("Error creating caregory", error);
    return res.status(500).json({ message: "Server error" });
  }
};
