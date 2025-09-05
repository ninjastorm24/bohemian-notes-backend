import express from "express";
import categoryRoutes from "./categoryRoutes";
import blogRoutes from "./blogRoutes";
import authRoutes from "./authRoutes";

const router = express.Router();

router.use("/categories", categoryRoutes);
router.use("/blogs", blogRoutes);
router.use("/auth", authRoutes);

export default router;
