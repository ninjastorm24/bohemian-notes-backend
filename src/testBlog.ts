import mongoose from "mongoose";
import { connectDB } from "./config/db";
import Blog from "./models/Blog";
import "./models/Category";

const testBlog = async () => {
  try {
    await connectDB();
    console.log("Connected to db");
    const blog = await Blog.create({
      title: "Test Blog 4",
      slug: "test-blog-4",
      content: "This is a test blog",
      category: "68b9dbab55fd0fc8360d338a",
    });
    console.log("Blog created: ", blog);
    const blogs = await Blog.find().populate("category", "name slug -_id");
    console.log("All Blogs: ", blogs);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
};

testBlog();
