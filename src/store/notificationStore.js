import { create } from "zustand";
import { RepositoryRemote } from "../services";
import { toast } from "react-toastify";

export const useNotificationStore = create((set) => ({
  notificationList: [],
  loading: false,
  allNotificationInfo: {},
  totalUnread: 0,
  getAllNotifications: async (
    query,
    onSuccess = () => {},
    onFail = () => {}
  ) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.notification.getAllNotifications(
        query
      );
      set({ notificationList: response.data.data.list_notification.data });
      set({ allNotificationInfo: response.data.data.list_notification });
      set({ totalUnread: response.data.data.total_unread });
      onSuccess();
    } catch (error) {
      onFail(error || "Có lỗi xảy ra");
    }
    set({ loading: false });
  },
  readAll: async (onSuccess = () => {}) => {
    try {
      const response =
        await RepositoryRemote.notification.readAllNotification();
      if (response.data.code === 200 || response.data.code === 201) {
        onSuccess();
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Có lỗi xảy ra");
    }
  },
  readOne: async (id, onSuccess = () => {}) => {
    try {
      const response =
        await RepositoryRemote.notification.readOneNotification(id);
      if (response.data.code === 200 || response.data.code === 201) {
        onSuccess();
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Có lỗi xảy ra");
    }
  },
  handleReceiveNoti: (data) => {
    const { notificationList } = useNotificationStore.getState();
    const newNotificationList = [...notificationList];
    newNotificationList.unshift(data);
    set({ notificationList: newNotificationList });
  },
}));
