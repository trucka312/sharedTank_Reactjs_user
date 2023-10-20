import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { cartActions } from "../../../actions/cartActions";
import OrderPendingItem from "./OrderPendingItem";
import LoadingDot from "../../../components/LoadingDot";
import DataByMenuItem from "./DataByMenuItem.jsx";

const ListOrderPendingStyle = styled.div`
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

export default function ListOrderAll({dataTable}) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orderListPending = useSelector( 
    (state) => state.cart.ordersListPending.list
  );
  const pendingListInfor = useSelector(
    (state) => state.cart.ordersListPending.pendingListInfo
  );
  const isLoadingData = useSelector(
    (state) => state.cart.ordersListPending.status
  );
  const arrPageNumber = Array.from(
    { length: pendingListInfor.last_page },
    (_, index) => index + 1
  );

  useEffect(() => {
    dispatch(cartActions.getOrdersPending(page));
  }, [page]);

  console.log('dataTable',dataTable)

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
        <ListOrderPendingStyle>
          {pendingListInfor.last_page === 1 && orderListPending.length === 0 ? (
            <div className="empty-order-list">
              Bạn không có đơn hàng nào chờ thanh toán
            </div>
          ) : (
            <div>
              {orderListPending.map((item) => {
                return <DataByMenuItem key={item.id} item={item} />;
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
                  disabled={page === pendingListInfor.last_page}
                  onClick={() => setPage(page - 1)}
                >
                  <i className="fas fa-chevron-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )}
        </ListOrderPendingStyle>
      )}
    </React.Fragment>
  );
}
