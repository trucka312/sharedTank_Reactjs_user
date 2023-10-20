import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import AffRed from "../../assets/images/zin/aff-become-red.svg";
import AffWhite from "../../assets/images/zin/aff-become-white.svg";
import BloomLeft from "../../assets/images/zin/bloom.svg";
import BloomRight from "../../assets/images/zin/bloomRight.svg";
import SellerRed from "../../assets/images/zin/seller-become-red.svg";
import SellerWhite from "../../assets/images/zin/seller-become-white.svg";
import { useProductStore } from "../../store/product";
import TopTenGroup from "./child/TopTenGroup";
import {
  ArrowRightIcon,
  GroupPartnerIcon,
  GroupSellerIcon,
} from "../../assets/icons";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";
import TopTenIndividuals from "./child/TopTenIndividuals";

const HomeBanner = React.lazy(() => import("./child/HomeBanner"));
const ProductList = React.lazy(() => import("../../components/ProductList"));
const CustomerReview = React.lazy(() => import("./child/CustomerReview"));
const BlogNews = React.lazy(() => import("./child/BlogNews"));

const OptionContainerStyle = styled.div`
  background-color: #fbf4f5;
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px 0;
  @media (max-width: 1299px) {
    padding: 40px 16px;
  }
  @media (max-width: 475px) {
    padding: 20px 16px;
  }
  .seller {
    .images {
      width: 80px;
      height: 80px;
      background-image: url(${SellerRed});
      @media (max-width: 475px) {
        width: 60px;
        height: 60px;
      }
    }
  }
  .seller:hover {
    background-color: #cf5763;
    color: #fff;
    .images {
      background-image: url(${SellerWhite});
    }
  }
  .partner {
    .images {
      width: 80px;
      height: 80px;
      background-image: url(${AffRed});
      @media (max-width: 475px) {
        width: 60px;
        height: 60px;
      }
    }
  }
  .partner:hover {
    background-color: #cf5763;
    color: #fff;
    .images {
      background-image: url(${AffWhite});
    }
  }
  .option-container {
    display: flex;
    justify-content: space-evenly;
    background-color: #fbf4f5;
    gap: 20px;
  }
  .option-item {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 40px;
    padding: 31px 44px;
    background-color: #fff;
    // width: 400px;
    border-radius: 8px;
    cursor: pointer;
  }
  .title {
    margin: 30px 0 30px;
    text-align: center;
    @media (max-width: 475px) {
      margin: 22px 0 20px;
    }
  }
  a: {
    color: unset;
  }
`;

export default function Home() {
  const { products, getAllProduct } = useProductStore();

  const navigate = useNavigate();
  const {widthScreen} = useGetScreenWidth();

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="w-full">
      <HomeBanner />
      <OptionContainerStyle>
        <div className="flex gap-5 xs:gap-2">
          <div
            className="group flex-1 p-[30px_44px] xs:p-[18px_4px] rounded-[10px] flex justify-center gap-8 xs:gap-2 xs:rounded-[4px] items-center transition-all duration-300 ease-in-out bg-white hover:bg-[#CF5763] cursor-pointer"
            style={{ boxShadow: "0 1px 4px #00000012" }}
            onClick={() => navigate("/member?role=seller")}
          >
              <GroupSellerIcon className="w-[80px] h-[80px] xs:w-[20px] xs:h-[20px] text-[#CF5763] group-hover:text-white" />
            <div className="group-hover:text-white flex flex-col justify-center gap-2 h-full xs:gap-[2px] xs:text-[#CF5763]">
              <p className="text-[24px] font-semibold xs:text-[9px]">
                Trở thành nhà bán hàng
              </p>
              <p className="flex gap-2 items-center xs:gap-[4px]">
                <span className="text-[18px]  xs:text-[8px]">Xem chi tiết</span>
                <ArrowRightIcon className="w-[25px] h-[20px] xs:w-[10px] xs:h-[8px]" />
              </p>
            </div>
          </div>
          <div
            className="group flex-1 p-[30px_44px] xs:p-[18px_4px] rounded-[10px] flex justify-center  gap-8 xs:gap-2 xs:rounded-[4px] items-center transition-all duration-300 ease-in-out bg-white hover:bg-[#CF5763] cursor-pointer"
            style={{ boxShadow: "0 1px 4px #00000012" }}
            onClick={() => navigate("/member?role=partner")}
          >
              <GroupPartnerIcon className="w-[80px] h-[80px] xs:w-[20px] xs:h-[20px] text-[#CF5763] group-hover:text-white" />
            <div className="group-hover:text-white flex flex-col justify-center gap-2 h-full xs:gap-[4px] xs:text-[#CF5763]">
              <p className="text-[24px] font-semibold xs:text-[9px]">
                Trở thành đối tác chiến lược
              </p>
              <p className="flex gap-2 items-center xs:gap-[2px]">
                <span className="text-[18px]  xs:text-[8px]">Xem chi tiết</span>
                <ArrowRightIcon className="w-[25px] h-[20px] xs:w-[10px] xs:h-[8px]" />
              </p>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto mt-4 xs:mt-8">
          <div className="title">
            <img src={BloomLeft} alt="bloom" className="xs:hidden"/>
            <span
              className="font-semibold text-[16px] xs:text-[14px] mx-[10px] xs:mx-0"
            >
              TOP 10 CÁ NHÂN CÓ DOANH THU CAO NHẤT
            </span>
            <img src={BloomRight} alt="bloom" className="xs:hidden"/>
          </div>
          <div className="mt-10 xs:mt-2">
            <TopTenIndividuals columns={3} products={products} />
          </div>
        </div>
        <div className="w-full mx-auto mt-4 xs:mt-8">
          <div className="title">
            <img src={BloomLeft} alt="bloom" className="xs:hidden"/>
            <span
              className="font-semibold text-[16px] xs:text-[14px] mx-[10px] xs:mx-0"
            >
              TOP 10 ĐỘI NHÓM CÓ DOANH THU CAO NHẤT
            </span>
            <img src={BloomRight} alt="bloom" className="xs:hidden"/>
          </div>
          <div className="mt-10 xs:mt-2">
            <TopTenGroup columns={3} products={products} />
          </div>
        </div>
        <div className="w-full mx-auto py-[30px] xs:py-0 xs:pt-1">
          <div className="title">
            <img src={BloomLeft} alt="bloom" />
            <span
              className="font-semibold text-[16px] xs:text-[14px] mx-[10px]"
            >
              TẤT CẢ SẢN PHẨM
            </span>
            <img src={BloomRight} alt="bloom" />
          </div>
          <div className="home-product-card">
            <ProductList columns={widthScreen > 475 ? 3 : 1} products={products} />
          </div>
        </div>
      </OptionContainerStyle>
      <div className="bg-[#f8d9da]">
        <CustomerReview />
      </div>
      <BlogNews />
    </div>
  );
}
