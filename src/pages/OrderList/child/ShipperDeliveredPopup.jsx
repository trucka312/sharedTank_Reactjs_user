import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { orderStatusAction } from "../../../actions/orderStatus";

const ModalStyle = styled.div`
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
  }

  .modal-wrapper {
    background-color: white;
    padding: 20px 25px 20px 25px;
    width: 600px;
    height: 350px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    position: relative;
    border-radius: 7px;
  }

  p {
    margin-top: 30px;
    text-align: center;
  }

  .list-btn {
    display: flex;
    justify-content: space-evenly;
    margin-top: 30px;
    gap: 20px;
    .ok-btn {
      background-color: #20409a;
      color: #fff;
      padding: 10px 0;
    }
    .cancel-btn {
      border: 1px solid #20409a;
      background-color: #fff;
      color: #21409a;
    }
    button {
      border-radius: 6px;
      cursor: pointer;
      flex: 1;
      // width: 120px;
    }
  }
`;

const ShipperDeliveredPopup = (props) => {
  const dispatch = useDispatch();
  const { handleClosePopup, order_code } = props;
  return (
    <ModalStyle>
      <div className="modal-container">
        <div className="modal-wrapper">
          <p
            style={{ fontSize: "25px", lineHeight: "34px", fontWeight: "600" }}
          >
            Xác nhận đã nhận được đơn hàng ?
          </p>
          <p style={{ lineHeight: "25px" }}>
            Bạn vui lòng kiểm tra các sản phẩm và đảm bảo hài lòng với tình
            trạng của tất cả sản phẩm trong đơn hàng {"("}không phát sinh yêu
            cầu Trả hàng/Hoàn tiền{")"} trước khi nhấn{" "}
            <span style={{ color: "#21409A" }}>Xác nhận</span>
            <br />
            Sau khi nhấn xác nhận, đơn hàng sẽ được hoàn tất và Hihihi sẽ tiến
            hành thanh toán tiền cho người bán
          </p>
          {/* <button onClick={handleCloseQuantityError}>Ok</button> */}
          <div className="list-btn">
            <button
              className="cancel-btn btn"
              onClick={() => handleClosePopup()}
            >
              Huỷ
            </button>
            <button
              className="ok-btn btn"
              onClick={() =>
                dispatch(orderStatusAction.confirmOrders(order_code))
              }
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </ModalStyle>
  );
};

export default ShipperDeliveredPopup;
