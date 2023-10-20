import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconArrowLeft from "../../assets/icons/IconArrowLeft";
import orderImage from "../../assets/images/zin/order.svg";
import receivedImage from "../../assets/images/zin/received.svg";
import receivedDisableImage from "../../assets/images/zin/receivedDisable.svg";
import starImage from "../../assets/images/zin/star.svg";
import starDisableImage from "../../assets/images/zin/starDisable.svg";
import truckImage from "../../assets/images/zin/truck.svg";
import truckDisableImage from "../../assets/images/zin/truckDisable.svg";
import { useOrderStore } from "../../store/orderStore";
import { formatNumber, formatPrice, getPathByIndex } from "../../utils";
import "./OrderInfo.css";
import { Image, Modal } from "antd";
import Evaluate from "./child/Evaluate";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";
import ImageDefault from "../../assets/images/image-default.jpg";
// import {ArrowLeftOutlined} from antd;

function OrderInfo() {
  const navigate = useNavigate();
  const orderCode = getPathByIndex(2);
  const { widthScreen } = useGetScreenWidth();
  const { getOrderById, orderInfo } = useOrderStore();
  const myRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isOpenModalRatting, setOpenModalRatting] = useState(false);

  useEffect(() => {
    getOrderById(orderCode);
  }, [orderCode]);

  function handleShowProduct(id) {
    window.location.href = `/san-pham/${id}`;
  }

  // function handleCancelOrder() {
  //   dispatch(
  //     a.cancelOrder({
  //       order_code: orderInfo.order_code,
  //     })
  //   );
  // }

  function isReviewable(product) {
    let arr = orderInfo.line_items.filter((v) => {
      return v.product.id === product.id;
    });
    let rs = arr.length > 0 && arr[0].reviewed === false;
    return rs;
  }

  function handleScrollTo() {
    let top = myRef.current.offsetTop;
    window.scroll({
      top,
      behavior: "smooth",
    });
  }

  function openPaymentDialog() {
    // dispatch({
    //   type: c.CHANGE_POPUP,
    //   popupType: c.ORDER_POPUP,
    //   orderPopupTitle: {
    //     title: "Thanh toán!",
    //     subTitle: "Hãy thanh toán ngay hoặc thay đổi hình thức thanh toán.",
    //   },
    //   paymentMethod: {
    //     payment_method_name: orderInfo.payment_method_name,
    //     payment_method_id: orderInfo.payment_method_id,
    //     order_code: orderInfo.order_code,
    //     payment_partner_name: orderInfo.payment_partner_name,
    //     payment_partner_id: orderInfo.payment_partner_id,
    //     orderInfo: orderInfo,
    //   },
    // });
  }

  const handleCheckStep = () => {
    switch (orderInfo.order_status_code) {
      case "WAIT_FOR_PAYMENT":
      case "WAITING_FOR_PROGRESSING":
        return 1;
      case "SHIPPING":
        return 2;
      case "DELIVERED":
        return 3;
      case "COMPLETED":
        return 4;
      default:
        return "";
    }
  };

  if (!orderInfo.order_code) return <p>Đơn hàng không tồn tại</p>;

  return (
    <React.Fragment>
      {/* <Header /> */}
      {/* {orderInfo.status === c.LOADING ? null : ( */}

      <React.Fragment>
        <div className="order-info-page bg-white mb-5">
          <div className="main">
            <div className="title">
              <div
                onClick={() => navigate(-1)}
                className="flex gap-2 items-center cursor-pointer"
              >
                {/* <ArrowLeftOutlined /> */}
                <IconArrowLeft className="w-[24px]" />
                <p className="whitespace-nowrap">Trở lại</p>
              </div>
              <div style={{ display: "flex" }} className="gap-2 xs:mt-2">
                <div>Mã đơn hàng: {orderInfo?.order_code}</div>
                <span>|</span>
                <div style={{ color: "rgb(238, 77, 45)" }}>
                  {orderInfo.order_status_name}
                </div>
              </div>
            </div>
            <div className="p-[40px_24px] mb-[40px] xs:p-[40px_0] xs:mb-2">
              {orderInfo.order_status_code === "COMPLETED" && (
                <div className="stepper">
                  <div
                    className="stepper__step stepper__step--finish"
                    style={{
                      position: "relative",
                      width: "auto",
                      marginLeft: "24px",
                    }}
                  >
                    <div className="stepper__step-icon stepper__step-icon--finish">
                      <img src={orderImage} />
                    </div>
                    <div className="stepper__step-text absolute left-[50%] translate-x-[-50%] w-max xs:w-[50px]">
                      Đơn hàng đã đặt
                    </div>
                  </div>
                  <div
                    style={{
                      // height: "2px",
                      // flex: 1,
                      backgroundColor:
                        handleCheckStep() > 1 ? "#2dc258" : "#a2a8a4",
                      // margin: "30px 0 0 0",
                    }}
                    className="mt-[30px] h-[2px] flex-1 xs:mt-[15px]"
                  ></div>
                  {/* <div className="stepper__step stepper__step--finish">
                    <div className="stepper__step-icon stepper__step-icon--finish">
                      <img src="/img/money.svg" />
                    </div>
                    <div className="stepper__step-text">
                      Đơn hàng đã thanh toán (₫28.420)
                    </div>
                  </div>
                  <div className="stepper__step-date">12:24 27-06-2023</div> */}
                  <div
                    className="stepper__step stepper__step--finish"
                    style={{ position: "relative", width: "auto" }}
                  >
                    <div
                      className={`stepper__step-icon ${
                        handleCheckStep() > 1
                          ? "stepper__step-icon--finish"
                          : "stepper__step-icon--unfinish"
                      }`}
                    >
                      {handleCheckStep() > 1 ? (
                        <img src={truckImage} />
                      ) : (
                        <img src={truckDisableImage} />
                      )}
                    </div>
                    <div className="stepper__step-text absolute left-[50%] translate-x-[-50%] w-max xs:w-[50px]">
                      Đã giao cho ĐVVC
                    </div>
                    <div className="stepper__step-date">10:35 28-06-2023</div>
                  </div>
                  <div
                    style={{
                      // height: "2px",
                      // flex: 1,
                      backgroundColor:
                        handleCheckStep() > 2 ? "#2dc258" : "#a2a8a4",
                      // margin: "30px 0 0 0",
                    }}
                    className="mt-[30px] h-[2px] flex-1 xs:mt-[15px]"
                  ></div>
                  <div
                    className="stepper__step stepper__step--finish"
                    style={{ position: "relative", width: "auto" }}
                  >
                    <div
                      className={`stepper__step-icon ${
                        handleCheckStep() > 2
                          ? "stepper__step-icon--finish"
                          : "stepper__step-icon--unfinish"
                      }`}
                    >
                      {handleCheckStep() > 2 ? (
                        <img src={receivedImage} />
                      ) : (
                        <img src={receivedDisableImage} />
                      )}
                    </div>
                    <div className="stepper__step-text absolute left-[50%] translate-x-[-50%] w-max xs:w-[50px]">
                      Đã nhận được hàng
                    </div>
                    <div className="stepper__step-date">07:23 07-07-2023</div>
                  </div>
                  <div
                    style={{
                      // height: "2px",
                      // flex: 1,
                      backgroundColor:
                        handleCheckStep() > 3 ? "#2dc258" : "#a2a8a4",
                      // margin: "30px 0 0 0",
                    }}
                    className="mt-[30px] h-[2px] flex-1 xs:mt-[15px]"
                  ></div>
                  <div
                    className="stepper__step stepper__step--finish"
                    style={{
                      position: "relative",
                      width: "auto",
                      marginRight: "41px",
                    }}
                  >
                    <div
                      className={`stepper__step-icon ${
                        handleCheckStep() > 3
                          ? "stepper__step-icon--finish"
                          : "stepper__step-icon--unfinish"
                      }`}
                    >
                      {handleCheckStep() > 3 ? (
                        <img src={starImage} />
                      ) : (
                        <img src={starDisableImage} />
                      )}
                    </div>
                    <div className="stepper__step-text absolute left-[50%] translate-x-[-50%] w-max xs:w-[50px]">
                      Mua hàng thành công
                    </div>
                    <div className="stepper__step-date">17:13 07-07-2023</div>
                  </div>
                  <div className="stepper__line" style={{ display: "none" }}>
                    <div
                      className="stepper__line-background"
                      style={{
                        background: "rgb(224, 224, 224)",
                      }}
                    ></div>
                    <div
                      className="stepper__line-foreground"
                      style={{
                        width: "calc((100% - 140px) * 1)",
                        // background: stepperLineStyle()
                        // background: "rgb(45, 194, 88)",
                        // background: handleCheckStep()==='2' ? "linear-gradient(to right, red 25%, transparent 25%)" , handleCheckStep()==='3' ? "linear-gradient(to right, red 50%, transparent 50%)" , handleCheckStep()==='4' ? "linear-gradient(to right, red 75%, transparent 75%)"
                      }}
                    ></div>
                  </div>
                </div>
              )}
              {orderInfo.order_status_code === "CUSTOMER_CANCELLED" && (
                <>
                  <h3 className="mb-2">Đã hủy đơn hàng</h3>
                  <p>vào {orderInfo.updated_at}</p>
                </>
              )}
            </div>
            <div>
              <div className="line"></div>
              <div className="content">
                <div className="row">
                  <div className="user-info">
                    <div className="title">ĐỊA CHỈ NGƯỜI NHẬN</div>
                    <div className="info">
                      <h4>{orderInfo.customer_address?.name}</h4>
                      <div>
                        <span>Địa chỉ: </span>
                        {(orderInfo.customer_address?.address_detail ?? "") +
                          ", " +
                          orderInfo.customer_address?.wards_name +
                          ", " +
                          orderInfo.customer_address?.district_name +
                          ", " +
                          orderInfo.customer_address?.province_name +
                          ", "}
                      </div>
                      <div>
                        <span>Điện thoại: </span>{" "}
                        {orderInfo.customer_address?.phone}
                      </div>
                      <div>
                        <span>Ghi chú: </span> {orderInfo.customer_note}
                      </div>
                    </div>
                  </div>
                  <div className="shipment-info">
                    <div className="title">HÌNH THỨC GIAO HÀNG</div>
                    <div className="info">
                      <div>{orderInfo.shipper_name}</div>
                      <div>
                        {`Phí vận chuyển: ${formatPrice(
                          orderInfo.total_shipping_fee
                        )}`}
                      </div>
                      {orderInfo.ship_discount_amount > 0 && (
                        <div>
                          {`Giảm phí vận chuyển: ${formatPrice(
                            orderInfo.ship_discount_amount
                          )}`}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="payment-info">
                    <div className="title">THANH TOÁN</div>
                    <div className="info">
                      <div>{orderInfo.payment_partner_name}</div>
                      <div>
                        {`Tổng giá trị sản phẩm:  ${formatPrice(
                          orderInfo.total_before_discount
                        )}`}
                      </div>

                      {orderInfo.product_discount_amount > 0 && (
                        <div>
                          {`Giảm giá sản phẩm:  ${formatPrice(
                            orderInfo.product_discount_amount
                          )}`}
                        </div>
                      )}

                      {orderInfo.commission_buyer > 0 && (
                        <div>
                          {`Hoa hồng:  ${formatPrice(
                            orderInfo.commission_buyer
                          )}`}
                        </div>
                      )}

                      {orderInfo.combo_discount_amount > 0 && (
                        <div>
                          {`Giảm combo:  ${formatPrice(
                            orderInfo.combo_discount_amount
                          )}`}
                        </div>
                      )}

                      {orderInfo.voucher_discount_amount > 0 && (
                        <div>
                          {`Giảm voucher:  ${formatPrice(
                            orderInfo.voucher_discount_amount
                          )}`}
                        </div>
                      )}

                      {orderInfo.bonus_points_amount_used > 0 && (
                        <div>
                          {`Sử dụng xu:  ${formatPrice(
                            orderInfo.bonus_points_amount_used
                          )}`}
                        </div>
                      )}

                      <div>
                        {`Thanh toán:  ${formatPrice(orderInfo.total_final)}`}
                      </div>

                      {/* {orderInfo.payment_status_code === "UNPAID" &&
                          ["WAITING_FOR_PROGRESSING", "PACKING"].includes(
                            orderInfo.order_status_code
                          ) && (
                            <button
                              onClick={openPaymentDialog}
                              style={{
                                padding: "6px 8px",
                                borderRadius: "0.25em",
                                color: "white",
                                marginTop: "0.5em",
                                // background: appTheme.color_main_1,
                              }}
                            >
                              Thanh toán
                            </button>
                          )} */}
                    </div>
                  </div>
                </div>
                {widthScreen > 576 ? (
                  <table ref={myRef}>
                    <thead>
                      <tr>
                        <th className="product">Sản phẩm</th>
                        <th className="prePrice">Giá</th>
                        <th className="number">Số lượng</th>
                        <th className="discount">Giảm giá</th>
                        <th className="price">Tạm tính</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderInfo.line_items_at_time.map((v, i) => (
                        <tr key={i}>
                          <td className="product">
                            <div className="row">
                              <div className="image">
                                <div className="img-container">
                                  <img
                                    src={v.image_url}
                                    className="w-[92px] h-[92px]"
                                    alt=""
                                    style={{
                                      background:
                                        "url(/img/default_product.jpg)",
                                      backgroundSize: "contain",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="action">
                                <div className="name">{v.name}</div>
                                {orderInfo.order_status_code ===
                                  "COMPLETED" && (
                                  <React.Fragment>
                                    {orderInfo.order_code_refund == null &&
                                      isReviewable(v) && (
                                        <>
                                          <button
                                            onClick={() => {
                                              setOpenModalRatting(true);
                                              setSelectedProduct(v);
                                            }}
                                            className="border-none bg-white cursor-pointer"
                                          >
                                            Đánh giá
                                          </button>
                                          <span> | </span>
                                        </>
                                      )}
                                  </React.Fragment>
                                )}
                                {/* <button className="border-none bg-white cursor-pointer mr-2">
                                  Đánh giá
                                </button> */}
                                <button
                                  onClick={() => handleShowProduct(v.id)}
                                  className="border-none bg-white cursor-pointer"
                                >
                                  Xem thông tin
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="prePrice">
                            {formatPrice(v.before_discount_price)}
                          </td>
                          <td className="number">{v.quantity}</td>
                          <td className="discount">
                            {" "}
                            {formatPrice(
                              v.before_discount_price - v.after_discount
                            )}
                          </td>
                          <td className="price">
                            {formatPrice(v.after_discount * v.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  orderInfo.line_items_at_time.map((product, index) => {
                    const {
                      image_url,
                      name,
                      item_price,
                      quantity,
                      id,
                      before_discount_price,
                      after_discount,
                    } = product;
                    const isLast =
                      orderInfo.line_items_at_time.length - 1 === index;
                    const isFirst = index === 0;
                    return (
                      <div
                        className="bg-white"
                        key={id}
                        style={{ borderBottom: "1px solid #E7E7E7" }}
                      >
                        {isFirst && (
                          <div className="flex gap-1 justify-end pr-5 pt-2 xs:text-[10px] xs:flex xs:flex-col xs:items-end"></div>
                        )}
                        <div
                          className="px-5 xs:px-0 flex gap-4 border-b-[1px] border-[#E7E7E7] border-solid border-t-0 border-r-0 border-l-0 pb-5 xs:py-2 xs:border-none"
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
                            <div className="xs:flex xs:justify-between xs:items-center xs: gap-2">
                              <div className="flex gap-2 items-center">
                                <div className="flex justify-between">
                                  <p className="text-[18px] xs:text-[14px] text-[#CF5763]">
                                    {formatNumber(item_price)}đ
                                  </p>
                                </div>
                                <p className="xs:text-[12px]">
                                  Giảm:{" "}
                                  {formatPrice(
                                    before_discount_price - after_discount
                                  )}
                                </p>
                              </div>
                              <p className="xs:text-[12px]">
                                Số lượng: {quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between my-3 text-[12px]">
                          <p> Tạm tính: {" "}
                            <span className="text-[14px] font-semibold text-[#CF5763]">{formatPrice(product.after_discount * product.quantity)}</span>
                          </p>
                          <div className="action ">
                            {orderInfo.order_status_code === "COMPLETED" && (
                              <React.Fragment>
                                {orderInfo.order_code_refund == null &&
                                  isReviewable(product) && (
                                    <>
                                      <button
                                        onClick={() => {
                                          setOpenModalRatting(true);
                                          setSelectedProduct(product);
                                        }}
                                        className="border-none bg-white cursor-pointer text-[#189687]"
                                      >
                                        Đánh giá
                                      </button>
                                      <span className="text-[#e7e7e7]"> | </span>
                                    </>
                                  )}
                              </React.Fragment>
                            )}
                            {/* <button className="border-none bg-white cursor-pointer mr-2">
                                    Đánh giá
                                  </button> */}
                            <button
                              onClick={() => handleShowProduct(product.id)}
                              className="border-none bg-white cursor-pointer text-[#189687]"
                            >
                              Xem thông tin
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        {isOpenModalRatting && (
          <Modal
            width={750}
            title="Đánh giá sản phẩm"
            open={isOpenModalRatting}
            onOk={() => {}}
            onCancel={() => {
              setOpenModalRatting(false);
            }}
            centered
            okText="Gửi đánh giá"
            cancelText="Hủy"
            footer={null}
          >
            <Evaluate
              product={selectedProduct}
              orderCode={orderInfo?.order_code}
              setOpenModalRatting={setOpenModalRatting}
            />
          </Modal>
        )}
      </React.Fragment>

      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default OrderInfo;
