import { useState } from "react";
import {
  CircleClose,
  StarBorderIcon,
  StartFillIcon,
} from "../../../assets/icons";
import PropTypes from "prop-types";
import TextArea from "antd/es/input/TextArea";
import UploadMultiple from "../../../components/common/upload/UploadMutiple";
import UploadVideo from "../../../components/common/upload/UploadVideo";
import { Button, Spin } from "antd";
import { alerts } from "../../../utils/alerts";
import { useProductStore } from "../../../store/product";
import { useOrderStore } from "../../../store/orderStore";
import useGetScreenWidth from "../../../hooks/useGetScreenWidth";

const rattingMsg = [
  "Vui lòng đánh giá",
  "Rất không hài lòng",
  "Không hài lòng",
  "Bình thường",
  "Hài lòng",
  "Rất hài lòng",
];

const msgReview = [
  "Rất hài lòng",
  "Rất đáng tiền",
  "Shop phục vụ tốt",
  "Đóng gói sản phẩm rất đẹp",
  "Thời gian giao hàng nhanh",
  "Chất lượng sản phẩm tuyệt vời",
];

export default function Evaluate({ product, orderCode, setOpenModalRatting }) {
  const { sendReviews, loading } = useProductStore();
  const { getOrderById } = useOrderStore();
  const { widthScreen } = useGetScreenWidth();
  console.log("widthScreen: ", widthScreen);

  const [currentRating, setCurrentRatting] = useState(0);
  const [content, setContent] = useState("");
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");

  const onSubmit = () => {
    if (currentRating < 1) {
      alerts.warning("Vui lòng chọn mức độ hài lòng");
      return;
    }
    if (!content) {
      alerts.warning("Vui lòng thêm nội dung đánh giá");
      return;
    }
    const params = {
      content: content,
      images: images,
      video_link: videoUrl,
      stars: currentRating,
      order_code: orderCode,
    };

    const onSuccess = () => {
      alerts.success("Gửi đánh giá thành công");
      setOpenModalRatting(false);
      getOrderById(orderCode);
    };
    const onFail = (error) => {
      alerts.error(error);
    };
    sendReviews(product.id, params, onSuccess, onFail);
  };

  const handleSelectReview = (msg) => {
    if (!content.includes(msg)) {
      setSelectedReviews([...selectedReviews, msg]);
      if (content === "") {
        setContent(msg);
      } else {
        setContent(`${content}. ${msg}`);
      }
    }
  };

  const handleClickRemove = (msg) => {
    const updatedReviews = selectedReviews.filter((review) => review !== msg);
    setSelectedReviews(updatedReviews);
    setContent(
      content.replace(`${msg}. `, "").replace(`. ${msg}`, "").replace(msg, "")
    );
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const { name } = product;
  return (
    <Spin spinning={loading}>
      <p className="xs:text-[10px]">{name}</p>
      <div className="text-center mt-3 xs:mt-1">
        <p className="font-semibold mb-2 xs:text-[12px] xs:mb-0">
          {rattingMsg[currentRating]}
        </p>
        <div className="flex gap-1 justify-center">
          {Array(5)
            .fill((i) => {
              if (i <= currentRating)
                return (
                  <StartFillIcon
                    key={i}
                    className="w-[42px] h-[42px] xs:w-[20px] xs:h-[20px] text-[#FFCE3D] cursor-pointer"
                    onClick={() => setCurrentRatting(i)}
                  />
                );
              return (
                <StarBorderIcon
                  key={i}
                  className="w-[42px] h-[42px] xs:w-[20px] xs:h-[20px] text-[#FFCE3D] cursor-pointer"
                  onClick={() => setCurrentRatting(i)}
                />
              );
            })
            .map((item, index) => item(index + 1))}
        </div>
      </div>
      <div className="mt-3">
        <TextArea
          value={content}
          onChange={handleInputChange}
          placeholder="Đánh giá của bạn"
          autoSize={{ minRows: !widthScreen > 576 ? 7 : 3 }}
          className="xs:text-[10px]"
        />
      </div>
      <div className="flex gap-2 flex-wrap mt-2">
        {msgReview.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleSelectReview(item, index)}
              className="relative border border-[#E5E5E5] border-solid rounded-full p-1 px-4 cursor-pointer w-fit hover:bg-[#FBF4F5] xs:text-[9px] xs:px-2"
              style={{
                backgroundColor: content.includes(item) ? "#FBF4F5" : "",
                color: content.includes(item) ? "#CF5763" : "",
              }}
            >
              {item}
              {content.includes(item) && (
                <CircleClose
                  className="w-[16px] h-[16px] absolute top-[-4px] right-[-4px] hover:text-red-500"
                  onClick={() => handleClickRemove(item)}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex xs:text-[10px]">
        <div className="flex-1">
          <p className="mb-1">Ảnh đánh giá:</p>
          <UploadMultiple
            images={images}
            setImages={setImages}
            width={widthScreen ? 50 : 80}
            height={widthScreen ? 50 : 80}
            text="Thêm"
          />
        </div>
        <div className="flex-1">
          <p className="mb-1">Video đánh giá:</p>
          <UploadVideo
            video={videoUrl}
            setVideo={setVideoUrl}
            width={widthScreen ? 50 : 80}
            height={widthScreen ? 50 : 80}
            text="Thêm"
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end mt-4">
        <Button
          onClick={() => setOpenModalRatting(false)}
          className="xs:text-[10px]"
        >
          Hủy
        </Button>
        <Button type="primary" onClick={onSubmit} className="xs:text-[10px]">
          Gửi đánh giá
        </Button>
      </div>
    </Spin>
  );
}

Evaluate.propTypes = {
  product: PropTypes.object,
  orderCode: PropTypes.string,
  setOpenModalRatting: PropTypes.func,
};
