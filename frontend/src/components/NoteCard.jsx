import { useSelector } from "react-redux";
import API from "../api/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function NoteCard({ note, onEdit }) {
  const user = useSelector((s) => s.user.user);
  const qc = useQueryClient();

  const [showReminder, setShowReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState("");

  // PIN / UNPIN
  const togglePin = async () => {
    if (note.isPinned) {
      await API.put(`/notes/unpin/${note._id}`);
    } else {
      await API.put(`/notes/pin/${note._id}`);
    }
    qc.invalidateQueries(["notes"]);
  };

  // 🔔 SET REMINDER (PREMIUM ONLY)
  const setReminder = async () => {
    if (!reminderTime) {
      alert("Please select date & time");
      return;
    }

    try {
      await API.put(`/notes/reminder/${note._id}`, {
        reminderAt: reminderTime,
      });

      alert("Reminder scheduled 🔔");
      setShowReminder(false);
      setReminderTime("");
      qc.invalidateQueries(["notes"]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to set reminder");
    }
  };

  return (
    <div
      className={`p-4 rounded shadow relative ${
        note.isPinned ? "border-2 border-yellow-400 bg-yellow-50" : "bg-white"
      }`}
    >
      {/* 📌 PIN BADGE */}
      {note.isPinned && (
        <span className="absolute top-2 right-2 text-yellow-600 font-bold">
          📌 PINNED
        </span>
      )}

      <h3 className="font-bold text-lg">{note.title}</h3>
      <p className="text-gray-600 mt-1">{note.content}</p>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2 mt-3 flex-wrap">
        <button
          onClick={() => onEdit(note)}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Edit
        </button>

        {/* PIN / UNPIN (PREMIUM) */}
        {user.role === "premium" && (
          <button
            onClick={togglePin}
            className={`px-3 py-1 rounded text-white ${
              note.isPinned ? "bg-gray-500" : "bg-yellow-500"
            }`}
          >
            {note.isPinned ? "Unpin" : "📌 Pin"}
          </button>
        )}

        {/* 🔔 REMINDER BUTTON (ONLY WHEN PINNED + PREMIUM) */}
        {user.role === "premium" && note.isPinned && (
          <button
            onClick={() => setShowReminder(!showReminder)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded"
          >
            🔔 Reminder
          </button>
        )}
      </div>

      {/* REMINDER TIME PICKER */}
      {showReminder && user.role === "premium" && (
        <div className="mt-3 bg-white border border-gray-200 rounded p-3">
          <label className="block text-sm text-gray-600 mb-1">
            Reminder time
          </label>

          <input
            type="datetime-local"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="input"
          />

          <button
            onClick={setReminder}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
          >
            Save Reminder
          </button>
        </div>
      )}

      {/* FREE USER INFO */}
      {user.role === "free" && (
        <p className="text-xs text-gray-400 mt-2">
          🔒 Pin & reminders are available for premium users
        </p>
      )}
    </div>
  );
}
