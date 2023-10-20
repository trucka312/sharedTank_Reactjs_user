import { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { formatPrice } from "../../../helper";
import { cartActions } from "../../../actions/cartActions";

const OrderPendingItemStyle = styled.div`
  .order-container {
    background-color: #fff;
    padding: 0 15px;
    margin: 15px 0;
    .order-pending-info {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #00000017;
      padding: 20px 0;
      align-items: center;
      .payment-btn {
        padding: 10px;
        border-radius: 6px;
        cursor: pointer;
      }
      .order-status {
        color: #757575;
      }
    }
    .shop-order-container {
      border-bottom: 1px solid #00000017;
      .shop-order-info {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        .shop-order-name {
          font-weight: 500;
          font-size: 15px;
        }
      }
    }
    .product-container {
      display: flex;
      justify-content: space-between;
      margin: 15px 0;
      .product-info {
        display: flex;
        align-items: center;
        .product-img-container {
          width: 93px;
          height: 93px;
          margin-right: 7px;
          .product-img {
            width: 100%;
            height: 100%;
            background: url("/img/default_product.jpg") 0% 0% / contain;
          }
        }
        .product-name {
          font-weight: 500;
        }
      }
      .product-price-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .product-price {
          color: #3147f3;
        }
      }
    }
    .totalPrice-container {
      display: flex;
      justify-content: flex-end;
      padding: 20px 0;
      font-size: 15px;
      .totalPrice {
        color: #3147f3;
        margin-left: 5px;
        font-size: 24px;
      }
    }
  }
`;

export default function OrderPendingItem(props) {
  const [countdown, setCountDown] = useState();
  const { item } = props;

  useEffect(() => {
    let countDownInterval;

    //Thời gian đặt hàng
    const inputTimestamp = item.created_at;
    const formattedDateTime = moment(inputTimestamp).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    const startTime = moment(formattedDateTime, "YYYY-MM-DD HH:mm:ss");

    //Thời gian đặt hàng + thêm 30p
    const futureTime = startTime.add(30, "minutes");

    //Thời gian hiện tại
    const currentTime = moment();

    //Chênh lệch giữa thời gian hiện tại và thời gian đặt hàng
    const timeDifferenceInSeconds = futureTime.diff(currentTime, "seconds");
    if (timeDifferenceInSeconds >= 0) {
      countDownInterval = setInterval(() => {
        setCountDown(timeDifferenceInSeconds);
      }, 1000);
    } else {
      clearInterval(countDownInterval);
    }
    return () => {
      clearInterval(countDownInterval);
    };
  }, [countdown]);

  const duration = moment.duration(countdown, "seconds");
  const formattedTime = moment.utc(duration.asMilliseconds()).format("mm:ss");

  const handlePurchase = (order_code, payment_method_id) => {
    cartActions.handlePaymentRequest(order_code, payment_method_id);
  };

  return (
    <OrderPendingItemStyle>
      <div className="order-container">
        <div className="order-pending-info">
          <button
            className="payment-btn"
            onClick={() =>
              handlePurchase(item.order_code, item.payment_method_id)
            }
            style={{
              backgroundColor: countdown > 0 ? "#20409a" : "#eeeeee",
              color: countdown > 0 ? "#fff" : "#ababbd",
            }}
            disabled={countdown <= 0}
          >
            <i className="fas fa-clock"></i> {formattedTime} Thanh toán
          </button>
          <div style={{ fontWeight: "500" }}>
            {item.order_code} |{" "}
            {countdown > 0 && <span className="order-status">Chờ xử lý</span>}
          </div>
        </div>
        <div>
          {item?.orders.map((order, index) => {
            return (
              <div key={index} className="shop-order-container">
                <div className="shop-order-info">
                  <div className="shop-order-name">
                    {order.store.name}{" "}
                    <span style={{ fontSize: "13px" }}>
                      {"("}
                      {order.branch.name}
                      {")"}
                    </span>
                    <Link to={`/nha-cung-cap?id=${order.store.id}`}>
                      <i
                        className="fas fa-store"
                        style={{ marginLeft: "7px", color: "#0000ff" }}
                      ></i>
                    </Link>
                  </div>
                  <div style={{ fontWeight: "500" }}>{order.order_code}</div>
                </div>
                <Link to={`/don-hang/${order.order_code}`}>
                  <div>
                    {order.line_items_at_time.map((product, index) => {
                      return (
                        <div key={index} className="product-container">
                          <div className="product-info">
                            <div className="product-img-container">
                              <img
                                className="product-img"
                                src={product.image_url}
                                alt="product"
                              />
                            </div>
                            <div>
                              <div className="product-name">{product.name}</div>
                              <div>
                                <span>
                                  {product.distributes_selected[0].value}
                                </span>
                                <span>
                                  {product.distributes_selected[0]
                                    .sub_element_distributes &&
                                    `, ${product.distributes_selected[0].sub_element_distributes}`}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="product-price-container">
                            <div>x{product.quantity}</div>
                            <div className="product-price">
                              {formatPrice(product.item_price)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="totalPrice-container">
          <span>Tổng tiền:</span>
          <span className="totalPrice">{formatPrice(item.total_final)}</span>
        </div>
      </div>
    </OrderPendingItemStyle>
  );
}
