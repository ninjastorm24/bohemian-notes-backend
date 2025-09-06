import { Request, Response } from "express";
import Comment, { IComment } from "../models/Comment";

interface RequestWithUser extends Request {
  user?: any;
  comment?: any;
}

export const createComment = async (req: RequestWithUser, res: Response) => {
  try {
    const { content, blog: blogId, parentComment } = req.body as IComment;
    if (!content || !blogId) {
      return res.status(400).json({ message: "Content and Blog are required" });
    }
    const comment: IComment = await Comment.create({
      content,
      blog: blogId,
      user: req.user._id, // comes from middleware
      parentComment: parentComment || null,
    });
    return res
      .status(201)
      .json({ message: "Comment created successfully", comment });
  } catch (error) {
    console.error("Error creating comment", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCommentsByBlog = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({
      blog: blogId,
      parentComment: null,
    })
      .populate("user", "username fullName -_id")
      .populate({
        path: "parentComment",
        populate: { path: "user", select: "username fullName -_id" },
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({ comments });
  } catch (error) {
    console.error("Error getting comments", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req: RequestWithUser, res: Response) => {
  try {
    console.log(req.comment, "comment");
    await req.comment.deleteOne();
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment", error);
    return res.status(500).json({ message: "Server error" });
  }
};
