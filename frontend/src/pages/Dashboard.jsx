import { useState } from "react";
import { useNotes } from "../api/noteApi";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NotificationPanel from "../components/NotificationPanel";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { data: notes, isLoading } = useNotes();
  const user = useSelector((s) => s.user.user);
  const [editingNote, setEditingNote] = useState(null);

  if (isLoading) return <p className="p-6">Loading notes...</p>;

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto ">{/* existing notes UI */}</div>

      <div className="p-6 max-w-4xl mx-auto bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">{user.name}'s Notes</h1>

        {user.role === "free" && (
          <Link to="/subscribe" className="text-blue-400 underline">
            Upgrade to Premium
          </Link>
        )}

        <NoteForm
          editingNote={editingNote}
          clearEdit={() => setEditingNote(null)}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {notes?.map((note) => (
            <NoteCard key={note._id} note={note} onEdit={setEditingNote} />
          ))}
        </div>

        {user.role === "premium" && <NotificationPanel />}
      </div>
    </>
  );
}
