import { callApi } from "../apis";

const getBanners = () => {
  return callApi("/customer/v1/home_web/banners", "get");
};

export const banners = { getBanners };
