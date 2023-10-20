import { useEffect, useState } from "react";
import { Pagination } from "antd";

import { formatPrice } from "../../../utils";
import { useWalletStore } from "../../../store/walletStore";
import useGetScreenWidth from "../../../hooks/useGetScreenWidth";
import Loading from "../../../components/loading";

export default function InvestHolderTable(props) {
  // const { main_type } = props;
  const { widthScreen } = useGetScreenWidth();
  const [activePage, setActivePage] = useState(1);
  const { getWalletHistory, walletHistory, loading } = useWalletStore();

  useEffect(() => {
    const query = `?page=${activePage}&main_type=WALLET_INVEST_SHAREHOLDER`;
    getWalletHistory(query);
  }, [activePage]);

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
                    <th>Thời gian</th>
                    <th>Loại giao dịch</th>
                    <th>Tiền đầu tư</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {walletHistory?.data?.map((item) => {
                    return (
                      <tr key={item.id} className="py-[5px]">
                        <td>{item.created_at}</td>
                        <td>{item.title}</td>
                        <td className="text-[#27AE60] font-medium cursor-pointer">
                          +{formatPrice(Math.ceil(item.money_change))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-[13px]">
              {walletHistory?.data?.map((item) => {
                return (
                  <div
                    style={{
                      borderBottom: "1px solid #E7E7E7",
                      paddingBottom: "15px",
                    }}
                    key={item.id}
                    className="my-[20px] leading-[20px]"
                  >
                    <div>Loại giao dịch: {item.title}</div>
                    <div>Thời gian: {item.created_at}</div>
                    <div>
                      Tiền đầu tư:{" "}
                      <span className="text-[#27AE60] font-medium cursor-pointer">
                        +{formatPrice(Math.ceil(item.money_change))}
                      </span>
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
