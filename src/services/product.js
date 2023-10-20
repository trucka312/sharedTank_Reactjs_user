import { callApi } from "../apis";

const getAllProduct = () => {
  return callApi(`/customer/v1/products`, "get");
};

const getProductDetail = (idProduct) => {
  return callApi(`/customer/v1/products/${idProduct}`, "get");
};

const getSimilarProduct = (idProduct)=>{
    return callApi(`/customer/v1/products/${idProduct}/similar_products`,'get')
}

const getCustomerReview = (idProduct, query)=>{
    return callApi(`/customer/v1/products/${idProduct}/reviews${query}`,'get')
}

const sendReviews = (idProduct, params)=>{
  return callApi(`/customer/v1/products/${idProduct}/reviews`,'post', params)
}

export const product = {
  getAllProduct,
  getProductDetail,
  getSimilarProduct,
  getCustomerReview,
  sendReviews
};
