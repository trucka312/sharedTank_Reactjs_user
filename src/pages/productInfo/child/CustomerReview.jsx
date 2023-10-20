import { useEffect, useState } from "react";

import { Image } from "antd";
import PropTypes from "prop-types";
import { StarBorderIcon, StartFillIcon } from "../../../assets/icons";
import { useProductStore } from "../../../store/product";
import { formatDate } from "../../../utils/date";
import ReviewSkeleton from "./ReviewSkeleton";

export default function CustomerReview({ productId }) {
  const { customerReview, getCustomerReview, reviewsInfo, loading } =
    useProductStore();
  const [selectedRatting, setSelectedRatting] = useState(0);

  useEffect(() => {
    getReviews();
  }, [selectedRatting]);

  const getReviews = () => {
    const query = `?page=1${filterRattingOptions[selectedRatting].query}`;
    getCustomerReview(productId, query);
  };

  const {
    total_1_stars,
    total_2_stars,
    total_3_stars,
    total_4_stars,
    total_5_stars,
    total_has_image,
    total_reviews,
    averaged_stars
  } = reviewsInfo ?? {};

  const filterRattingOptions = [
    {
      id: 0,
      name: `Tất cả(${total_reviews || 0})`,
      value: "all",
      query: "",
    },
    {
      id: 1,
      name: `(${total_5_stars || 0})`,
      value: 5,
      query: "&filter_by=stars&filter_by_value=5",
    },
    {
      id: 2,
      name: `(${total_4_stars || 0})`,
      value: 4,
      query: "&filter_by=stars&filter_by_value=4",
    },
    {
      id: 3,
      name: `(${total_3_stars || 0})`,
      value: 3,
      query: "&filter_by=stars&filter_by_value=3",
    },
    {
      id: 4,
      name: `(${total_2_stars || 0})`,
      value: 2,
      query: "&filter_by=stars&filter_by_value=2",
    },
    {
      id: 5,
      name: `(${total_1_stars || 0})`,
      value: 1,
      query: "&filter_by=stars&filter_by_value=1",
    },
    {
      id: 6,
      name: `Có hình ảnh / video(${total_has_image || 0})`,
      query: "&has_image_video=true",
    },
  ];

  const renderFilterRatting = () => {
    return filterRattingOptions.map((item, index) => {
      const { name, value } = item;
      return (
        <div
          key={index}
          className="rounded-md p-[10px] cursor-pointer bg-white min-w-[120px] text-center border-[1px] border-solid border-gray-200 flex items-center justify-center"
          style={
            selectedRatting === index
              ? { border: "1px solid #CF5763", color: "#CF5763" }
              : {}
          }
          onClick={() => setSelectedRatting(index)}
        >
          {index === 0 || index === 6 ? (
            <p>{name}</p>
          ) : (
            <div className="flex items-center">
              {Array(5)
                .fill((i) => {
                  if (i <= value)
                    return (
                      <StartFillIcon
                        style={
                          selectedRatting === index ? { color: "#e06a76" } : {}
                        }
                        className="w-[16px] h-[16px] text-[#FFCE3D] cursor-pointer"
                      />
                    );
                })
                .map((item, index) => item(index + 1))}
              {name}
            </div>
          )}
        </div>
      );
    });
  };

  const renderReviewList = () => {
    if (loading) return <ReviewSkeleton />;
    if (customerReview && customerReview.length === 0)
      return <p className="text-center mt-5 font-semibold">Không có đánh giá nào</p>;
    return customerReview.map((item, index) => {
      const { content, customer, stars, created_at, images, video_link } = item;
      const { avatar_image, name, customer_role } = customer;
      return (
        <div key={index} className="flex gap-2 my-5 pb-5" style={{ borderBottom: "1px solid #00000017" }}>
          <div>
            <img
              src={avatar_image}
              alt="avt"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
          </div>
          <div>
            <p>{name}<span className="text-[#0000008a]"> | {customer_role}</span></p>
            <p className="my-[2px]">{handleRenderRatting(stars, 16)}</p>
            <p className="text-[#0000008a]">{formatDate(created_at, "HH:MM DD-MM-YYYY")}</p>
            <p className="mt-3">{content}</p>
            <div className="flex gap-2 mt-3">
            {video_link && <video width="80" height="80" controls className="rounded-lg">
              <source src={video_link} type="video/mp4" />
            </video>}
            {images && images.length ? 
                images.map((item, index) => (
                  <Image
                    key={index}
                    src={item}
                    alt="review-img"
                    width={80}
                    height={80}
                    className="w-[80px] h-[80px] object-cover rounded-md"
                  />
                ))
                 : null}
                </div>
          </div>
        </div>
      );
    });
  };

  const handleRenderRatting = (value, size) => {
    return Array(5)
      .fill((i) => {
        if (i <= value)
          return (
            <StartFillIcon
              key={i}
              className={`w-[${size}px] h-[${size}px] text-[#FFCE3D] cursor-pointer`}
            />
          );
        return (
          <StarBorderIcon
            key={i}
            className={`w-[${size}px] h-[${size}px] text-[#FFCE3D] cursor-pointer`}
          />
        );
      })
      .map((item, index) => item(index + 1));
  };

  return (
    <div className="py-5">
      <h2>Đánh giá sản phẩm</h2>
      <div className="flex gap-5 p-5 bg-[#FBF4F5] mt-5 py-8 items-center">
        <div className="text-center px-3">
          <p className="mb-2 text-[20px] font-semibold text-[#CF5763]">
            {(averaged_stars || 0).toFixed(1)} trên 5
          </p>
          {handleRenderRatting(Math.round(averaged_stars || 0), 30)}
        </div>
        <div className="flex gap-2 items-center flex-wrap flex-1">
          {renderFilterRatting()}
        </div>
      </div>
      <div className="p-5 pt-2 min-h-[250px]">{renderReviewList()}</div>
    </div>
  );
}

CustomerReview.propTypes = {
  productId: PropTypes.string,
};
