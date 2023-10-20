import { Button, message } from "antd";
import styled from "styled-components";
import Slider from "react-slick";
import { useRef,useEffect } from "react";
import { CloseOutlined, LinkOutlined } from "@ant-design/icons";

import { useUserStore } from "../../../store/userStore";
import { useProductStore } from "../../../store/product";

const PostForSaleStyle = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  .slick-track {
    margin-left: unset;
    margin-right: unset;
  }
`;

export default function PostForSale(props) {
  const { handleClosePostForSale,showPostforSale } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const { profile } = useUserStore();
  const { productInfo } = useProductStore();
  const postForSaleRef = useRef();
  const setting = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
  };

  function changeCowcIdInURL(oldURL, newCowcId) {
    const url = new URL(oldURL);
    url.searchParams.set("cowc_id", newCowcId);
    return url.toString();
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(changeCowcIdInURL(window.location.href, profile.id))
      .then(() => {
        messageApi.open({
          type: "success",
          content: "Đã sao chép",
        });
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "Sao chép thất bại",
        });
      });
  };

  const handleClickOutside = (event) => {
    if (
      postForSaleRef.current &&
      !postForSaleRef.current?.contains(event.target) 
    ) {
      handleClosePostForSale();
     
    }
  };

  useEffect(() => {
      window.addEventListener("click", handleClickOutside, true);
    
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <PostForSaleStyle>
      {contextHolder}
      <div
        className="w-[700px] bg-[#fff] rounded-[10px] p-[30px] h-[500px] overflow-y-auto"
        ref={postForSaleRef}
      >
        <div className=" flex items-center justify-between">
          <div className="text-[20px]">Đăng bán</div>
          <CloseOutlined onClick={handleClosePostForSale} />
        </div>
        <div className=" my-[15px]">
          <div>
            Link người giới thiệu:{" "}
            <span
              className="cursor-pointer text-[#CF5763]"
              onClick={() => copyToClipboard()}
            >
              {changeCowcIdInURL(window.location.href, profile.id)}
            </span>
          </div>
        </div>
        <div
          className="my-[15px]"
          dangerouslySetInnerHTML={{ __html: productInfo.description }}
        ></div>
        <div>
          <Slider {...setting}>
            {productInfo.images.map((item, key) => {
              return <img src={item.image_url} key={key} alt="product-image" />;
            })}
          </Slider>
        </div>
      </div>
    </PostForSaleStyle>
  );
}
