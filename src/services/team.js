import { callApi } from "../apis";

const getTopGroupRevenue = () => {
  return callApi("/customer/v1/statistic/top_group_revenues", "get");
};

export const team = { getTopGroupRevenue };
