import { callApi } from "../apis";

const addToCart = (data) => {
  return callApi("/customer/v1/carts/items", "post", data);
};

const getCartInfo = () => {
  return callApi("/customer/v1/carts", "post");
};

const updateCart = (data) => {
  return callApi("/customer/v1/carts/items", "put",data);
};

export const cart = { addToCart, getCartInfo, updateCart };
