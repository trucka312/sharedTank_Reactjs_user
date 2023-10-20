import React, { useState, useRef, useMemo } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import GiftIcon from "../../../assets/images/zin/gift.svg";
import PostForSaleIcon from "../../../assets/images/zin/postForSale.svg";
import AddtoCart from "../../../assets/images/zin/addToCart.svg";
import { useCartStore } from "../../../store/cartStore";
import { formatPrice } from "../../../utils";
import { useUserStore } from "../../../store/userStore";
import { getToken } from "../../../utils/auth";
import { toast } from "react-toastify";

const PostForSale = React.lazy(() => import("./PostForSale"));
const MainInfoStyles = styled.div`
  button {
    cursor: pointer;
  }
  .main-info {
    .product-order-info {
      display: flex;
      .name {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 20px;
        max-width: 100% !important;
      }
      .sku {
        display: flex;
        margin-bottom: 20px;
        align-items: center;
        p {
          font-size: 14px;
          font-family: "Inter", sans-serif;
          color: #000000;
        }
        .star-reviews {
          margin-right: 5px;
          .star-icon {
            margin-right: 5px;
          }
        }
        .total-reviews {
          padding-right: 7px;
          border-right: 1px solid black;
          text-decoration: underline;
        }
        .sold-product {
          margin: 0 10px 0 7px;
        }
      }
    }
  }
`;

