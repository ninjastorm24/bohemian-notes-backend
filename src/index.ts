import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import { PORT } from "./constants";
import routes from "./routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// mount all routes

app.use("/api", routes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

startServer();
