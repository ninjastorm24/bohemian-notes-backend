import { Router } from "express";
import { login, register, getMe } from "../controllers/authController";
import { protect } from "../middlewares/auth";

const router = Router();

// register POST /api/auth/register
router.post("/register", register);
// login    POST /api/auth/login
router.post("/login", login);
// me       GET /api/auth/me
router.get("/me", protect, getMe);

export default router;
