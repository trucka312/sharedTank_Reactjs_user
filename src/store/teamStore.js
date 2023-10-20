import { create } from "zustand";
import { RepositoryRemote } from "../services";

export const useTeamStore = create((set) => ({
  topGroupRevenue: [],
  loading: false,
  getTopGroupRevenue: async () => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.team.getTopGroupRevenue();
      set({ topGroupRevenue: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
    set({ loading: false });
  },
}));
