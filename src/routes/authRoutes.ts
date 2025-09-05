import { Router } from "express";
import { register } from "../controllers/authController";

const router = Router();

// register POST /api/auth/register
router.post("/register", register);
// login    POST /api/auth/login
// me       GET /api/auth/me

export default router;
