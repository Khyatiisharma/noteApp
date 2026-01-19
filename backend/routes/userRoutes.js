// import express from "express";
// import { signup, login } from "../controllers/userController.js";

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);

// export default router;

import express from "express";
import {
  signup,
  login,
  buySubscription,
} from "../controllers/userController.js";
import { auth } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// 🔥 THIS IS REQUIRED
router.post("/subscribe", auth, buySubscription);

export default router;
