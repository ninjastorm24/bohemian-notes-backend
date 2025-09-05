import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import { SALT } from "../constants";
import { generateToken } from "../utils";
import { Types } from "mongoose";

interface RequestWithUser extends Request {
  user?: any;
}

/**
 * POST /api/auth/register
 * @param req
 * @param res
 * @returns
 */
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

/**
 * POST /api/auth/login
 * @param req
 * @param res
 * @returns
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({
        message: "Email or Username and Password are required",
      });
    }
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.isBlocked) {
      return res.status(403).json({ message: "Your account has been blocked" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(
      (user._id as Types.ObjectId).toString(),
      user.role
    );

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      },
      token,
    });
  } catch (error) {
    console.error("Error logging in user", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * GET /api/auth/me
 */
export const getMe = async (req: RequestWithUser, res: Response) => {
  try {
    const user = req.user; // comes from middleware
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting credentials", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
