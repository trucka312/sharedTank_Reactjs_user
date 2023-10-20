import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { useProductStore } from "../../store/product";
import { useUserStore } from "../../store/userStore";

const SimilarProducts = React.lazy(() => import("./child/SimilarProducts.jsx"));
const MainInfo = React.lazy(() => import("./child/MainInfo.jsx"));
const CustomerReview = React.lazy(() => import("./child/CustomerReview"));

const ProductInfoStyle = styled.div`
  background-color: #fafafa;
  padding: 20px;
  .slick-arrow {
    background-color: rgba(0, 0, 0, 0.2) !important;
    width: 30px;
    height: 40px;
    z-index: 1;
  }
  .slick-track {
    margin-left: unset;
    margin-right: unset;
  }
`;
function ProductInfoPage() {
  const { productInfo, getProductDetail, getSimilarProduct, similarProduct } =
    useProductStore();
  // const { profile, loading } = useUserStore();
  const { idProduct } = useParams();
  const arr = idProduct.split("-");

  // const [searchParams, setSearchParams] = useSearchParams();
  // const cowcId = searchParams.get("cowc_id");
  const productId = arr[arr.length - 1];

  useEffect(() => {
    getProductDetail(productId);
    getSimilarProduct(productId);
  }, [idProduct]);

  //Kiểm tra nếu id của người dùng mà khác với cowc_id thì lưu cowc_id vào local


  // useEffect(() => {
  //   //Kiểm tra id của người dùng có khác cowcId và cowcId có tồn tại không
  //   // if (profile.id !== parseInt(cowcId) && cowcId) {
  //   //   localStorage.setItem("cowc_id", cowcId);
  //   // }

  //   if (!loading) {
  //     if (Object.keys(profile).length > 0) {
  //       if (profile.id !== parseInt(cowcId) && cowcId) {
  //         localStorage.setItem("cowc_id", cowcId);
  //         return;
  //       }
  //     }else{
  //       if (cowcId) {
  //         localStorage.setItem("cowc_id", cowcId);
  //       }
  //     }
  //   }
  // }, [loading]);

  return (
    <ProductInfoStyle>
      <div className="mx-auto w-4/5 xs:w-full">
        <MainInfo productInfo={productInfo} />
        <CustomerReview productId={productId} />
        <SimilarProducts similarProduct={similarProduct} />
      </div>
    </ProductInfoStyle>
  );
}
export default ProductInfoPage;
