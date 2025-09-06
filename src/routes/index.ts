import express from "express";
import categoryRoutes from "./categoryRoutes";
import blogRoutes from "./blogRoutes";
import authRoutes from "./authRoutes";
import commnetRoutes from "./commentRoutes";

const router = express.Router();

router.use("/categories", categoryRoutes);
router.use("/blogs", blogRoutes);
router.use("/auth", authRoutes);
router.use("/comments", commnetRoutes);

export default router;
