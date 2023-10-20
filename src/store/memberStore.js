import { create } from "zustand";
import { RepositoryRemote } from "../services";

export const useMemberStore = create((set) => ({
  rewardPolicies: {},
  loadingRewardPolicies: false,
  loadingBonusSharing: false,
  loadingShareHolder: false,
  bonusSharing: {},
  shareHolderInvestment: {},
  getRewardPolicies: async (onSuccess, onFail) => {
    try {
      set({ loadingRewardPolicies: true });
      const response = await RepositoryRemote.member.rewardPolicies();
      set({ rewardPolicies: response.data.data });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loadingRewardPolicies: false });
  },

  getTierRevenues: async (onSuccess, onFail) => {
    try {
      set({ loadingBonusSharing: true });
      const response = await RepositoryRemote.member.tierRevenues();
      set({ bonusSharing: response.data.data });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loadingBonusSharing: false });
  },

  getShareholderInvestments: async (onSuccess, onFail) => {
    try {
      set({ loadingShareHolder: true });
      const response = await RepositoryRemote.member.shareholderInvestments();
      set({ shareHolderInvestment: response.data.data });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loadingShareHolder: false });
  },
}));
