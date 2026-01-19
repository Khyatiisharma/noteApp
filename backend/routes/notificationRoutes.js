import express from "express";
import { getNotifications } from "../controllers/notification_controller.js";
import { auth } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.get("/", auth, getNotifications);

export default router;
