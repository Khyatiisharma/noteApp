import { useQuery } from "@tanstack/react-query";
import API from "./axios";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await API.get("/notifications");
      return res.data;
    },
  });
};
