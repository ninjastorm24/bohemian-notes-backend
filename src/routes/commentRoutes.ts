import { Router } from "express";
import {
  createComment,
  getCommentsByBlog,
  deleteComment,
} from "../controllers/commentController";
import { authorize, protect } from "../middlewares/auth";
import { canDeleteComment } from "../middlewares/comment";

const router = Router();

router.post("/", protect, authorize("USER", "ADMIN"), createComment);
router.get("/:blogId", getCommentsByBlog);
router.delete("/:id", protect, canDeleteComment, deleteComment);

export default router;
