import styled from "styled-components";
import { useState } from "react";
import { formatPrice } from "../../../helper";
import ShipperDeliveredPopup from "./ShipperDeliveredPopup";
import { Link } from "react-router-dom";

const ShipperDeliveredItemStyle = styled.div`
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
      justify-content: space-between;
      padding: 20px 0;
      font-size: 15px;
      align-items: center;
      .payment-btn {
        background-color: #20409a;
        color: #fff;
        padding: 10px 10px;
        margin-right: 7px;
        cursor: pointer;
        border-radius: 6px;
      }
      .totalPrice {
        color: #3147f3;
        margin-left: 5px;
        font-size: 24px;
      }
    }
  }
`;

export default function ShipperDeliveredItem(props) {
  const [showPopup, setShowPopup] = useState(false);
  const { item } = props;

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <ShipperDeliveredItemStyle>
      {showPopup && (
        <ShipperDeliveredPopup
          order_code={item.order_code}
          handleClosePopup={handleClosePopup}
        />
      )}
      <div className="order-container">
        <div className="order-pending-info">
          <div>
            {item.store.name}
            <span style={{ fontSize: "13px", marginLeft: "6px" }}>
              {"("}
              {item.branch.name}
              {")"}
            </span>
            <Link to={`/nha-cung-cap?id=${item.store.id}`}>
              <i
                className="fas fa-store"
                style={{ marginLeft: "7px", color: "#0000ff" }}
              ></i>
            </Link>
          </div>
          <div style={{ fontWeight: "500" }}>
            {item.order_code} |{" "}
            <span style={{ color: "#28a745" }}>Đã giao tới</span>
          </div>
        </div>
        <div>
          <Link to={`/don-hang/${item.order_code}`}>
            <div className="shop-order-container">
              <div>
                {item.line_items_at_time.map((product,index) => {
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
                            <span>{product.distributes_selected[0].value}</span>
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
            </div>
          </Link>
        </div>

        <div className="totalPrice-container">
          <button className="payment-btn" onClick={() => setShowPopup(true)}>
            Xác nhận đã nhận hàng
          </button>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Tổng tiền:</span>
            <span className="totalPrice">{formatPrice(item.total_final)}</span>
          </div>
        </div>
      </div>
    </ShipperDeliveredItemStyle>
  );
}
