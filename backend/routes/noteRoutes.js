import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  pinNote,
  unpinNote,
  setReminder,
} from "../controllers/note_controller.js";

import { auth } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.get("/", auth, getNotes);
router.post("/", auth, createNote);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

// ✅ premium feature
router.put("/pin/:id", auth, pinNote);
router.put("/unpin/:id", auth, unpinNote);

router.put("/reminder/:id", auth, setReminder);

export default router;
