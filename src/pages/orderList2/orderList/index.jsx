import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useOrderStore } from "../../../store/orderStore";
import { formatNumber } from "../../../utils";
import Skeleton from "./Skeleton";
import OrderItem from "./orderItem";
import { getToken } from "../../../utils/auth";
import { constants } from "../../../constants";

export default function OrderList() {
  const navigate = useNavigate();
  const { loading, allOrderList } = useOrderStore();

  function handlePaymentRequest(order_code, payment_method_id) {
    var linkback =
      window.location.protocol +
      "//" +
      window.location.host +
      "/don-hang?active=COMPLETED";
    const url = `${constants.API_PATH_DEV}/pay/${order_code}?link_back=${linkback}`;

    const token = getToken();
    if (payment_method_id == 2) {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "customer-token": token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (token) window.location.href = "/don-hang";
          else window.location.href = "/";
        })
        .catch((err) => {
          if (token) window.location.href = "/don-hang";
          else window.location.href = "/";
        });
    } else {
      var intervalID, childWindow;
      childWindow = window.open(url, "", "width=700,height=500");
      function checkWindow() {
        if (childWindow && childWindow.closed) {
          window.clearInterval(intervalID);
          if (token) window.location.href = "/don-hang";
          else window.location.href = "/";
        }
      }
      var intervalID = window.setInterval(checkWindow, 500);
    }
  }

  if (loading) return <Skeleton />;

  return (
    <div className="min-h-[218px]">
      {allOrderList && allOrderList.length ? (
        allOrderList.map((item) => {
          const {
            id,
            order_code,
            total_final,
            payment_method_id,
            payment_status_code,
          } = item;
          return (
            <div key={id}>
              {item.line_items_at_time.map((product, index) => {
                const { id } = product;
                const isLast = item.line_items_at_time.length - 1 === index;
                const isFirst = index === 0;
                return (
                  <OrderItem
                    key={id}
                    order={item}
                    product={product}
                    isLast={isLast}
                    isFirst={isFirst}
                  />
                );
              })}
              <div className="flex gap-4 pt-6 pb-4 px-5 xs:px-0 xs:pr-4">
                <div className="w-[96px] xs:hidden"></div>
                <div className="flex justify-between flex-1 items-center text-[14px]">
                  <p>
                    Thành tiền:{" "}
                    <span className="font-medium text-[#CF5763] text-[20px] xs:text-[14px] xs:font-semibold">
                      {formatNumber(total_final)}đ
                    </span>
                  </p>
                  <div className="flex gap-2">
                    {/* <Button type="primary" className="min-w-[130px] h-[40px]">
              {button[0]}
            </Button>
            <Button className="min-w-[130px] h-[40px]">{button[1]}</Button> */}
                    {payment_status_code === "UNPAID" && (
                      <Button
                        className="min-w-[130px] h-[40px] text-[#fff] bg-[#CF5763]"
                        onClick={() =>
                          handlePaymentRequest(order_code, payment_method_id)
                        }
                      >
                        Thanh toán
                      </Button>
                    )}
                    <Button
                      className="min-w-[130px] h-[40px] xs:text-[12px]"
                      onClick={() => navigate(`/don-hang/${order_code}`)}
                    >
                      <EyeOutlined /> Xem chi tiết
                    </Button>
                  </div>
                </div>
              </div>
              <div className="h-[8px] bg-[#f7f8f9]"></div>
            </div>
          );
        })
      ) : (
        <p className="text-center pt-20">không có đơn hàng nào</p>
      )}
    </div>
  );
}
