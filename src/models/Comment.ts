import { Document, Schema, model } from "mongoose";

export interface IComment extends Document {
  content: string;
  blog: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  parentComment?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

export default model<IComment>("Comment", CommentSchema);
