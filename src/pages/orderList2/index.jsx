import { SearchOutlined } from "@ant-design/icons";
import { Input, Tabs, Select, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounced } from "../../hooks/useDebounce";
import { useOrderStore } from "../../store/orderStore";
import OrderList from "./orderList";

export default function OrderListMain() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderStatus = searchParams.get("status");

  const { getOrdersList, allOrderInfo } = useOrderStore();
  
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [filterOrder, setFilterOrder] = useState("is_have_cus_referral");
  
  const keywordSearch = useDebounced(keyword, 300);

  const handleFilterOrder = (e) => {
    setFilterOrder(e);
    setPage(1);
  };

  useEffect(() => {
    const query = `?page=${page}&search=${keyword}${
      orderStatus
        ? `&field_by_value=${orderStatus}&field_by=${orderStatus === 'UNPAID'?'payment_status_code':'order_status_code'}${filterOrder ? `&${filterOrder}=true` : ""}`
        : `${filterOrder ? `&${filterOrder}=true` : ""}`
    }`;
    getOrdersList(query);
  }, [orderStatus, keywordSearch, page, filterOrder]);

  const configTabs = [
    { id: 1, label: <p className="px-5">Tất cả</p>, key: "" },
    { id: 2, label: "Chờ thanh toán", key: "UNPAID" },
    // { id: 3, label: "Chờ xác nhận", key: "WAITING_FOR_PROGRESSING" },
    { id: 4, label: "Đang chuẩn bị", key: "PACKING" },
    { id: 5, label: "Đang giao", key: "SHIPPING" },
    { id: 6, label: "Hoàn thành", key: "COMPLETED" },
    { id: 7, label: "Đã hủy", key: "CUSTOMER_CANCELLED" },
    { id: 8, label: "Lỗi giao hàng", key: "DELIVERY_ERROR" },
    {
      id: 9,
      label: <p className="px-5">Trả hàng/Hoàn tiền</p>,
      key: "CUSTOMER_HAS_RETURNS",
    },
  ];

  const renderChildren = () => {
    return (
      <div>
        <div className="px-5 xs:px-0">
          <Input
            placeholder="Tìm kiếm tên đơn hàng, mã đơn hàng..."
            className="py-2 w-[100%] mb-4 xs:w-[96%]"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <Select
            // onChange={handleChange}
            className="w-[200px]"
            value={filterOrder}
            onChange={handleFilterOrder}
            options={[
              { value: "is_have_cus_referral", label: "Tất cả" },
              { value: "", label: "Đơn hàng đã mua" },
              {
                value: "is_just_have_cus_referral",
                label: "Đơn hàng giới thiệu",
              },
            ]}
          ></Select>
        </div>
        <div className="h-[8px] bg-[#f7f8f9]"></div>
        <OrderList />
      </div>
    );
  };

  return (
    <div className="bg-white">
      <Tabs
        onChange={(key) => {
          navigate(`/don-hang${key ? `?status=${key}` : ""}`);
          setPage(1);
          setFilterOrder("is_have_cus_referral")
        }}
        defaultActiveKey={orderStatus || ""}
        items={configTabs.map((item) => {
          const { label, key } = item;
          return {
            label: label,
            key: key,
            children: renderChildren(),
          };
        })}
      />
      {/* <StatusTabs /> */}
      <div className="text-center py-2">
      <Pagination
        current={page}
        total={allOrderInfo.total}
        pageSize={allOrderInfo.per_page || 20}
        onChange={(page) => setPage(page)}
        className="text-end m-[20px_0px]"
      />
      </div>
    </div>
  );
}
