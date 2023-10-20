import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { orderStatusAction } from "../../../actions/orderStatus";
import styled from "styled-components";
import React from "react";
import ShipperDeliveredItem from "./ShipperDeliveredItem";
import LoadingDot from "../../../components/LoadingDot";

const ShipperDeliveredStyle = styled.div`
  .empty-order-list {
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pagination-container {
    display: flex;
    justify-content: center;
    .btn-previous {
      margin-right: 5px;
    }
    .btn-pageNumber {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
    }
    .btn-next {
      margin-left: 5px;
    }
  }
`;

export default function ShipperDelivered() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const listCustomerDelivered = useSelector(
    (state) => state.orderStatus.shipperDelivered.list
  );
  const shipperDeliveredInfo = useSelector(
    (state) => state.orderStatus.shipperDelivered.shipperDeliveredInfo
  );
  const isLoadingData = useSelector(
    (state) => state.orderStatus.shipperDelivered.status
  );
  const arrPageNumber = Array.from(
    { length: shipperDeliveredInfo.last_page },
    (_, index) => index + 1
  );
  useEffect(() => {
    dispatch(orderStatusAction.getShipperDelivered(page));
  }, [page]);

  return (
    <React.Fragment>
      {isLoadingData === "LOADING" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <LoadingDot />
        </div>
      ) : (
        <ShipperDeliveredStyle>
          {shipperDeliveredInfo.last_page === 1 &&
          listCustomerDelivered.length === 0 ? (
            <div className="empty-order-list">
              Bạn không có đơn hàng nào cần xác nhận
            </div>
          ) : (
            <div>
              {listCustomerDelivered.map((item,index) => {
                return <ShipperDeliveredItem key={index} item={item} />;
              })}
              <div className="pagination-container">
                <button
                  className="btn-previous"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <i className="fas fa-chevron-left" aria-hidden="true"></i>
                </button>
                {arrPageNumber.map((item, index) => {
                  return (
                    <div
                      className="btn-pageNumber"
                      style={{
                        backgroundColor: page === item ? "#20409a" : "#fff",
                        color: page === item ? "#fff" : "#000",
                      }}
                      onClick={() => setPage(item)}
                      key={index}
                    >
                      {item}
                    </div>
                  );
                })}
                <button
                  className="btn-next"
                  disabled={page === shipperDeliveredInfo.last_page}
                  onClick={() => setPage(page - 1)}
                >
                  <i className="fas fa-chevron-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )}
        </ShipperDeliveredStyle>
      )}
    </React.Fragment>
  );
}
