import { callApi } from "../apis";

const getProfile = () => {
  return callApi(`/customer/v1/profile`, "get");
};

const updateProfile = (data) => {
  return callApi("/customer/v1/profile", "put", data);
};

const getUserBank = () => {
  return callApi("/customer/v1/banks", "get");
};

const updateUserBank = (data) => {
  return callApi("/customer/v1/banks", "put", data);
};

const changePassword = (data) => {
  return callApi("/customer/v1/change_password", "post", data);
};

const createAddress = (data) => {
  return callApi("/customer/v1/address", "post", data);
};

const getAllShippingAddress = () => {
  return callApi("/customer/v1/address", "get");
}

const delShipAdd = (id) => {
  return callApi(`/customer/v1/address/${id}`, "delete");
};

const updateShipAdd = (id, data) => {
  return callApi(`/customer/v1/address/${id}`, "put", data);
}

const getProvinces = () => {
  return callApi("/place/vn/province", "get");
};

const getDistricts = (idProvince) => {
  return callApi(`/place/vn/district/${idProvince}`, "get");
};

const getWards = (idDistrict) => {
  return callApi(`/place/vn/wards/${idDistrict}`, "get");
};

const getBadges = () => {
  return callApi("/customer/v1/badges", "get");
};
export const user = {
  getProfile,
  updateProfile,
  getUserBank,
  updateUserBank,
  changePassword,
  createAddress,
  delShipAdd,
  updateShipAdd,
  getAllShippingAddress,
  getProvinces,
  getDistricts,
  getWards,
  getBadges
};
