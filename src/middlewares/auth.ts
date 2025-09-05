import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";
import User from "../models/User";

interface RequestWithUser extends Request {
  user?: any;
}

export const protect = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized, No token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      sub: string;
      role: string;
    };

    const user = await User.findById(decoded.sub).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user; // add user to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
