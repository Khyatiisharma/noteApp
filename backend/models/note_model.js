// import mongoose from "mongoose";

// const noteSchema = new mongoose.Schema(
//   {
//     userId: mongoose.Schema.Types.ObjectId,
//     title: String,
//     content: String,
//     tags: [String],
//     isPinned: { type: Boolean, default: false },
//   },

//   reminderAt: {
//   type: Date,
//   default: null,
// },

//   { timestamps: true },
// );

// export default mongoose.model("Note", noteSchema);
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    content: String,
    isPinned: {
      type: Boolean,
      default: false,
    },

    // 🔔 REMINDER TIME (OPTIONAL)
    reminderAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Note", noteSchema);
