import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Pagination, DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";
import viVN from "antd/locale/vi_VN";
import isoWeek from "dayjs/plugin/isoWeek";

import { useReportStore } from "../../store/reportStore";
import { formatPrice } from "../../utils";
import Loading from "../../components/loading/Index";

const OverviewReportStyle = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 20px 15px;
  table th {
    background-color: #fbf4f5;
    color: #cf5763;
    width: 20%;
    padding: 20px 0;
  }
  table td {
    padding: 20px 0;
  }
`;

export default function OverviewReport() {
  dayjs.extend(isoWeek);
  const [page, setPage] = useState(1);
  const [currentWeek, setCurrentWeek] = useState(dayjs(new Date()));

  const handleChangeWeek = (date) => {
    setCurrentWeek(dayjs(date));
    setPage(1);
  };

  const formatWeek = (date) => {
    // Định dạng ngày đầu tuần và ngày cuối tuần của tuần được chọn
    const weekStart = dayjs(currentWeek).isoWeekday(1);
    const weekEnd = dayjs(currentWeek).isoWeekday(7);
    const startOfWeek = weekStart.format("DD/MM/YYYY");
    const endOfWeek = weekEnd.format("DD/MM/YYYY");
    return `${startOfWeek} - ${endOfWeek}`;
  };

  const { reportGeneral, loading, getReportGeneral } = useReportStore();

  useEffect(() => {
    const weekStart = dayjs(currentWeek).isoWeekday(1);
    const weekEnd = dayjs(currentWeek).isoWeekday(7);
    const startOfWeek = weekStart.format("YYYY-MM-DD");
    const endOfWeek = weekEnd.format("YYYY-MM-DD");
    const query = `?page=${page}&from_time=${startOfWeek}&to_time=${endOfWeek}`;
    getReportGeneral(query);
  }, [page, currentWeek]);

  return (
    <OverviewReportStyle>
      <div>
        {/* <div
          style={{
            border: "1px solid #E7E7E7",
            width: "100px",
            borderRadius: "6px",
            padding: "5px 7px",
          }}
        >
          Tháng
        </div> */}
        <ConfigProvider locale={viVN}>
          <DatePicker
            value={currentWeek}
            picker="week"
            format={formatWeek}
            onChange={handleChangeWeek}
            allowClear={false}
          />
        </ConfigProvider>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              fontSize: "15px",
              margin: "50px 0",
            }}
          >
            <div style={{ flex: "1" }} className="flex flex-col gap-[15px]">
              <div>Số tiền đầu tư</div>
              <div className="text-[#CF5763] text-[20px] font-semibold">
                {formatPrice(reportGeneral?.total_investment)}
              </div>
            </div>
            <div
              style={{
                flex: "1",
                borderLeft: "1px solid #E7E7E7",
                borderRight: "1px solid #E7E7E7",
              }}
              className="flex flex-col gap-[15px]"
            >
              <div>Số tiền toàn hệ thống</div>
              <div className="text-[#CF5763] text-[20px] font-semibold">
                {formatPrice(reportGeneral?.total_investment_all_system)}
              </div>
            </div>
            <div style={{ flex: "1" }} className="flex flex-col gap-[15px]">
              <div>Số tiền hoa hồng nhận được</div>
              <div className="text-[#CF5763] text-[20px] font-semibold">
                {formatPrice(reportGeneral?.total_commission_received)}
              </div>
            </div>
          </div>
          <div>
            <div className="my-[30px] font-semibold">Lịch sử mua gói</div>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Ngày tháng</th>
                  <th>Tên gói</th>
                  <th>Số tiền</th>
                  <th>Hoa hồng (%)</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {reportGeneral?.data?.data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.created_at}</td>
                      <td>{item.name_package}</td>
                      <td>{formatPrice(item.money_change)}</td>
                      <td>{item.percent_commission}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-end">
            <Pagination
              current={reportGeneral?.data?.current_page || 1}
              total={reportGeneral?.data?.total}
              pageSize={reportGeneral?.data?.per_page || 20}
              onChange={(page) => setPage(page)}
            />
          </div>
        </>
      )}
    </OverviewReportStyle>
  );
}
