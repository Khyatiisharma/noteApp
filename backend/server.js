import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/mongo.js";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import "./cron/reminderCron.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);

app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
