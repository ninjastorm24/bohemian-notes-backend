import mongoose from "mongoose";
import { connectDB } from "./config/db";
import User from "./models/User";

const testUser = async () => {
  try {
    await connectDB();
    console.log("DB connect to test USER schema");
    // create new user
    const user = await User.create({
      email: "test@email.com",
      username: "testuser",
      fullName: "Test User",
      password: "password123",
    });
    console.log(`User created: `, user);
    // find all users
    const users = await User.find();
    console.log("All users: ", users);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
};

testUser();
