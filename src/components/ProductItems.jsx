import { Link } from "react-router-dom";
import styled from "styled-components";

import { constants as c } from "../constants";
import { getToken } from "../utils/auth";
import CartIcon from "../assets/images/zin/add-to-cart.svg";
import DefaultImg from "../assets/images/image-default.jpg";
import { useCartStore } from "../store/cartStore";
import { useUserStore } from "../store/userStore";
import { toast } from "react-toastify";

const ProductItemStyle = styled.div`
  .product-item {
    background-color: #fff;
    border-radius: 6px;
    padding: 7px;
    position: relative;
    &:hover {
      transform: translateY(-2px);
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      .image-container .like-icon {
        transform: translateX(-10px);
        opacity: 1;
        padding: 0 5px;
        border-radius: 50%;
      }
    }
    .image-container {
      .like-icon {
        background-color: #fff;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        opacity: 0;
        transition: all 0.5s;
        transform: translateX(0);
      }
    }
    .product-item-content {
      padding: 7px;
      .star-rating {
        display: flex;
        margin-top: 30px;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
      }
      .product-item-name {
        height: 30px;
        font-size: 12px;
        color: #323c42;
        font-weight: 700;
      }
      .product-item-price {
        line-height: 50px;
        color: #fba001;
        font-size: 16px;
        color: #cf5763;
      }
      .sold-and-view {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: #999999;
        font-weight: 500;
      }
    }
  }
`;
export default function ProductItems(props) {
  const { product } = props;
  const { addToCart } = useCartStore();
  const { getBadges } = useUserStore();
  const token = getToken();
  const maxStars = 5;

  const handleAddToCart = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      getBadges();
    };
    const data = {
      product_id: product.id,
      quantity: 1,
    };
    if (token) {
      addToCart(data, onSuccess);
    } else {
      toast.error("Vui lòng đăng nhập");
    }
  };

  const formatPrice = (price) => {
    const number = Number(price);
    if (isNaN(number)) {
      return "Invalid Price";
    }
    return number.toLocaleString("vi-VN");
  };

  return (
    <ProductItemStyle>
      <Link to={`/san-pham/${product.slug}-${product.id}`}>
        <div className="product-item" style={{ width: "100%" }}>
          <div className="image-container">
            <img
              src={
                product?.images[0]?.image_url
                  ? product?.images[0]?.image_url
                  : DefaultImg
              }
              style={{
                width: "100%",
                height: "200px",
                border: "none",
                objectFit: "cover",
                backgroundColor: "#d9d9d9",
              }}
            ></img>
          </div>
          <div className="product-item-content">
            <div className="product-item-name">{product.name}</div>
            <div
              className="product-item-price"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ fontWeight: "500" }}>
                {formatPrice(product.retail_price)}đ
              </div>
              <img src={CartIcon} alt="cart-icon" onClick={handleAddToCart} />
            </div>
            {token && (
              <div style={{ color: "#6C0D0F" }}>
                Hoa hồng:{" "}
                {formatPrice(Math.ceil(product.price_commission_role))}đ
              </div>
            )}

            <div className="star-rating">
              <div>
                {[...Array(maxStars)].map((_, index) => (
                  <i
                    key={index}
                    className="fas fa-star"
                    style={{
                      fontSize: "10px",
                      color: product.stars >= index + 1 ? "#ffce3d" : "#f2f0f0",
                    }}
                  ></i>
                ))}
              </div>
              <div>Đã bán: {product.sold}</div>
            </div>
          </div>
        </div>
      </Link>
    </ProductItemStyle>
  );
}
