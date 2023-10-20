import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import Select from "react-select";

import { formatPrice } from "../../../utils";
import { useOrderStore } from "../../../store/orderStore";
import { getToken } from "../../../utils/auth";
import { constants } from "../../../constants";

const OrderSuccessWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
`;

export default function OrderSuccess(props) {
  const { orderInfo, paymentMethods } = props;
  const navigate = useNavigate();
  const { updatePaymentMethod, resetOrderInfo } = useOrderStore();
  const [buttonDisable, setButtonDisable] = useState(false);
  const [count, setCount] = useState(1800);
  const orderSuccessRef = useRef();
  const duration = moment.duration(count, "seconds");
  const formattedTime = moment.utc(duration.asMilliseconds()).format("m:ss");

  useEffect(() => {
    let countDown = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    if (count === 0) {
      setButtonDisable(true);
      clearInterval(countDown);
    }
    return () => {
      clearInterval(countDown);
    };
  }, [count]);

  useEffect(() => {
    return () => {
      resetOrderInfo();
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      orderSuccessRef.current &&
      !orderSuccessRef.current.contains(event.target)
    ) {
      resetOrderInfo();
      navigate("/don-hang");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const selectValue = () => {
    return paymentMethods.map((item) => {
      return {
        value: {
          payment_method_id: item.payment_method_id,
          payment_partner_id: item.id,
        },
        label: item.name,
      };
    });
  };

  const handleChangePaymentMethod = (paymentMethod) => {
    updatePaymentMethod(paymentMethod.value, orderInfo.order_code);
  };

  function handlePaymentRequest() {
    var linkback =
      window.location.protocol +
      "//" +
      window.location.host +
      "/don-hang?active=COMPLETED";
    const url = `${constants.API_PATH_DEV}/pay/${orderInfo.order_code}?link_back=${linkback}`;

    const token = getToken();
    if (orderInfo.payment_method_id == 2) {
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

  return (
    <OrderSuccessWrapper>
      <div
        className="w-[700px] bg-[#fff] rounded-[10px] py-[30px]"
        ref={orderSuccessRef}
      >
        <div className="text-center">
          <i className="fas fa-check-circle text-[#9ac657] text-[50px] my-[7px]"></i>
          <div className="font-semibold">Đặt hàng thành công</div>
        </div>
        <div className="p-[30px] ">
          <div className="leading-[30px]">
            <div>
              <h4>Chào {orderInfo.customer_name}</h4>
              <p>
                Bạn đã đặt hàng thành công vui lòng đợi xác nhận từ cửa hàng.
              </p>
            </div>
            <div className="order-infoContent">
              <div>
                <span>Mã đơn hàng: </span>
                <span>{orderInfo.order_code}</span>
              </div>
              <div className="order-selectedPayment">
                <span>Phương thức thanh toán</span>
                <Select
                  options={selectValue()}
                  onChange={(value) => handleChangePaymentMethod(value)}
                  placeholder={orderInfo.payment_partner_name}
                />
              </div>
              <div>
                <span>Thời gian dự kiến giao hàng: </span>
                <span>3 - 4 ngày</span>
              </div>
              <div>
                <span>Tổng thanh toán: </span>
                <span className="text-[#CF5763]">{formatPrice(orderInfo.total_final)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span>Tình trạng: </span>
                  <span
                    style={{
                      color: "#20409a",
                    }}
                  >
                    {orderInfo.payment_status_name}
                  </span>
                </div>
                <button
                  onClick={handlePaymentRequest}
                  style={{
                    background: buttonDisable ? "#eeeeee" : "#cf5763",
                    color: buttonDisable ? "#ababab" : "#fff",
                    border: "none",
                    padding: "7px 15px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  disabled={buttonDisable}
                >
                  {formattedTime} Thanh toán ngay
                </button>
              </div>
            </div>
          </div>
          <div className="order-btnBottom">
            <p>
              Mọi thông tin về đơn hàng sẽ được lưu lại, vui lòng kiểm tra trên
              hệ thống để biết thêm chi tiết. Cảm ơn bạn đã tin tưởng và giao
              dịch tại hệ thống
            </p>
            <div className="row order-btnBottomContent flex justify-center gap-[20px] mt-[20px]">
              <Link to="/">Tiếp tục mua sắm</Link>
              <Link
                // onClick={handleChangePage}
                to="/don-hang"
                style={{
                  color: "#20409a",
                  borderColor: "#20409a",
                }}
              >
                Chi tiết đơn hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </OrderSuccessWrapper>
  );
}
