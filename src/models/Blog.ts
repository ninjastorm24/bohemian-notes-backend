import { Document, Schema, model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  author?: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema<IBlog> = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      //   required: true, // change this later
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IBlog>("Blog", BlogSchema);
