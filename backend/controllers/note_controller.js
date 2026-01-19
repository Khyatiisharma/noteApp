import Note from "../models/note_model.js";
import { getCache, setCache, deleteCache } from "../utils/cache.js";

// GET NOTES
export const getNotes = async (req, res) => {
  const key = `notes:${req.user.id}`;
  const cached = await getCache(key);

  if (cached) return res.json(cached);

  const notes = await Note.find({ userId: req.user.id }).sort({
    isPinned: -1,
    createdAt: -1,
  });

  setCache(key, notes);
  res.json(notes);
};

// CREATE NOTE (FREE vs PREMIUM)
export const createNote = async (req, res) => {
  if (req.user.role === "free") {
    const count = await Note.countDocuments({ userId: req.user.id });

    if (count >= 10) {
      return res.status(403).json({
        message: "Free limit reached. Upgrade to premium for unlimited notes.",
      });
    }
  }

  const note = await Note.create({
    ...req.body,
    userId: req.user.id,
  });

  deleteCache(`notes:${req.user.id}`);
  res.json(note);
};

// UPDATE NOTE
export const updateNote = async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, req.body);
  deleteCache(`notes:${req.user.id}`);
  res.json({ message: "Updated" });
};

// DELETE NOTE
export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  deleteCache(`notes:${req.user.id}`);
  res.json({ message: "Deleted" });
};

// PIN NOTE (PREMIUM ONLY)
export const pinNote = async (req, res) => {
  if (req.user.role !== "premium") {
    return res.status(403).json({
      message: "Pin feature available for premium users only",
    });
  }

  await Note.findByIdAndUpdate(req.params.id, {
    isPinned: true,
  });

  deleteCache(`notes:${req.user.id}`);
  res.json({ message: "Note pinned successfully" });
};
export const unpinNote = async (req, res) => {
  if (req.user.role !== "premium") {
    return res.status(403).json({
      message: "Unpin feature available for premium users only",
    });
  }

  await Note.findByIdAndUpdate(req.params.id, {
    isPinned: false,
  });

  deleteCache(`notes:${req.user.id}`);

  res.json({ message: "Note unpinned successfully" });
};

export const setReminder = async (req, res) => {
  if (req.user.role !== "premium") {
    return res.status(403).json({
      message: "Reminder feature is for premium users only",
    });
  }

  const { reminderAt } = req.body;

  if (!reminderAt) {
    return res.status(400).json({ message: "Reminder time required" });
  }

  await Note.findByIdAndUpdate(req.params.id, {
    reminderAt: new Date(reminderAt),
  });

  deleteCache(`notes:${req.user.id}`);

  res.json({ message: "Reminder set successfully" });
};
