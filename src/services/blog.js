import { callApi } from "../apis";

const getBlog = () => {
  return callApi("/customer/v1/posts", "get");
};

const getPostCategories = () => {
  return callApi(`/customer/v1/post_categories`, "get");
}

const getAllPosts = (page) => {
  return callApi(`/customer/v1/posts?${page ? `page=${page}` : ``}`, "get");
}

const getPostDetail = (id) => {
  return callApi(`/customer/v1/posts/${id}`, "get");
}

const getPostsCategoryIds = (id, page) => {
  return callApi(`/customer/v1/posts?category_ids=${id}&page=${page}`, "get");

}

export const blog = {
  getPostCategories,
  getAllPosts,
  getPostDetail,
  getPostsCategoryIds,
  getBlog
}
