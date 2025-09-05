import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";
export const generateToken = (userID: string, role: "ADMIN" | "USER") => {
  return jwt.sign({ sub: userID, role }, JWT_SECRET, { expiresIn: "1h" });
};
