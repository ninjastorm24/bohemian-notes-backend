import express from "express";
import categoryRoutes from "./categoryRoutes";
import blogRoutes from "./blogRoutes";

const router = express.Router();

router.use("/categories", categoryRoutes);
router.use("/blogs", blogRoutes);

export default router;
