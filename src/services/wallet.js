import { callApi } from "../apis";

const requestReCharge = (data) => {
  return callApi(`/customer/v1/request_wallets`, "post", data);
};

const requestBuyPackage = (data) => {
  return callApi(`/customer/buy_package`, "post", data);
};

const getCustomerWallet = () => {
  return callApi("/customer/v1/wallets", "get");
};

const getOrderHistory = (page, is_have_cus_referral) => {
  return callApi(`/customer/v1/carts/orders?page=${page}&is_have_cus_referral=${is_have_cus_referral}`, "get");
};

const getWalletHistory = (query) => {
  return callApi(
    `/customer/v1/history_wallets${query}`,
    "get"
  );
};

const getRequestWalletHistory = (page, isWithDraw) => {
  const url = `/customer/v1/history_request_wallets?page=${page}${isWithDraw ? '&is_withdrawal=true' : ''}`;
  return callApi(url, "get");
};

const requestWithDraw = (data) => {
  return callApi(`/customer/v1/request_wallets`, "post", data);
};

export const wallet = {
  requestReCharge,
  requestBuyPackage,
  getCustomerWallet,
  getOrderHistory,
  getWalletHistory,
  getRequestWalletHistory,
  requestWithDraw,
};
