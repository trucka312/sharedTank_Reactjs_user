import styled from "styled-components";
import { formatPrice } from "../../../helper";
import { Link } from "react-router-dom";

const OrderCompletedItemStyle = styled.div`
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
        color: #28a745;
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
export default function OrderCompletedItem(props) {
  const { item } = props;
  console.log("item", item);
  return (
    <OrderCompletedItemStyle>
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
            <span className="order-status">Đã hoàn thành</span>
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
          {/* </div>
            );
          })} */}
        </div>
        <div className="totalPrice-container">
          <span>Tổng tiền:</span>
          <span className="totalPrice">{formatPrice(item.total_final)}</span>
        </div>
      </div>
    </OrderCompletedItemStyle>
  );
}
