import { NextFunction, Request, Response } from "express";
import Comment from "../models/Comment";

interface RequestWithUser extends Request {
  user?: any;
  comment?: any;
}

export const canDeleteComment = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // allow if admin or comment owner
    if (
      req.user.role !== "ADMIN" &&
      comment.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Forbidden. Insufficient role" });
    }
    req.comment = comment;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
