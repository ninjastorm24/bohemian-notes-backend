import mongoose from "mongoose";
import { connectDB } from "./config/db";
import Category from "./models/Category";

const testCategory = async () => {
  try {
    // connect mongodb
    await connectDB();
    console.log("Connected to db");
    // create category
    const category = await Category.create({
      name: "Software development",
      slug: "software-development",
    });
    console.log("Category created: ", category);
    // find all categories
    const categories = await Category.find();
    console.log("All Categories: ", categories);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

testCategory();
