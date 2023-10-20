import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { orderStatusAction } from "../../../actions/orderStatus";
import styled from "styled-components";
import React from "react";
import OrderCompletedItem from "./OrderCompletedItem";
import LoadingDot from "../../../components/LoadingDot";

const OrderCompletedStyle = styled.div`
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

export default function OrderCompleted() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const listOrderCompleted = useSelector(
    (state) => state.orderStatus.ordersCompleted.list
  );
  const orderCompletedInfo = useSelector(
    (state) => state.orderStatus.ordersCompleted.ordersCompletedInfo
  );
  const isLoadingData = useSelector(
    (state) => state.orderStatus.ordersCompleted.status
  );
  const arrPageNumber = Array.from(
    { length: orderCompletedInfo.last_page },
    (_, index) => index + 1
  );
  useEffect(() => {
    dispatch(orderStatusAction.getOrdersCompleted(page));
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
        <OrderCompletedStyle>
          {orderCompletedInfo.last_page === 1 &&
          listOrderCompleted.length === 0 ? (
            <div className="empty-order-list">
              Bạn không có đơn hàng nào chờ thanh toán
            </div>
          ) : (
            <div>
              {listOrderCompleted.map((item,index) => {
                return <OrderCompletedItem key={index} item={item} />;
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
                  disabled={page === orderCompletedInfo.last_page}
                  onClick={() => setPage(page - 1)}
                >
                  <i className="fas fa-chevron-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )}
        </OrderCompletedStyle>
      )}
    </React.Fragment>
  );
}