export default function MainInfo(props) {
  const { addToCart } = useCartStore();
  const { getBadges } = useUserStore();
  const { productInfo } = props;
  const navigate = useNavigate();
  const [amountProduct, setAmountProduct] = useState(1);
  const [showPostforSale, setShowPostForSale] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const token = getToken();
  const maxStars = 5;
  const mainSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
  };

  const subSetting = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    dot: false,
    centerMode: false,
  };

  const sliderRef = useRef();

  const handleClosePostForSale = () => {
    setShowPostForSale(false);
  };
  const handleIncreaseProduct = () => {
    setAmountProduct(amountProduct + 1);
  };
  const handleDecreaseProduct = () => {
    if (amountProduct > 1) {
      setAmountProduct(amountProduct - 1);
    }
  };

  const arrImg = useMemo(() => {
    const arr = productInfo.images;
    if (productInfo?.video_url) {
      arr.unshift(productInfo.video_url);
    }
    return arr || [];
  }, [productInfo]);

  const handleMouseOverImage = (index) => {
    sliderRef.current.slickGoTo(index);
  };
  const handleShowImageModal = () => {
    setShowImageModal(true);
  };

  const handleAddtoCart = () => {
    const data = {
      product_id: productInfo.id,
      quantity: amountProduct,
    };
    const onSucces = () => {
      getBadges();
    };
    addToCart(data, onSucces);
  };

  return (
    <MainInfoStyles>
      <div className="mb-[20px]">
        <h4 className=" text-[14px] font-normal text-[#999] w-1/2 text-ellipsis overflow-hidden whitespace-nowrap xs:w-full">
          <span
            onClick={() => {
              navigate("/");
            }}
            className="text-[#81838C] mr-[7px] cursor-pointer"
          >
            Trang chủ
          </span>
          <span className="mr-[7px] text-[#CF5763]">{">"}</span>
          <span className="text-[#CF5763]">{productInfo.name}</span>
        </h4>
      </div>
      <div className="main-info flex gap-[40px] xs:block">
        <div className="w-2/5 xs:w-full">
          <div>
            <Slider ref={sliderRef} {...mainSettings}>
              {arrImg.length > 0 &&
                arrImg.map((item, key) => {
                  if (!item.image_url) {
                    return (
                      <video
                        controls
                        muted
                        autoPlay={"autoplay"}
                        preload="auto"
                        loop
                        className="h-[400px]"
                        key={key}
                      >
                        <source src={item} type="video/mp4" />
                      </video>
                    );
                  } else {
                    return (
                      <img
                        src={item.image_url}
                        key={key}
                        className="h-[400px] object-cover"
                      />
                    );
                  }
                })}
            </Slider>
          </div>
          <div className="mt-[20px]">
            <Slider {...subSetting}>
              {arrImg.length > 0 &&
                arrImg.map((item, key) => {
                  if (!item.image_url) {
                    return (
                      <video
                        controls
                        muted
                        autoPlay={"autoplay"}
                        preload="auto"
                        loop
                        className="h-[100px]"
                        onMouseOver={() => handleMouseOverImage(key)}
                        key={key}
                      >
                        <source src={item} type="video/mp4" />
                      </video>
                    );
                  } else {
                    return (
                      <img
                        onMouseOver={() => handleMouseOverImage(key)}
                        src={item.image_url}
                        key={key}
                        className="h-[100px] object-cover"
                      />
                    );
                  }
                })}
            </Slider>
          </div>
        </div>
        <div className="flex flex-col w-3/5 xs:w-full">
          <div className="flex">
            <div className="product-order-info w-full">
              <div className="w-full">
                <h1 className="name xs:m-[20px_0]">{productInfo.name}</h1>
                <div className="sku">
                  <div className="star-reviews">
                    {[...Array(maxStars)].map((_, index) => (
                      <i
                        key={index}
                        className="fas fa-star"
                        style={{
                          color:
                            productInfo.stars >= index + 1
                              ? "#ffce3d"
                              : "#faf7f7",
                        }}
                      ></i>
                    ))}
                  </div>
                  <div className="sold-product">
                    Đã bán:{" "}
                    <span className="text-[#CF5763]">{productInfo?.sold}</span>
                  </div>
                </div>
                <div className="w-full pr-[15px] xs:pr-0">
                  <div className="grid grid-cols-10 m-[20px_0]">
                    <div className="text-[#696666] w-full leading-[30px] col-span-2">
                      Giá:
                    </div>
                    <div className="col-span-8 text-[20px] text-[#cf5763] font-semibold ">
                      {formatPrice(productInfo.retail_price)}
                    </div>
                  </div>
                  {token && (
                    <div className="grid grid-cols-10 m-[20px_0]">
                      <div className="text-[#696666] w-full leading-[30px] col-span-2">
                        Hoa hồng:
                      </div>
                      <div className="col-span-8 text-[20px] text-[#cf5763] font-semibold">
                        {formatPrice(productInfo.price_commission_role)}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-10 m-[20px_0]">
                    <div className="text-[#696666] w-full leading-[30px] col-span-2">
                      Số lượng:
                    </div>
                    <div className="quantity-picker col-span-8">
                      <div className=" flex items-center">
                        <button
                          className=" border-none w-[30px] h-[30px] flex items-center justify-center"
                          onClick={handleDecreaseProduct}
                        >
                          -
                        </button>
                        <input
                          className="border-none w-[30px] h-[30px] flex items-center justify-center text-center"
                          type="number"
                          value={amountProduct}
                          onChange={(e) => {
                            let value = e.target.value.replace(/[^0-9]/g, "");
                            if (parseInt(value) < 1 || !value) {
                              value = 1;
                            }
                            setAmountProduct(parseInt(value));
                          }}
                        />
                        <button
                          className="border-none w-[30px] h-[30px] flex items-center justify-center"
                          onClick={handleIncreaseProduct}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="bg-[#CF5763] flex items-center text-[#fff] py-[5px] px-[10px] gap-[7px] rounded-t-[10px]">
                        <img src={GiftIcon} />
                        <span>Khuyến mãi</span>
                      </div>
                      <div
                        style={{
                          padding: "10px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "7px",
                          borderBottom: "1px solid #c4c4c4",
                          borderLeft: "1px solid #c4c4c4",
                          borderRight: "1px solid #c4c4c4",
                          borderBottomLeftRadius: "10px",
                          borderBottomRightRadius: "10px",
                        }}
                      >
                        <div>
                          Mua sản phẩm tặng{" "}
                          <span style={{ fontWeight: "600" }}>
                            {productInfo.gift_name}
                          </span>{" "}
                          trị giá{" "}
                          <span style={{ color: "#cf5763" }}>
                            {formatPrice(productInfo.gift_price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="list-buy-btn flex items-center mt-[20px] gap-[10px] xs:fixed xs:bottom-0 xs:left-0 xs:right-0 xs:bg-[#fff] xs:p-[15px] xs:z-10">
                    <button
                      className="flex items-center justify-center bg-[#2F80ED] gap-[10px] text-[#fff] w-1/2 h-[60px] rounded-[7px] border-none"
                      onClick={() => {
                        if (token) {
                          setShowPostForSale(true);
                        } else {
                          toast.error("Vui lòng đăng nhập");
                        }
                      }}
                    >
                      <img src={PostForSaleIcon} />
                      <span>Đăng bán</span>
                    </button>
                    <button
                      className="bg-[#cf5763] flex items-center justify-center gap-[10px] border-none w-1/2 h-[60px] text-[#fff] rounded-[6px]"
                      onClick={() => {
                        if (token) {
                          handleAddtoCart();
                        } else {
                          toast.error("Vui lòng đăng nhập");
                        }
                      }}
                    >
                      <img src={AddtoCart} />
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                  </div>
                  {showPostforSale && (
                    <PostForSale
                      handleClosePostForSale={handleClosePostForSale}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-[30px]">
        <div className="text-[#CF5763] text-[16px] mb-[15px]">
          Mô tả sản phẩm
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: productInfo.description }}
        ></div>
      </div>
    </MainInfoStyles>
  );
}
