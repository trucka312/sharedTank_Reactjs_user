import { callApi } from "../apis";

const getReportGeneral = (query) => {
  return callApi(`/customer/v1/statistic/report_generals${query}`, "get");
};

export const report = {
  getReportGeneral,
};
