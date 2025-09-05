import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";

const router = Router();

// POST /api/categories
router.post("/", createCategory);

// GET /api/categories
router.get("/", getCategories);

// PUT /api/categories/:id
router.put("/:id", updateCategory);

// DELETE /api/categories/:id
router.delete("/:id", deleteCategory);

export default router;
