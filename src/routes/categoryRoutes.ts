import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController";

const router = Router();

// POST /api/categories
router.post("/", createCategory);

// GET /api/categories
router.get("/", getCategories);

// PUT /api/categories/:id
router.put("/:id", updateCategory);

// DELETE /api/categories/:id

export default router;
