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

/**
 * Get all categories
 * GET /api/categories
 * @param req
 * @param res
 * @returns
 */

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories: ICategory[] = await Category.find().sort({
      createdAt: -1,
    }); //newest first
    return res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update a category
 * PUT /api/categories/:id
 * @param req
 * @param res
 */

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // find by id from db and update
    const category: ICategory | null = await Category.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );

    // if no category - return
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete a category
 * DELETE /api/categories/:id
 * @param req
 * @param res
 */

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.deleteOne();
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category", error);
    return res.status(500).json({ message: "Server error" });
  }
};
