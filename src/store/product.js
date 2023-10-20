import { create } from "zustand";
import { RepositoryRemote } from "../services";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  productInfo: {},
  similarProduct: [],
  customerReview: [],
  reviewsInfo: {},
  getAllProduct: async () => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.product.getAllProduct();
      set({ products: response.data.data.data });
    } catch (error) {
      console.log("error", error);
    }
    set({ loading: false });
  },
  getProductDetail: async (idProduct) => {
    try {
      const response = await RepositoryRemote.product.getProductDetail(
        idProduct
      );
      set({ productInfo: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
  },

  getSimilarProduct: async (idProduct) => {
    try {
      const response = await RepositoryRemote.product.getSimilarProduct(
        idProduct
      );
      set({ similarProduct: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
  },
  getCustomerReview: async (idProduct, query) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.product.getCustomerReview(
        idProduct, query
      );
      set({ customerReview: response.data.data.data });
      set({ reviewsInfo: response.data.data });
    } catch (error) {
      console.log("error", error);
    }
    set({ loading: false });
  },
  sendReviews: async (idProduct, params, onSuccess, onFail) => {
    set({ loading: true });
    try {
      const response = await RepositoryRemote.product.sendReviews(
        idProduct,
        params
      );
      onSuccess();
    } catch (error) {
      onFail(error.response?.data?.msg || "Có lỗi xảy ra");
    }
    set({ loading: false });
  },
}));
