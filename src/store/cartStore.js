import { create } from "zustand";
import { RepositoryRemote } from "../services";
import { toastFailure, toastSuccess } from "../utils";

export const useCartStore = create((set) => ({
  cartInfo: {},
  cartDataStatus:false,
  getCartInfo: async () => {
    try {
      set({ cartDataStatus:true });
      const response = await RepositoryRemote.cart.getCartInfo();
      set({ cartInfo: response.data.data, cartDataStatus:false });
    } catch (error) {
      console.log("error", error);
    }
  },
  updateCart: async (data, onSuccess) => {
    try {
      const response = await RepositoryRemote.cart.updateCart(data);
      set({cartInfo:response.data.data})
      onSuccess();
    } catch (error) {
      console.log("error", error);
    }
  },
  addToCart: async (data,onSuccess) => {
    try {
      const response = await RepositoryRemote.cart.addToCart(data);
      if (response.data.code === 200 || response.data.code === 201) {
        toastSuccess("Đã thêm vào giỏ hàng");
        onSuccess()
      } else {
        toastFailure("Thêm vào giỏ hàng thất bại");
      }
    } catch (error) {
      toastFailure("Thêm vào giỏ hàng thất bại");
      console.log("error", error);
    }
  },
}));
