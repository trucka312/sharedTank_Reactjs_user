import styled from "styled-components";

import DefaultProduct from "../../../assets/images/image-default.jpg"
import { formatPrice } from "../../../utils";

const ListOrderStyle = styled.div`
  .order-list {
    background-color: #fff;
    .voucher-container {
      display: flex;
      border: 1px dashed #00000017;
      padding: 18px 30px;
      .shop-voucher-text {
        flex: 6;
        display: flex;
        align-items: center;
        justify-content: end;
      }
    }
  }
  .quantity-mobile {
    display: none;
  }
  .change-delivery {
    cursor: pointer;
    color: #20409a;
  }
  .delivery-text {
    color: #00bfa5;
  }
  .delivery-name {
    text-align: center;
    padding-left: 0 !important;
  }
  .money {
    font-size: 20px;
  }
  .voucher-code {
    flex: 4;
    text-align: end;
    position: relative;
  }
  .more-btn {
    display: none;
  }
  @media only screen and (max-width: 600px) {
    .delivery-price {
      text-align: end;
    }
    .order-list {
      margin: 20px 0;
      .item {
        .zoXdNN {
          padding: 15px;
        }
      }
      .quantity-mobile {
        display: block;
      }
      .TyNN8t {
        display: block;
        padding: 0;
        position: unset;
        transform: unset;
        padding-top: 15px;
        margin-left: 15px;
        color: #8b8a8a;
        font-size: 12px;
        line-height: 17px;
      }
      .transport {
        flex-direction: column-reverse;
        padding: 0 15px;
        .delivery {
          width: 100% !important;
          border-left: none !important;
          justify-content: space-between;
        }
      }
      .voucher-container {
        justify-content: space-between;
        padding: 18px 15px;
        .shop-voucher-text {
          justify-content: start;
          flex: unset;
        }
      }
      .change-delivery {
        display: none;
      }
      .delivery-text {
        display: none;
      }
      .item {
        .total {
          width: unset !important;
          font-size: 13px;
          color: #8b8a8a;
        }
      }
      .delivery-name {
        text-align: unset;
      }

      .note {
        width: 100% !important;
        padding: 16px 0 !important;
      }
      .money {
        padding: 16px 15px 20px !important;
        justify-content: space-between !important;
        font-size: 16px !important;
        .total {
          width: unset !important;
          margin-right: 0 !important;
          font-size: 16px !important;
        }
      }
    }
    .voucher-code {
      flex: unset;
    }
    .more-btn {
      display: inline-block;
      margin-left: 8px;
      cursor: pointer;
    }
  }
`;

export default function ListOrder(props) {
  const { item } = props;
  return (
    <ListOrderStyle>
      <div className="order-list">
        <div>
          <div style={{ display: "flex", margin: "20px 0" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    item.product.images.length > 0
                      ? item.product.images[0].image_url
                      : DefaultProduct
                  }
                  alt="cart_accessibility_product_image"
                  style={{
                    borderRadius: "6px",
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    marginLeft: "10px",
                  }}
                >
                  <p style={{ fontWeight: "500", fontSize: "15px" }}>
                    {item.product.name}
                  </p>
                  <p style={{ color: "#CF5763", fontWeight: "500" }}>
                    {formatPrice(item.product.retail_price * item.quantity)}
                  </p>
                  <p>Số lượng: {item.quantity}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ListOrderStyle>
  );
}
