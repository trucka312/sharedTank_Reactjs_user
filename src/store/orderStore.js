import { create } from "zustand";
import { RepositoryRemote } from "../services";
import { toastFailure, toastSuccess } from "../utils";
import { alerts } from "../utils/alerts";

export const useOrderStore = create((set) => ({
  userAddress: [],
  paymentMethods: [],
  listShipper: [],
  orderInfo: {},
  allOrderList: [],
  allOrderInfo: {},
  loading: false,
  orderLoading:false,
  getUserAddress: async () => {
    try {
      const response = await RepositoryRemote.order.getUserAddress();
      set({ userAddress: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
  },
  getPaymentMethod: async () => {
    try {
      const response = await RepositoryRemote.order.getPaymentMethod();
      set({ paymentMethods: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
  },
  getListShipper: async (data) => {
    try {
      const response = await RepositoryRemote.order.getListShipper(data);
      set({ listShipper: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
  },
  getOrderById: async (order_code) => {
    try {
      const response = await RepositoryRemote.order.getOrderById(order_code);
      if (response.data.code === 200 || response.data.code === 201) {
        set({ orderInfo: response.data.data });
      }
    } catch (error) {
      alerts.error("Đơn hàng không tồn tại");
    }
  },
  updatePaymentMethod: async (data, order_code) => {
    try {
      const response = await RepositoryRemote.order.updatePaymentMethod(
        data,
        order_code
      );
      if (response.data.code === 200 || response.data.code === 201) {
        toastSuccess("Đổi phương thức thanh toán thành công");
      } else {
        toastFailure("Đổi phương thức thanh toán thất bại");
      }
    } catch (error) {
      toastFailure("Đổi phương thức thanh toán thất bại");
      console.log("error", error);
    }
  },
  orders: async (data, onSuccess) => {
    try {
      set({orderLoading:true})
      const response = await RepositoryRemote.order.orders(data);
      console.log(response,'response');
      if (response.data.code === 200 || response.data.code === 201) {
        set({ orderInfo: response.data.data });
        onSuccess();
      }
    } catch (error) {
      console.log("error", error);
    }
    set({orderLoading:false})
  },

  getOrdersList: async (data) => {
    set({ loading: true });
    try {
      const response = await RepositoryRemote.order.getOrdersList(data);
      set({ allOrderList: response.data.data.data });
      set({ allOrderInfo: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
    set({ loading: false });
  },
  resetOrder: () => {
    set({
      userAddress: [],
      paymentMethods: [],
      listShipper: [],
    });
  },
  resetOrderInfo: () => {
    set({
      orderInfo: {},
    });
  },
}));
