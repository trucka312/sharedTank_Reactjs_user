import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useBlogStore } from "../../../store/blogStore";
import BloomLeft from "../../../assets/images/zin/bloom.svg";
import BloomRight from "../../../assets/images/zin/bloomRight.svg";
import useGetScreenWidth from "../../../hooks/useGetScreenWidth";
import Slider from "react-slick";

const SummaryStyle = styled.div`
  color: #000;
  height: 60px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  .slick-track {
    display: flex;
    gap: 16px
  }
  .slick-slide {
    width: 80%;
  }
`;

export default function BlogNews() {
  const { widthScreen } = useGetScreenWidth();
  const { blog, getPost } = useBlogStore();

  useEffect(() => {
    getPost(1);
  }, []);

  const renderList = () => {
    if (blog?.data && !blog?.data.length) return null;
    return blog?.data?.slice(0, 3).map((item) => {
      return (
        <Link
          to={`/blog/${item.id}`}
          key={item.id}
          style={{
            flex: "3",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            borderRadius: "5px"
          }}
        >
          <div style={{ width: "100%" }}>
            <img
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
              }}
              src={item.image_url}
              alt="blog-new"
            />
          </div>
          <div
            style={{
              padding: "15px 10px ",
              backgroundColor: "#fff",
            }}
          >
            <SummaryStyle>{item.summary}</SummaryStyle>
            <div
              style={{
                padding: "5px 0",
                color: "#CF5763",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              Xem thêm
              <i
                style={{ color: "#CF5763" }}
                className="fas fa-arrow-right"
              ></i>
            </div>
          </div>
        </Link>
      );
    });
  };

  const reviewsSetting = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    // arrows: false,
    dots: true,
    autoplay: true,
    gutter: 10
  };

  return (
    <React.Suspense fallback={<p></p>}>
      <div style={{ padding: "30px 0", paddingBottom: "80px" }}>
        <div className="w-full text-center mt-[30px] mb-[20px] xs:mt-[16px]">
          <img src={BloomLeft} alt="bloom-left" />
          <span
            style={{ fontSize: "16px", fontWeight: "600", margin: "0 7px" }}
          >
            TIN TỨC MỚI NHẤT
          </span>
          <img src={BloomRight} alt="bloom-right" />
        </div>
        {widthScreen > 576 ? (
          <div>
            <div
              style={{
                width: "100%",
                margin: "0 auto",
                display: "flex",
                gap: "10px",
                maxWidth: "1300px",
              }}
            >
              {renderList()}
            </div>
          </div>
        ) : (
          <Slider {...reviewsSetting} className="px-4">
            {renderList()}
          </Slider>
        )}
      </div>
    </React.Suspense>
  );
}
