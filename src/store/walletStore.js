import { create } from "zustand";
import { RepositoryRemote } from "../services";

export const useWalletStore = create((set) => ({
  loadingReCharge: false,
  loadingBuyPackage: false,
  infoRequestBuyPackage: {},
  customerWallet: {},
  orderHistory: {},
  walletHistory: {},
  requestWalletHistory: {},
  loading: false,
  requestReCharge: async (data, onSuccess, onFail) => {
    try {
      set({ loadingReCharge: true });
      const response = await RepositoryRemote.wallet.requestReCharge(data);
      onSuccess(response.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loadingReCharge: false });
  },

  requestBuyPackage: async (data, onSuccess, onFail) => {
    try {
      set({ loadingBuyPackage: true });
      const response = await RepositoryRemote.wallet.requestBuyPackage(data);
      set({ infoRequestBuyPackage: response.data.data });
      onSuccess(response.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loadingBuyPackage: false });
  },
  getCustomerWallet: async () => {
    try {
      const response = await RepositoryRemote.wallet.getCustomerWallet();
      set({ customerWallet: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
  },
  getOrderHistory: async (page, is_have_cus_referral = false) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.wallet.getOrderHistory(
        page,
        is_have_cus_referral
      );
      set({ orderHistory: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
    set({ loading: false });
  },
  getWalletHistory: async (query) => {
    try {
      set({ loading: true });
      set({ walletHistory: [] });
      const response = await RepositoryRemote.wallet.getWalletHistory(query);
      set({ walletHistory: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
    set({ loading: false });
  },

  getRequestWalletHistory: async (page, isWithDraw) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.wallet.getRequestWalletHistory(
        page,
        isWithDraw
      );
      set({ requestWalletHistory: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
    set({ loading: false });
  },
}));
