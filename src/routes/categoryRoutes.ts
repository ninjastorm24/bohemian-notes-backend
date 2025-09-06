import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { authorize, protect } from "../middlewares/auth";

const router = Router();

// POST /api/categories
router.post("/", protect, authorize("ADMIN"), createCategory);

// GET /api/categories
router.get("/", getCategories);

// PUT /api/categories/:id
router.put("/:id", protect, authorize("ADMIN"), updateCategory);

// DELETE /api/categories/:id
router.delete("/:id", protect, authorize("ADMIN"), deleteCategory);

export default router;
