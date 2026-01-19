import { useEffect, useState } from "react";
import { useCreateNote, useUpdateNote } from "../api/noteApi";

export default function NoteForm({ editingNote, clearEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createNote = useCreateNote();
  const updateNote = useUpdateNote();

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  // 🔥 STEP 4 STARTS HERE
  const submit = async (e) => {
    e.preventDefault();

    try {
      if (editingNote) {
        await updateNote.mutateAsync({
          id: editingNote._id,
          data: { title, content },
        });
        clearEdit();
      } else {
        await createNote.mutateAsync({ title, content });
      }

      setTitle("");
      setContent("");
    } catch (err) {
      // 👇 THIS IS THE MAIN STEP 4 LOGIC
      alert(
        err?.response?.data?.message ||
          "Something went wrong while saving note",
      );
    }
  };
  // 🔥 STEP 4 ENDS HERE

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-7">
      <input
        className="input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="input"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button className="btn text-blue-50 bg-blue-900">
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
