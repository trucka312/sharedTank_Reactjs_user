import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spin } from "antd";

import ListOrder from "./child/ListOrder";
import { formatPrice, toastFailure } from "../../utils";
import { useOrderStore } from "../../store/orderStore";
import { useCartStore } from "../../store/cartStore";
import { order } from "../../services/order";
import AddressPopup from "./child/AddressPopup";
import LocationOrder from "../../assets/images/zin/location-order.svg";
import OrderInfoIcon from "../../assets/images/zin/order-info.svg";
import PaymentMethodIcon from "../../assets/images/zin/payment-method.svg";
import TransportIcon from "../../assets/images/zin/transport-order.svg";
import PaymentInfo from "../../assets/images/zin/payment-info.svg";
import OrderSuccess from "./child/OrderSuccess";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { LoadingOutlined } from "@ant-design/icons";

const OrderStyles = styled.div`
  background-color: #f7f8f9;
  padding-top: 20px;
  .main-order {
    .payment-method-text {
      font-size: 1.125rem;
      display: flex;
      align-items: center;
    }
    .address-cart {
      padding: 20px;
      .title {
        display: flex;
        align-items: center;
        font-size: 1.125rem;
        color: #20409a;
        margin-bottom: 20px;
        img {
          width: 20px;
          height: 19px;
        }
        p {
          margin-left: 5px;
          margin-top: 5px;
        }
      }
    }
    .cart-items-list .box-cart .transport {
      background-color: #fafdff;
      border-bottom: 1px dashed rgba(0, 0, 0, 0.09);
      border-top: 1px dashed rgba(0, 0, 0, 0.09);
      display: flex;
      .note {
        padding: 16px 30px;
        display: flex;
        line-height: 40px;
        width: 500px;
      }
      .delivery {
        display: flex;
        border-left: 1px dashed rgba(0, 0, 0, 0.09);
        align-items: center;
        padding: 16px 0;
        gap: 10px;
        width: 62%;
      }
      .delivery > div {
        width: 25%;
        padding-left: 20px;
      }
    }
    .money {
      background-color: #fafdff;
      display: flex;
      padding: 16px 30px 20px;
      justify-content: flex-end;
      .total {
        margin-left: 20px;
        margin-right: 20px;
        font-size: 20px;
        color: #20409a;
      }
    }
    .discount {
      margin-top: 12px;
      background-color: white;
      .voucher {
        display: flex;
        align-items: center;
        padding: 28px 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
        justify-content: space-between;
        img {
          width: 24px;
          height: 24px;
        }
        p {
          line-height: 24px;
          margin-left: 5px;
        }
      }
      .coins {
        display: flex;
        align-items: center;
        padding: 28px 30px;
        justify-content: space-between;
        img {
          width: 24px;
          height: 24px;
        }
        p {
          line-height: 24px;
        }
      }
      .coins > div {
        display: flex;
      }
      .text {
        font-size: 18px;
        font-weight: 400;
        margin: 0 8px;
      }
    }
  }
`;

