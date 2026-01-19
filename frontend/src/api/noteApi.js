import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./axios";

// GET notes
export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await API.get("/notes");
      return res.data;
    },
  });
};

// CREATE note
export const useCreateNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => API.post("/notes", data),
    onSuccess: () => qc.invalidateQueries(["notes"]),
  });
};

// UPDATE note
export const useUpdateNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => API.put(`/notes/${id}`, data),
    onSuccess: () => qc.invalidateQueries(["notes"]),
  });
};

// DELETE note
export const useDeleteNote = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => API.delete(`/notes/${id}`),
    onSuccess: () => qc.invalidateQueries(["notes"]),
  });
};
