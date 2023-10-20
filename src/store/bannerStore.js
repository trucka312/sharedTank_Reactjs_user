import { create } from "zustand";
import { RepositoryRemote } from "../services";

export const useBannerStore = create((set) => ({
  banners: [],
  getBanners: async () => {
    try {
      const response = await RepositoryRemote.banners.getBanners();
      set({ banners: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
  },
}));