export default function OrderInfo() {
  const {
    // userAddress,
    // getUserAddress,
    getPaymentMethod,
    paymentMethods,
    getListShipper,
    listShipper,
    orders,
    orderInfo,
    resetOrder,
    orderLoading,
  } = useOrderStore();
  const { listShippingAddress, getAllShippingAddress, reset, getBadges } =
    useUserStore();
  const { getCartInfo, cartInfo, cartDataStatus } = useCartStore();
  const navigate = useNavigate();
  const [listShipmentOption, setListShipmentOption] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [shipInfomation, setShipInfomation] = useState({});
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});
  const cowc_id = localStorage.getItem("cowc_id");
  //Kiểm tra nếu không có gì trong giỏ thì bay về trang giỏ hàng
  useEffect(() => {
    if (cartDataStatus === false && cartInfo?.line_items?.length === 0) {
      navigate("/gio-hang");
      toastFailure("Không có sản phẩm nào để thanh toán");
    }
  }, [cartDataStatus]);

  //Call api lấy địa chỉ, giỏ hàng và phương thức thanh toán
  useEffect(() => {
    // getUserAddress();
    getAllShippingAddress();
    getCartInfo();
    getPaymentMethod();
    return () => {
      resetOrder();
      reset();
    };
  }, []);

  useEffect(() => {
    if (paymentMethods.length > 0) {
      setPaymentMethod(paymentMethods[0]);
    }
  }, [paymentMethods]);

  useEffect(() => {
    if (listShippingAddress?.length > 0) {
      const defaultAddress = listShippingAddress.find(
        (item) => item.is_default
      );
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
      getListShipper({ id_address_customer: defaultAddress?.id });
    }
  }, [listShippingAddress]);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 17,
      }}
      spin
    />
  );

  function handleChangeNote(e) {
    setNote(e.target.value);
  }
  // function handlePaymentSelect(info) {
  //   setPaymentMethod(info);
  // }

  function handleOrder() {
    const orderInfoData = {
      customer_note: note,
      partner_shipper_id: shipInfomation.partner_shipper_id,
      customer_address_id: selectedAddress.id,
      total_shipping_fee: shipInfomation.total_shipping_fee,
      agency_by_customer_id: null,
      is_use_points: null,
      is_use_balance_collaborator: null,
      phone: selectedAddress.phone,
      name: selectedAddress.name,
      address_detail: selectedAddress.address_detail,
      district: selectedAddress.district_name,
      wards: selectedAddress.wards_name,
      province: selectedAddress.province_name,
      payment_method_id: paymentMethod.payment_method_id,
      payment_partner_id: paymentMethod.id,
      ship_name: shipInfomation.ship_name,
      ship_speed_code: shipInfomation.ship_speed_code,
      description_shipper: shipInfomation.description_shipper,
      code_voucher: "",
      order_from: 0,
      collaborator_by_customer_id: parseInt(cowc_id),
    };
    if (Object.keys(selectedAddress).length === 0) {
      toast.error("Vui lòng chọn địa chỉ", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (Object.keys(shipInfomation).length === 0) {
      toast.error("Vui lòng chọn đơn vị vận chuyển", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const onSuccess = () => {
        getBadges();
      };
      orders(orderInfoData, onSuccess);
    }
  }

  useEffect(() => {
    if (listShipper.length > 0 && selectedAddress.id) {
      setListShipmentOption([]);
      const listShipperId = listShipper.map((item) => item.partner_id);
      for (let i = 0; i < listShipperId.length; i++) {
        order
          .getListShipmentFee(listShipperId[i], {
            id_address_customer: selectedAddress.id,
          })
          .then((res) => {
            return res.data.data;
          })
          .then((data) => {
            setListShipmentOption((prevOption) => [
              ...prevOption,
              {
                shipmentName: data.name,
                listOption: data.fee_with_type_ship,
                partner_id: data.partner_id,
              },
            ]);
          });
      }
    }
  }, [listShipper]);

  const renderListShipment = () => {
    const filterShipment = listShipmentOption.filter(
      (item) => item.partner_id !== undefined
    );
    return filterShipment;
  };

  const handleClosePopup = () => {
    setShowAddress(false);
  };
  return (
    <OrderStyles>
      {showAddress && (
        <AddressPopup
          listShippingAddress={listShippingAddress}
          setSelectedAddress={setSelectedAddress}
          handleClosePopup={handleClosePopup}
          getListShipper={getListShipper}
        />
      )}
      {console.log(orderInfo,orderLoading)}
      {Object.keys(orderInfo).length > 0 && orderLoading === false && (
        <OrderSuccess orderInfo={orderInfo} paymentMethods={paymentMethods} />
      )}
      <div className="max-w-[1300px] xs:px-4 mx-auto mb-[20px] text-[16px] text-[#cf5763] font-semibold">
        Thanh toán
      </div>
      <div
        className="main-order max-w-[1300px] mx-auto xs:flex-col xs:px-4 pb-5 xs:pb-0"
        style={{ display: "flex", gap: "20px" }}
      >
        <div className="w-[60%] xs:w-full">
          <div
            style={{
              background: "white",
              marginBottom: "20px",
              borderRadius: "6px",
            }}
          >
            <div className="address-cart" style={{ boxShadow: "0 1px 4px #00000012" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                  gap: "7px",
                }}
              >
                <img src={LocationOrder} />
                <p
                  style={{
                    color: "#CF5763",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Địa chỉ nhận hàng
                </p>
              </div>
              <div
                className="content"
                style={{ display: "flex", gap: 0, fontSize: "13px" }}
              >
                <div style={{ width: "calc(100% - 100px)" }}>
                  <div>
                    {Object.keys(selectedAddress).length > 0 && (
                      <div>
                        {selectedAddress?.name} | {selectedAddress?.phone} |{" "}
                        {selectedAddress?.address_detail},{" "}
                        {selectedAddress?.wards_name},{" "}
                        {selectedAddress?.province_name},{" "}
                        {selectedAddress?.district_name}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  onClick={() => setShowAddress(true)}
                  style={{
                    width: "100px",
                    cursor: "pointer",
                    textAlign: "end",
                    fontSize: "13px",
                    color: "#2F80ED",
                  }}
                >
                  Thay đổi
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "6px",
              boxShadow: "0 1px 4px #00000012" 
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <img src={OrderInfoIcon} alt="order-info-icon" />
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#CF5763",
                }}
              >
                Thông tin đơn hàng
              </div>
            </div>
            <div className="cart-items-list">
              <div>
                {cartInfo?.line_items?.map((item, key) => (
                  <ListOrder key={key} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{

            height: "max-content",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            boxShadow: "0 1px 4px #00000012" 
          }}
          className="w-[40%] xs:w-full"
        >
          <div className="p-[20px] bg-[#fff] rounded-[6px]" style={{ boxShadow: "0 1px 4px #00000012" }}>
            <div
              className="payment-method-text"
              style={{ marginBottom: "15px" }}
            >
              <img src={PaymentMethodIcon} alt="payment-method" />
              <span
                style={{
                  marginLeft: 8,
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#CF5763",
                }}
              >
                Phương thức thanh toán
              </span>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {paymentMethods.map((item, i) => (
                <label
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod.id === item.id}
                    onChange={() => {}}
                    // onChange={() => handlePaymentSelect(item)}
                  />
                  <span>{item.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="p-[20px] bg-[#fff] rounded-[6px] xs:mb-3" style={{ boxShadow: "0 1px 4px #00000012" }}>
            <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
              <img src={TransportIcon} alt="transport-order-icon" />
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#CF5763",
                }}
              >
                Đơn vị vận chuyển
              </div>
            </div>
            <div>
              {renderListShipment().length > 0 &&
                renderListShipment().map((item, key) => {
                  return (
                    <div key={key} style={{ margin: "7px 0" }}>
                      <div style={{ fontWeight: "500" }}>
                        {item?.shipmentName}
                      </div>
                      {item?.listOption.map((items) => {
                        return (
                          <div
                            key={items?.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              margin: "7px 0",
                            }}
                          >
                            <label
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                cursor: "pointer",
                              }}
                            >
                              <input
                                type="radio"
                                name="shipment"
                                onChange={() => {
                                  setShipInfomation({
                                    ship_speed_code: items.ship_speed_code,
                                    ship_name: item.shipmentName,
                                    description_shipper: items.description,
                                    total_shipping_fee: items.fee,
                                    partner_shipper_id: item.partner_id,
                                  });
                                }}
                              ></input>
                              <span>{items.description}</span>
                            </label>
                            <div>{formatPrice(items.fee)}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className="p-[20px] bg-[#fff] rounded-[6px] xs:fixed xs:bottom-0 xs:w-full xs:left-0"
            style={{ boxShadow: "0 1px 4px #ccc" }}
          >
            <div
              style={{
                display: "flex",
                gap: "7px",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <img src={PaymentInfo} alt="payment-info" />
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#CF5763",
                }}
              >
                Thông tin thanh toán
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "7px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>Tổng tiền hàng:</div>
                <div>{formatPrice(cartInfo.total_final)}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>Phí vận chuyển:</div>
                <div>{formatPrice(shipInfomation?.total_shipping_fee)}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontWeight: "600" }}>Tổng số tiền:</div>
                <div style={{ color: "#CF5763" }}>
                  {formatPrice(
                    shipInfomation?.total_shipping_fee
                      ? shipInfomation?.total_shipping_fee +
                          cartInfo.total_final
                      : cartInfo.total_final
                  )}
                </div>
              </div>
            </div>
            <button
              style={{
                width: "100%",
                color: "#fff",
                padding: "10px 0",
                backgroundColor: "#cf5763",
                borderRadius: "6px",
                marginTop: "15px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleOrder}
              disabled={orderLoading}
            >
              {orderLoading ? (
                <Spin
                  indicator={antIcon}
                  className="text-[#fff] w-[15px] h-[15px]"
                  size="small"
                />
              ) : (
                "Thanh toán"
              )}
            </button>
          </div>
        </div>
      </div>
    </OrderStyles>
  );
}
