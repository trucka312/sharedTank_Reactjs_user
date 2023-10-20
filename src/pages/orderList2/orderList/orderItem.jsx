import { Image } from "antd";
import PropTypes from "prop-types";
import ImageDefault from "../../../assets/images/image-default.jpg";
import { formatNumber } from "../../../utils";
import useGetScreenWidth from "../../../hooks/useGetScreenWidth";

export default function OrderItem({ order, product, isFirst, isLast }) {
  const { order_status_code, order_code } = order;
  const { image_url, name, item_price, quantity } = product;
  const { widthScreen} = useGetScreenWidth();

  const handleOrderInfo = () => {
    switch (order_status_code) {
      case "COMPLETED":
        return {
          action: "Đơn hàng đã được giao thành công",
          status: "Hoàn thành",
          button: ["Đánh giá", "Mua lại"],
        };
      case "WAIT_FOR_PAYMENT":
        return {
          action: "",
          status: "Chờ thanh toán",
          button: ["Thanh toán", "Mua lại"],
        };
      case "PACKING":
        return {
          action: "Người bán đang chuẩn bị hàng",
          status: "Đang chuẩn bị",
          button: ["Liên hệ người bán hàng", "Hủy đơn hàng"],
        };
      case "SHIPPING":
        return {
          action: "Đơn hàng đang trên đường giao đến bạn",
          status: "Đang giao",
          button: ["Đã nhận hàng", "Yêu cầu trả hàng/hoàn tiền"],
        };
      case "CUSTOMER_CANCELLED":
        return {
          action: "",
          status: "Đã hủy",
          button: ["Mua lại", "Xem thông tin hoàn tiền"],
        };
      default:
        return {
          action: "",
          status: "Chờ xử lý",
          button: ["Đánh giá", "Mua lại"],
        };
    }
  };

  const { action, status } = handleOrderInfo();
  return (
    <div className="bg-white">
      {isFirst && (
        <div className="flex gap-1 justify-end pr-5 pt-2 xs:text-[10px] xs:flex xs:flex-col xs:items-end">
          <p>Mã đơn: {order_code}</p>
          <div className="flex xs:gap-1">
            {action && (
              <div className="flex gap-1">
                <span className="text-[#D9D9D9]">|</span>
                <p className="text-[#219653]">{action}</p>
                <span className="text-[#D9D9D9]">|</span>
              </div>
            )}
            <p className="text-[#CF5763] uppercase">{status}</p>
          </div>
        </div>
      )}
      <div
        className="px-5 xs:px-0 flex gap-4 border-b-[1px] border-[#E7E7E7] border-solid border-t-0 border-r-0 border-l-0 pb-5 xs:py-2"
        style={{ border: !isLast && "none" }}
      >
        <Image
          src={image_url || ImageDefault}
          width={widthScreen > 576 ? 96 : 70}
          height={widthScreen > 576 ? 96 : 70}
          className="rounded-lg"
        />
        <div className="flex flex-col justify-between text-[16px] xs:text-[14px] flex-1">
          <div className="font-medium xs:pr-4">
            <span className="xs:line-clamp-2">{name}</span>
          </div>
          <div className="xs:flex xs:items-center xs: gap-2">
          <div className="flex justify-between">
            <p className="text-[18px] xs:text-[14px] text-[#CF5763]">
              {formatNumber(item_price)}đ
            </p>
          </div>
          <p className="xs:text-[12px]">Số lượng: {quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  isFirst: PropTypes.bool.isRequired,
};
