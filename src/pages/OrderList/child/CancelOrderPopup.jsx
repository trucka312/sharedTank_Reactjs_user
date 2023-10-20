import React from "react";
import styled from "styled-components";

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
    padding: 20px;
    width: 500px;
    height: 200px;
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
    margin-top: 70px;
    .ok-btn {
      background-color: #20409a;
      color: #fff;
      padding: 10px 0;
    }
    .cancel-btn {
      border: 1px solid #20409a;
      background-color: #fff;
      color: #000;
    }
    button {
      border-radius: 6px;
      cursor: pointer;
      width: 120px;
    }
  }
`;

const CancelOrderPopup = (props) => {
  const { handleClosePopup, handleCancelOrder } = props;

  return (
    <ModalStyle>
      <div className="modal-container">
        <div className="modal-wrapper">
          <p>Bạn chắc chắn muốn huỷ đơn hàng này ?</p>
          <div className="list-btn">
            <button
              className="cancel-btn btn"
              onClick={() => handleClosePopup()}
            >
              Huỷ
            </button>
            <button
              className="ok-btn btn"
              onClick={() => {
                handleCancelOrder();
                handleClosePopup();
              }}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </ModalStyle>
  );
};

export default CancelOrderPopup;
