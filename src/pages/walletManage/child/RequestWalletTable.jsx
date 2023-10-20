import { useEffect, useState } from "react";
import { Pagination } from "antd";

import { formatPrice } from "../../../utils";
import { useWalletStore } from "../../../store/walletStore";
import useGetScreenWidth from "../../../hooks/useGetScreenWidth";
import Loading from "../../../components/loading";

export default function RequestWalletTable(props) {
  const { main_type } = props;
  const [activePage, setActivePage] = useState(1);
  const { widthScreen } = useGetScreenWidth();
  // const { getRequestWalletHistory, requestWalletHistory, loading } =
  //   useWalletStore();

  const { getWalletHistory, walletHistory, loading } = useWalletStore();
  const mainTypeQuery = () => {
    switch (main_type) {
      case "HISTORY_REQUEST_WALLET":
        return "&main_type=WALLET_COMMISSION_WITHDRAWAL";
      case "WITHDRAW_HISTORY":
        return "&main_type=WALLET_WITHDRAWAL_SHAREHOLDER";
      default:
        return "";
    }
  };

  useEffect(() => {
    const query = `?page=${activePage}${mainTypeQuery()}`;
    getWalletHistory(query);
  }, [activePage, main_type]);

  const handlePageChange = (page) => {
    setActivePage(page);
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
                    <th>Số tiền</th>
                    <th>Loại</th>
                    <th>Biến động</th>
                    <th>Số dư</th>
                    <th>Thời gian</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {walletHistory?.data?.map((item) => {
                    return (
                      <tr key={item.id} className="py-[5px]">
                        <td>{item.trade_code}</td>
                        <td>{formatPrice(item.money_change, false)}</td>
                        <td>
                          {item.type === 0
                            ? "Rút tiền"
                            : "Nạp tiền"}
                        </td>
                        <td className="text-[#27AE60]">{formatPrice(item.money_change)}</td>
                        <td>{formatPrice(item.account_balance_changed)}</td>
                        <td>{item.created_at}</td>
                        <td>
                          {item.status === 1 ? (
                            <div className="text-[#cf5763]">Huỷ</div>
                          ) : (
                            <div
                              style={{
                                color: "#2bb063",
                              }}
                            >
                              Thành công
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-[13px]">
              {requestWalletHistory?.data?.map((item) => {
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
                      <div>Mã đơn: {item.trade_code}</div>
                      <div>
                        Loại:{" "}
                        {item.is_withdrawal === true ? "Rút tiền" : "Nạp tiền"}
                      </div>
                      <div>Thời gian: {item.created_at}</div>
                    </div>
                    <div className="text-end">
                      <div>Số tiền: {formatPrice(item.money, false)}</div>
                      <div>
                        {item.status === 1 ? (
                          <span className="text-[#cf5763]">Huỷ</span>
                        ) : (
                          <span className="text-[#2bb063]">Thành công</span>
                        )}
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
              total={walletHistory.total}
              pageSize={walletHistory?.per_page || 20}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
}
