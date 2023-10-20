import { useEffect, useState } from "react";
import { Pagination } from "antd";

import { formatPrice } from "../../../utils";
import { useWalletStore } from "../../../store/walletStore";
import { useUserStore } from "../../../store/userStore";
import useGetScreenWidth from "../../../hooks/useGetScreenWidth";
import Loading from "../../../components/loading";

export default function OrderHistoryTable() {
  const { widthScreen } = useGetScreenWidth();
  const [activePage, setActivePage] = useState(1);
  const { orderHistory, getOrderHistory, loading } = useWalletStore();
  const { profile } = useUserStore();

  useEffect(() => {
    getOrderHistory(activePage, true);
  }, [activePage]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  let colorWithOrderStatusColor = (order_status_code) => {
    if (
      order_status_code == "WAITING_FOR_PROGRESSING" ||
      order_status_code == "PACKING" ||
      order_status_code == "SHIPPING" ||
      order_status_code == "WAIT_FOR_PAYMENT"
    ) {
      return {
        main: "#FF833D",
        bg: "#F0AD001A",
      };
    }
    if (
      order_status_code == "DELIVERY_ERROR" ||
      order_status_code == "DELIVERY_ERROR" ||
      order_status_code == "CUSTOMER_CANCELLED" ||
      order_status_code == "USER_CANCELLED" ||
      order_status_code == "OUT_OF_STOCK"
    ) {
      return {
        main: "#E83A2F",
        bg: "#E83A2F1A",
      };
    }
    if (
      order_status_code == "REFUNDS" ||
      order_status_code == "CUSTOMER_RETURNING" ||
      order_status_code == "CUSTOMER_HAS_RETURNS"
    ) {
      return {
        main: "#F0AD00",
        bg: "#F0AD001A",
      };
    }

    return {
      main: "#27AE60",
      bg: "#218ECB1A",
    };
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {widthScreen > 576 ? (
            <div>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Tổng tiền</th>
                    <th>Thời gian tạo đơn</th>
                    <th>Nguồn</th>
                    <th>Hoa hồng</th>
                    <th>Mana</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {orderHistory?.data?.map((item) => {
                    return (
                      <tr key={item.id} className="py-[5px]">
                        <td>{item.order_code}</td>
                        <td>{formatPrice(item.total_final)}</td>
                        <td>{item.created_at}</td>

                        <td>
                          {profile?.id == item.customer?.id ? (
                            <span style={{ color: "green" }}>Tự đặt</span>
                          ) : (
                            <span style={{ color: "#cf5763" }}>
                              {profile?.id != null ? "Giới thiệu" : "Có"}
                            </span>
                          )}
                        </td>
                        {(item.collaborator_by_customer_id ===
                          item.customer_id ||
                          item.collaborator_by_customer_id === null) && (
                          <td className="text-[#27AE60] font-medium cursor-pointer">
                            {formatPrice(
                              Math.ceil(item.commission_buyer),
                              false
                            )}
                          </td>
                        )}

                        {item.collaborator_by_customer_id !==
                          item.customer_id &&
                          item.collaborator_by_customer_id !== null && (
                            <td className="text-[#27AE60] font-medium cursor-pointer">
                              {formatPrice(
                                Math.ceil(item.commission_referral),
                                false
                              )}
                            </td>
                          )}

                        <td>{formatPrice(item.mana, false)}</td>

                        <td>
                          {" "}
                          <span
                            style={{
                              color: colorWithOrderStatusColor(
                                item.order_status_code
                              ).main,
                            }}
                          >
                            {item.order_status_name}{" "}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-[13px]">
              {orderHistory?.data?.map((item) => {
                return (
                  <div
                    style={{
                      borderBottom: "1px solid #E7E7E7",
                      paddingBottom: "15px",
                    }}
                    key={item.id}
                    className="flex items-center justify-between my-[20px] leading-[20px]"
                  >
                    <div>
                      <div>Mã đơn: {item.order_code}</div>
                      <div>Thời gian: {item.created_at}</div>
                      <div>
                        Nguồn:{" "}
                        {profile?.id == item.customer?.id ? (
                          <span style={{ color: "green" }}>Tự đặt</span>
                        ) : (
                          <span style={{ color: "#cf5763" }}>
                            {profile?.id != null ? "Giới thiệu" : "Có"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-end">
                      <div>
                        Hoa hồng:{" "}
                        <span className="text-[#CF5763] font-medium">
                          {item.collaborator_by_customer_id == item.customer_id
                            ? formatPrice(
                                Math.ceil(item.commission_buyer),
                                false
                              )
                            : formatPrice(
                                Math.ceil(item.commission_referral),
                                false
                              )}
                        </span>
                      </div>
                      <div>Mana: {formatPrice(item.mana, false)}</div>
                      <div>Tổng tiền: {formatPrice(item.total_final)}</div>
                      <div
                        style={{
                          color: colorWithOrderStatusColor(
                            item.order_status_code
                          ).main,
                        }}
                      >
                        {item.order_status_name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="text-end">
            <Pagination
              current={activePage}
              total={orderHistory.total}
              pageSize={orderHistory?.per_page || 20}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
}
