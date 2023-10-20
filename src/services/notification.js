import { callApi } from "../apis";

const getAllNotifications = (query) => {
  return callApi(`/customer/v1/notifications_history${query}`, "get");
};

const readAllNotification = () => {
  return callApi("/customer/v1/notifications_history/read_all", "get");
};

const readOneNotification = (id) => {
  return callApi(`/customer/v1/notifications_history/${id}`, "get");
};

export const notification = {
  getAllNotifications,
  readAllNotification,
  readOneNotification,
};
