import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { orderStatusAction } from "../../../actions/orderStatus";
import styled from "styled-components";
import React from "react";
import DataByMenuItem from "./DataByMenuItem";
import LoadingDot from "../../../components/LoadingDot";

const GetDataByMenuStyle = styled.div`
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

export default function GetDataByMenu(props) {
  const { active } = props;
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const listDataByMenu = useSelector(
    (state) => state.orderStatus.dataByMenu.list
  );
  const dataByMenuInfo = useSelector(
    (state) => state.orderStatus.dataByMenu.dataByMenuInfo
  );
  const isLoadingData = useSelector(
    (state) => state.orderStatus.dataByMenu.status
  );
  const arrPageNumber = Array.from(
    { length: dataByMenuInfo.last_page },
    (_, index) => index + 1
  );
  useEffect(() => {
    dispatch(orderStatusAction.getDataByMenu(page, active));
  }, [page, active]);

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
        <GetDataByMenuStyle>
          {dataByMenuInfo.last_page === 1 && listDataByMenu.length === 0 ? (
            <div className="empty-order-list">
              Bạn không có đơn hàng nào
            </div>
          ) : (
            <div>
              {listDataByMenu.map((item,index) => {
                return (
                  <DataByMenuItem key={index} item={item} active={active} />
                );
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
                  disabled={page === dataByMenuInfo.last_page}
                  onClick={() => setPage(page - 1)}
                >
                  <i className="fas fa-chevron-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )}
        </GetDataByMenuStyle>
      )}
    </React.Fragment>
  );
}
