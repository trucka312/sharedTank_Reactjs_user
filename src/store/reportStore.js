import { create } from "zustand";
import { RepositoryRemote } from "../services";
import { toast } from "react-toastify";

export const useReportStore = create((set) => ({
  reportGeneral: {},
  loading: false,
  getReportGeneral: async (query) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.report.getReportGeneral(query);
      if (response.data.code === 200 || response.data.code === 201) {
        set({reportGeneral:response.data})
      }else{
        toast.error("Có lỗi xảy ra")
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      console.log("error", error);
    }
    set({ loading: false });
  },
}));
