import { create } from "zustand";
import { RepositoryRemote } from "../services";
import { removeToken, setToken } from "../utils/auth";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
  tokenInfo: {},
  loading: false,
  login: async (form, onSuccess, onFail) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.auth.login(form);
      const cowc_id = localStorage.getItem("cowc_id");
      if (response.data.data.customer_id === parseInt(cowc_id)) {
        localStorage.removeItem("cowc_id");
      }
      set({ tokenInfo: response.data.data });
      setToken(response.data.data.token);
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
  register: async (form, onSuccess) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.auth.register(form);
      console.log(response);
      if (response.data.code === 200 || response.data.code === 201) {
        onSuccess();
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg || "Có lỗi xảy ra");
    }
    set({ loading: false });
  },
  logout: () => {
    removeToken();
    localStorage.removeItem("profile");
  },
  forgotPassword: async (form, onSuccess) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.auth.forgotPassword(form);
      console.log(response);
      if (response.data.code === 200) {
        onSuccess();
        toast.success("Thay đổi mật khẩu thành công");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Có lỗi xảy ra");
    }
    set({ loading: false });

  },
  sendOtp: async (form, onSuccess) => {
    try {
      const response = await RepositoryRemote.auth.sendOtp(form);
      if (response.data.code === 200) {
        onSuccess();
        toast.success("Đã gửi");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Có lỗi xảy ra");
    }
  },
}));
