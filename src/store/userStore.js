import { create } from "zustand";
import { RepositoryRemote } from "../services";
import { toastFailure, toastSuccess } from "../utils";

export const useUserStore = create((set) => ({
  profile: {},
  loading: true,
  userBank: {},
  listProvinces: [],
  listDistricts: [],
  listWards: [],
  badges: {},
  listShippingAddress: [],
  loadingCreate: false,
  loadingDelAdd: false,
  loadingUpdateAdd: false,
  getProfile: async () => {
    set({ loading: true });
    try {
      const response = await RepositoryRemote.user.getProfile();
      set({ profile: response.data.data});
      localStorage.setItem("profile", JSON.stringify(response.data.data));
    } catch (error) {
      console.log("error", error);
    }
    set({ loading: false });
  },
  updateProfile: async (data, onSuccess) => {
    try {
      const response = await RepositoryRemote.user.updateProfile(data);
      if (response.data.code === 200 || response.data.code === 201) {
        onSuccess();
        toastSuccess("Cập nhật tài khoản thành công");
      } else {
        toastFailure("Cập nhật tài khoản thất bại");
      }
    } catch (error) {
      toastFailure("Cập nhật tài khoản thất bại");
      console.log("error", error);
    }
  },
  getUserBank: async () => {
    try {
      const response = await RepositoryRemote.user.getUserBank();
      if (response.data.code === 200 || response.data.code === 201) {
        set({ userBank: response.data.data });
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  updateUserBank: async (data, onSuccess) => {
    try {
      const response = await RepositoryRemote.user.updateUserBank(data);
      if (response.data.code === 200 || response.data.code === 201) {
        onSuccess();
        toastSuccess("Cập nhật thông tin ngân hàng thành công");
      } else {
        toastFailure("Cập nhật thông tin ngân hàng thất bại");
      }
    } catch (error) {
      toastFailure("Cập nhật thông tin ngân hàng thất bại");
      console.log("error", error);
    }
  },
  changePassword: async (data) => {
    try {
      const response = await RepositoryRemote.user.changePassword(data);
      if (response.data.code === 200 || response.data.code === 201) {
        toastSuccess("Đổi mật khẩu thành công");
      } else {
        toastFailure("Đổi mật khẩu thất bại");
      }
    } catch (error) {
      console.log("error", error);
      toastFailure("Đổi mật khẩu thất bại");
    }
  },
  createAddress: async (data, onSuccess, onFail) => {
    try {
      const response = await RepositoryRemote.user.createAddress(data);
      set({ loadingCreate: true });
      if (response.data.code === 200 || response.data.code === 201) {
        toastSuccess("Thêm địa chỉ thành công");
        set({ loadingCreate: false });
        onSuccess();
      } else {
        toastFailure("Thêm địa chỉ thất bại");
        onFail();
      }
    } catch (error) {
      console.log("error", error);
      toastFailure("Thêm địa chỉ thất bại");
    }
  },
  getProvinces: async () => {
    try {
      const response = await RepositoryRemote.user.getProvinces();
      set({ listProvinces: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
  },
  getDistricts: async (idProvince) => {
    try {
      const response = await RepositoryRemote.user.getDistricts(idProvince);
      set({ listDistricts: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
  },
  getWards: async (idDistrict) => {
    try {
      const response = await RepositoryRemote.user.getWards(idDistrict);
      set({ listWards: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
  },
  getBadges: async () => {
    try {
      const response = await RepositoryRemote.user.getBadges();
      set({ badges: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
  },
  getAllShippingAddress: async (onSuccess, onFail) => {
    try {
      set({ loadingShippingAddress: true });
      const response = await RepositoryRemote.user.getAllShippingAddress();
      set({
        listShippingAddress: response.data.data,
        loadingShippingAddress: false,
      });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
  },
  deleteShippingAdd: async (id, onSuccess, onFail) => {
    try {
      set({ loadingDelAdd: true });
      const response = await RepositoryRemote.user.delShipAdd(id);
      set({ loadingDelAdd: false });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
  },
  updateShipAdd: async (id, data, onSuccess, onFail) => {
    try {
      set({ loadingUpdateAdd: true });
      const response = await RepositoryRemote.user.updateShipAdd(id, data);
      set({ loadingUpdateAdd: false });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
  },
  reset: () => {
    set({ listShippingAddress: [] });
  },
}));
