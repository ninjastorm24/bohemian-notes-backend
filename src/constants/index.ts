export const DB_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/bohemian-notes";
export const PORT = process.env.PORT || 5000;
export const SALT = process.env.SALT || 10;
export const JWT_SECRET = process.env.JWT_SECRET || "secretjsonwebtoken";
