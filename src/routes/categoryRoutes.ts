import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { protect, requireAdmin } from "../middlewares/auth";

const router = Router();

// POST /api/categories
router.post("/", protect, requireAdmin, createCategory);

// GET /api/categories
router.get("/", getCategories);

// PUT /api/categories/:id
router.put("/:id", protect, requireAdmin, updateCategory);

// DELETE /api/categories/:id
router.delete("/:id", protect, requireAdmin, deleteCategory);

export default router;
