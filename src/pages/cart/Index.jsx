import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import { useCartStore } from "../../store/cartStore";
import { formatPrice } from "../../utils";
import GoBackIcon from "../../assets/images/zin/goBack.svg";
import CartEmpty from "../../assets/images/zin/cart-empty.png";
import { useUserStore } from "../../store/userStore";

const ProductInCart = React.lazy(() => import("./child/ProductInCart"));
const Loading = React.lazy(() => import("../../components/loading/Index"));

const CartPageStyles = styled.div`
  .progress_main {
    background: white;
    padding: 0.5rem;
    margin-top: 0.5rem;
    height: 100px;
    position: relative;
  }
  .progress_main .cart-header {
    width: 1200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
  }
  .progress_main .title {
    color: #20409a;
    padding-top: 13px;
    padding-left: 20px;
    line-height: 40px;
    font-size: 30px;
  }
  .progress_main .form {
    line-height: 45px;
    padding: 0 10px;
    height: 45px;
    border: 2px solid #20409a;
    position: relative;
    width: 620px;
  }
  .progress_main .form input {
    width: 100%;
    font-size: 15px;
  }
  .progress_main .form button {
    width: 80px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #20409a;
  }
  .progress_main .form button img {
    width: 20px;
    height: 20px;
  }
  .bg_progress {
    padding: 40px;
    background-color: white;
    border-radius: 10px;
  }
  .cart-container {
    width: 100%;
    margin: 20px auto;
  }
  .product-image {
    display: flex;
    position: relative;
  }
  .progress_content {
    width: 60%;
    margin: 0 auto;
    .progress_info {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      color: #212121;
    }
    .progress {
      display: flex;
      justify-content: space-between;
      position: relative;
      width: 90%;
      margin: 35px auto 0;
      height: 2px;
      background-color: #e1e1e1;
      .progress_percent {
        position: absolute;
        top: 0;
        height: 100%;
      }
      .progress_item {
        width: 40px;
        height: 40px;
        border-radius: 100rem;
        overflow: hidden;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 6px 0 rgb(0 0 0 / 10%);
        &:nth-child(2) {
          position: absolute;
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
        }
        &:nth-child(3) {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &:nth-child(4) {
          position: absolute;
          top: 0;
          left: 100%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .content {
    column-gap: 20px;
    .box-cart {
      border: none;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      .info-shop {
        height: 60px;
        box-sizing: border-box;
        padding: 0 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
        margin: 12px 0;
        img {
          width: 20px;
          height: 20px;
          margin-left: 5px;
          cursor: pointer;
        }
      }
      .item {
        padding: 15px 20px;
      }
      .list-order {
        background-color: white;
        border-bottom: 1px solid #ebebeb;
        padding: 1.25rem 1.5625rem;
        text-transform: uppercase;
        font-size: 16px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
      }
      .cart-item {
        padding: 1.25rem 1.5625rem;
        &:last-child {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        .distributes {
          & > div {
            border-radius: 4px;
          }
          button {
            cursor: pointer;
          }
        }
      }
    }
  }
  .paymentProcess {
    display: flex;
    justify-content: center;
    column-gap: 40px;
    margin: 20px 0 40px;
    .paymentProcess_btn {
      height: 40px;
      width: 220px;
      background-color: white;
      border-radius: 100rem;
      box-shadow: 0 0 13px 0 rgb(0 0 0 / 8%);
      button {
        cursor: pointer;
        display: flex;
        column-gap: 10px;
        font-weight: 700;
        align-items: center;
        width: 100%;
        height: 100%;
        justify-content: center;
      }
      &:first-child {
        button {
          color: #999;
        }
      }
      &:last-child {
        button {
          color: white;
        }
      }
    }
  }
  .order-info-mobile {
    width: 100%;
  }
  .shopee-button-solid {
    transition: all 0.3s;
    &:hover {
      transform: scale(1.2);
    }
  }
  .header-mobile {
    display: none;
  }
  .modal-showPopup {
    display: flex !important;
    transition: all 0.3s;
  }
  .product-info-mobile {
    display: none;
  }
  .order-deliveryInfo,
  .order-deliveryInfo form {
    .order-left {
      margin-left: 0 !important;
      padding-left: 0.5rem !important;
    }
  }
  .head {
    margin-top: 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
    border-radius: 0.125rem;
    overflow: hidden;
    border-radius: 3px;
    height: 55px;
    font-size: 14px;
    background: #fff;
    color: #888;
    padding: 0 20px;
  }
  .check-box {
    flex-direction: row-reverse;
    min-width: 40px;
    box-sizing: border-box;
  }
  .product {
    color: rgba(0, 0, 0, 0.8);
    width: 300px;
  }
  .distribute {
    width: 300px;
    position: relative;
    .distribute-container {
      width: 400px;
      border-color: #00000017;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.09);
      background-color: #fff;
      position: absolute;
      top: 25px;
      right: 0;
      z-index: 1;
    }
  }
  .price {
    text-align: center;
    width: 140px;
  }
  .quantity {
    text-align: center;
    width: 15.4265%;
    .input-quantity {
      display: flex;
      border: 1px solid whitesmoke;
      width: 50%;
      margin: auto;
      button {
        font-size: 16px;
        width: 2em;
        height: 2em;
        background: whitesmoke;
      }
    }
  }
  .total {
    width: 10.43557%;
    text-align: center;
  }
  .operation {
    width: 12.70417%;
    text-align: center;
  }
  .zoXdNN {
    display: flex;
    align-items: center;
    padding: 20px;
    width: 100%;
    .delete {
      cursor: pointer;
    }
    .delete:hover {
      color: #20409a;
    }
  }
  .eUrDQm {
    box-sizing: border-box;
    position: relative;
    flex-direction: column;
    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
    }
  }
  .order-info {
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 50%;
    width: 1200px;
    transform: translateX(-50%);
    box-shadow: 0px -5px 10px 0px lightgray;
    display: grid;
    grid-template-columns: 60% auto auto;
    img {
      width: 20px;
      height: 20px;
    }
    .voucher {
      grid-column-start: 2;
      display: flex;
      align-items: center;
      padding: 0.75rem 0;
      .text {
        margin: 0 5px;
        font-size: 16px;
      }
    }
    .choose-voucher {
      text-transform: capitalize;
      color: #20409a;
      padding: 0.75rem 0;
      cursor: pointer;
      font-size: 16px;
    }
    .coins {
      padding: 16px 0 15px;
      display: flex;
    }
    .coins > div {
      line-height: 21px;
      margin: 0 5px;
    }
    .coin-can-use {
      align-items: center;
      display: flex;
      justify-content: end;
    }
    .last-line {
      padding: 12px 0;
      display: flex;
      align-items: center;
    }
    .last-line > div {
      cursor: pointer;
    }
    .total-money {
      display: flex;
      align-items: center;
      font-size: 16px;
    }
    .buy {
      cursor: pointer;
      text-transform: capitalize;
      font-weight: 300;
      height: 2.5rem;
      box-sizing: border-box;
      font-size: 0.875rem;
      border-radius: 2px;
      width: 13.125rem;
      background: #20409a;
      text-align: center;
      line-height: 2.5rem;
      button {
        color: white;
        font-size: 0.875rem;
      }
    }
  }
  .order-info > div {
    border-bottom: 1px dashed rgba(0, 0, 0, 0.09);
  }
`;

