import styled from "styled-components";

import ReviewIcon from "../../../assets/images/zin/reviewIcon.svg";
import CustomerReviewAva from "../../../assets/images/zin/customerReviewAvatar.svg";
import Slider from "react-slick";
import useGetScreenWidth from "../../../hooks/useGetScreenWidth";
const CustomerReviewStyle = styled.div`
  padding: 40px 0;
  max-width: 1300px;
  margin: 0 auto;
  @media (max-width: 576px) {
    background-color: #fbf4f5;
    padding: 20px 0;
  }
  .review-item {
    padding: 24px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    // @media (max-width: 576px) {
    //   background-color: #FBF4F5;
    // }
    .customer-review {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 4 px;
    }
  }
  .slick-dots {
    li {
      width: 6px;
      height: 6px; 
    }
    .slick-active {
      button::before {
        color: #cf5763;
      }
    }
  }
`;

export default function CustomerReview() {
  const maxStars = 5;
  const { widthScreen } = useGetScreenWidth();
  const renderStar = () => {
    return (
      <div className="flex gap-[2px]">
        {[...Array(maxStars)].map((_, index) => (
          <i
            key={index}
            className="fas fa-star"
            style={{
              fontSize: "14px",
              color: "#ffce3d",
            }}
          ></i>
        ))}
      </div>
    );
  };

  const renderList = () =>
    [...Array(3)].map((_, index) => (
      <div className="review-item" key={index}>
        <div>
          <img src={ReviewIcon} alt="review-icon" />
        </div>
        <div style={{ lineHeight: "20px" }}>
          Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
          Phasellus imperdiet elit eu magna dictum, bibendum cursus velit
          sodales. Donec sed neque eget
        </div>
        <div className="customer-review">
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div>
              <img src={CustomerReviewAva} />
            </div>
            <div>
              <div style={{ fontWeight: "600" }}>Robert Fox</div>
              <div style={{ color: "#999999" }}>Customer</div>
            </div>
          </div>
          <div>{renderStar()}</div>
        </div>
      </div>
    ));

  const reviewsSetting = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    // arrows: false,
    dots: true,
    // dotClassName: "dot",
    // activeDotClassName: "active-dot",
    autoplay: true,
  };

  return (
    <CustomerReviewStyle>
      <div
        className="w-full mx-auto font-semibold text-[16px] mb-[20px] xs:pl-[16px]"
      >
        Khách hàng nói gì về chúng tôi
      </div>
      {widthScreen > 768 ? (
        <div
          style={{
            width: "100%",
            margin: "0 auto",
            display: "flex",
            gap: "15px",
            // flexWrap: "wrap",
            // padding: "0 16px",
          }}
        >
          {renderList()}
        </div>
      ) : (
        <Slider {...reviewsSetting} className="px-4">
          {renderList()}
        </Slider>
      )}
    </CustomerReviewStyle>
  );
}
