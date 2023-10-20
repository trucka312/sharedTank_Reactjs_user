import { callApi } from "../apis";

const getUserAddress = () => {
  return callApi("/customer/v1/address", "get");
};

const getPaymentMethod = () => {
  return callApi("/customer/v1/payment_methods", "get");
};
const getListShipper = (data) => {
  return callApi("/customer/v1/shipment/list_shipper", "post", data);
};

const getOrderById = (order_code) => {
  return callApi(`/customer/v1/carts/orders/${order_code}`, "get");
};

const getListShipmentFee = (partnerId, addressId) => {
  return callApi(
    `/customer/v1/carts/calculate_fee/${partnerId}`,
    "post",
    addressId
  );
};

const updatePaymentMethod = (data, order_code) => {
  return callApi(
    `/customer/v1/carts/orders/change_payment_method/${order_code}`,
    "put",
    data
  );
};

const getOrdersList = (query) => {
  return callApi(`/customer/v1/carts/orders${query || ""}`, "get");
};

const orders = (data) => {
  return callApi("/customer/v1/carts/orders", "post", data);
};

const getOrdersListFilter = (query) => {
  return callApi(`/customer/v1/carts/orders${query}`, "get");
};

export const order = {
  getUserAddress,
  getPaymentMethod,
  getListShipper,
  getListShipmentFee,
  getOrderById,
  updatePaymentMethod,
  getOrdersList,
  orders,
  getOrdersListFilter
};
