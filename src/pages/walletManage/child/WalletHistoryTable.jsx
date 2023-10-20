import { useEffect, useState } from "react";
import { Pagination, DatePicker, ConfigProvider, Select } from "antd";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import viVN from "antd/locale/vi_VN";

import { formatPrice } from "../../../utils";
import { useWalletStore } from "../../../store/walletStore";
import useGetScreenWidth from "../../../hooks/useGetScreenWidth";
import Loading from "../../../components/loading";

export default function WalletHistoryTable(props) {
  dayjs.extend(isoWeek);
  const { main_type } = props;
  const [activePage, setActivePage] = useState(1);
  const [dateFilter, setDateFilter] = useState("week");
  const { widthScreen } = useGetScreenWidth();
  const [currentDate, setCurrentDate] = useState(dayjs(new Date()));
  const { getWalletHistory, walletHistory, loading } = useWalletStore();

  const mainTypeQuery = () => {
    switch (main_type) {
      case "WALLET_COMMISSION":
        return "&main_type=WALLET_COMMISSION,WALLET_RECEIVED_FIRST_GIFT";
      case "WALLET_SHAREHOLDER":
        return "&main_type=WALLET_SHAREHOLDER";
      case "WALLET_MANA":
        return "&main_type=WALLET_MANA,WALLET_RECEIVED_FIRST_GIFT_MANA,WALLET_MANA_MINUS,WALLET_MANA_INVESTMENT";
      default:
        return "";
    }
  };

  const dateQuery = () => {
    if (dateFilter === "week") {
      const weekStart = dayjs(currentDate).isoWeekday(1);
      const weekEnd = dayjs(currentDate).isoWeekday(7);
      const startOfWeek = weekStart.format("YYYY-MM-DD");
      const endOfWeek = weekEnd.format("YYYY-MM-DD");
      return `&from_time=${startOfWeek}&to_time=${endOfWeek}`;
    } else {
      const firstDayofMonth = dayjs(currentDate)
        .startOf("month")
        .format("YYYY-MM-DD");
      const lastDayofMonth = dayjs(currentDate)
        .endOf("month")
        .format("YYYY-MM-DD");
      return `&from_time=${firstDayofMonth}&to_time=${lastDayofMonth}`;
    }
  };

  useEffect(() => {
    let query;
    if (main_type === "WALLET_SHAREHOLDER") {
      query = `?page=${activePage}${mainTypeQuery()}${dateQuery()}`;
    } else {
      query = `?page=${activePage}${mainTypeQuery()}`;
    }
    getWalletHistory(query);
  }, [activePage, main_type, currentDate]);

  const handleChangeMonth = (date) => {
    setCurrentDate(dayjs(date));
    setActivePage(1);
  };

  const handleChangeWeek = (date) => {
    setCurrentDate(dayjs(date));
    setActivePage(1);
  };

  const formatWeek = () => {
    // Định dạng ngày đầu tuần và ngày cuối tuần của tuần được chọn
    const weekStart = dayjs(currentDate).isoWeekday(1);
    const weekEnd = dayjs(currentDate).isoWeekday(7);
    const startOfWeek = weekStart.format("DD/MM/YYYY");
    const endOfWeek = weekEnd.format("DD/MM/YYYY");
    return `${startOfWeek} - ${endOfWeek}`;
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const options = [
    {
      value: "week",
      label: "Tuần",
    },
    { value: "month", label: "Tháng" },
  ];

  const handleChangeFilter = (dateFilter) => {
    setDateFilter(dateFilter);
    setCurrentDate(dayjs(new Date()));
  };

  return (
    <>
      <>
        {main_type === "WALLET_SHAREHOLDER" && (
          <div className="flex items-center justify-between mb-[20px]">
            <div className="flex items-center gap-[10px]">
              <div>Lọc theo</div>
              <div>
                <Select
                  className="w-[150px]"
                  options={options}
                  value={dateFilter}
                  onChange={handleChangeFilter}
                ></Select>
              </div>
            </div>
            <ConfigProvider locale={viVN}>
              <div>
                {dateFilter === "week" ? (
                  <DatePicker
                    picker="week"
                    value={currentDate}
                    onChange={handleChangeWeek}
                    allowClear={false}
                    format={formatWeek}
                  ></DatePicker>
                ) : (
                  <DatePicker
                    picker="month"
                    value={currentDate}
                    onChange={handleChangeMonth}
                    allowClear={false}
                  ></DatePicker>
                )}
              </div>
            </ConfigProvider>
          </div>
        )}
      </>
      {loading ? (
        <Loading />
      ) : (
        <>
          {widthScreen > 576 ? (
            <div>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Mã giao dịch</th>
                    <th>Mã liên kết</th>
                    <th className="w-[200px]">Loại</th>
                    <th>Biến động</th>
                    <th>Số dư</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {walletHistory?.data?.map((item) => {
                    return (
                      <tr key={item.id} className="py-[5px]">
                        <td>{item.trade_code}</td>
                        <td>{item.value_reference}</td>
                        <td>{item.title}</td>
                        <td className="text-[#27AE60] font-medium cursor-pointer">
                          {formatPrice(Math.ceil(item.money_change))}
                        </td>
                        <td>
                          {formatPrice(Math.ceil(item.account_balance_changed))}
                        </td>
                        <td>{item.created_at}</td>
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
                    className="flex items-center justify-between my-[20px] leading-[20px]"
                  >
                    <div>
                      <div>Mã giao dịch: {item.trade_code}</div>
                      <div>Mã liên kết: {item.value_reference}</div>
                      <div>Thời gian: {item.created_at}</div>
                    </div>
                    <div className="text-end">
                      <div>
                        Biến động:{" "}
                        <span className="text-[#27AE60] font-medium cursor-pointer">
                          {formatPrice(Math.ceil(item.money_change))}
                        </span>
                      </div>
                      <div>
                        Số dư:{" "}
                        {formatPrice(Math.ceil(item.account_balance_changed))}
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