function CartPage() {
  const navigate = useNavigate();
  const { getCartInfo, cartInfo, updateCart, cartDataStatus } = useCartStore();
  const {getBadges} = useUserStore()

  useEffect(() => {
    getCartInfo();
  }, []);

  const onSuccess = () => {
    // getCartInfo();
    getBadges()
  };
  
  const handlePaymentProcess = () => {
    if (cartInfo.line_items.length > 0) {
      navigate("/thanh-toan");
    }
  };

  const handleUpdateCart = (data) => {
    updateCart(data, onSuccess);
  };

  return (
    <React.Fragment>
      {cartDataStatus ? (
        <Loading />
      ) : (
        <div className="bg-[#f7f8f9] min-h-screen">
          <div>
            <div className="w-full mx-auto max-w-[1300px] pt-[20px] px-[16px]">
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#CF5763",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  Giỏ hàng
                </div>
              </div>
              {cartInfo?.line_items?.length > 0 ? (
                <CartPageStyles className="cart-page">
                  <div className="cart-container">
                    <>
                      <div className="row content flex xs:flex-col">
                        <div
                          className="cart-items-list w-[60%] xs:w-full"
                        >
                          <div className="box-cart">
                            {cartInfo.line_items.map((item, key) => {
                              return (
                                <div
                                  key={key}
                                  style={{
                                    background: "white",
                                  }}
                                >
                                  <div>
                                    <ProductInCart
                                      v={item}
                                      handleUpdateCart={handleUpdateCart}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div
                          style={{
                            backgroundColor: "#fff",
                            padding: "16px",
                            height: "max-content",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "5px",
                          }}
                          className="w-[40%] xs:fixed xs:bottom-0 xs:left-0 xs:w-full xs:z-10 xs:shadow-2xl xs:rounded-0 rounded-[5px] gap-[30px] xs:gap-3"
                        >
                          <div style={{ fontSize: "16px", fontWeight: "600" }}>
                            Tổng tiền
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>{cartInfo.line_items.length} sản phẩm</div>
                            <div style={{ color: "#CF5763" }}>
                              {formatPrice(cartInfo.total_final)}
                            </div>
                          </div>
                          <div
                            style={{
                              color: "#fff",
                              backgroundColor: "#CF5763",
                              textAlign: "center",
                              padding: "10px 0",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                            onClick={handlePaymentProcess}
                          >
                            Tạo đơn
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                </CartPageStyles>
              ) : (
                <React.Fragment>
                  <CartPageStyles className="h-[600px] flex flex-col items-center justify-center">
                    <div className="cart-empty">
                      <img
                        src={CartEmpty}
                        alt="cart-empty"
                        style={{
                          width: "150px",
                        }}
                      />
                    </div>
                    <div
                      className="h9wsC4"
                      style={{
                        marginTop: 0,
                        marginBottom: "10px",
                      }}
                    >
                      Giỏ hàng của bạn còn trống!
                    </div>
                    <Link to="/">
                      <button className="bg-[#CF5763] w-[200px] cursor-pointer rounded-[10px] border-none text-[#fff] py-[10px]">
                        Mua ngay
                      </button>
                    </Link>
                  </CartPageStyles>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default CartPage;
