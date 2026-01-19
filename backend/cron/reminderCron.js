import cron from "node-cron";
import Note from "../models/note_model.js";
import Notification from "../models/notification_model.js.js";

import { sendMail } from "../utils/mailer.js";
import User from "../models/user_model.js";

cron.schedule("* * * * *", async () => {
  console.log("⏰ CRON RUNNING");

  const now = new Date();

  const notes = await Note.find({
    reminderAt: { $lte: now },
  });

  console.log("REMINDER NOTES FOUND:", notes.length);

  for (let note of notes) {
    console.log("CREATING NOTIFICATION FOR:", note.title);

    await Notification.create({
      userId: note.userId,
      message: `⏰ Reminder: ${note.title}`,
    });

    // fire only once
    note.reminderAt = null;
    await note.save();

    const user = await User.findById(note.userId);

    await sendMail(
      user.email,
      "⏰ Reminder from Smart Notes",
      `Reminder for your note: ${note.title}`,
    );
  }
});
