import { create } from 'zustand';
import { RepositoryRemote } from '../services';

export const useBlogStore = create((set, get) => ({
  blogCategory: [],
  blogListInfor: {},
  blog: {},
  blogDetail: {},
  loadingCategory: false,
  loadingPost: false,
  loadingPostDetail: false,
  loadingPostByCategoryIds: false,
  getPostCategories: async (onSuccess = () => {}, onFail) => {
    try {
      set({ loadingCategory: true });
      const response = await RepositoryRemote.blog.getPostCategories();
      set({ blogCategory: response.data.data, loadingCategory: false });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || 'Có lỗi xảy ra!');
    }
  },

  getPost: async (page, onSuccess, onFail) => {
    try {
      set({ loadingPost: true });
      const response = await RepositoryRemote.blog.getAllPosts(page);
      set({ blog: response.data.data, loadingPost: false });
      set({ blogListInfor: response.data, loadingPost: false });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || 'Có lỗi xảy ra!');
    }
  },

  getPostById: async (id, onSuccess, onFail) => {
    try {
      set({ loadingPostDetail: true });
      const response = await RepositoryRemote.blog.getPostDetail(id);
      set({ blogDetail: response.data.data, loadingPostDetail: false });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || 'Có lỗi xảy ra!');
    }
  },

  getPostsCategoryIds: async (ids, page, onSuccess, onFail) => {
    try {
      set({ loadingPostByCategoryIds: true });
      const response = await RepositoryRemote.blog.getPostsCategoryIds(ids, page);
      set({ blog: response.data.data, loadingPostByCategoryIds: false });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || 'Có lỗi xảy ra!');
    }
  },
}));

