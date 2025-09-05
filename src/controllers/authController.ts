import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import { SALT } from "../constants";
import { generateToken } from "../utils";
import { Types } from "mongoose";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, fullName, password, phoneNumber } =
      req.body as IUser;

    if (!email || !username || !fullName || !password) {
      return res.status(400).json({
        message: "Email, Username, Full Name and Password are required",
      });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT);
    const user: IUser = await User.create({
      email,
      username,
      fullName,
      password: hashedPassword,
      phoneNumber,
      role: "USER",
    });

    const token = generateToken(
      (user._id as Types.ObjectId).toString(),
      user.role
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error registering user", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
