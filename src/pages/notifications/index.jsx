import { Pagination } from "antd";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BuyInvestmentIcon,
  DollarIcon,
  IconRosePurse,
  ListIcon,
  NoteIcon,
  ShareWalletIcon,
  WithdrawalIcon,
} from "../../assets/icons";
import { useNotificationStore } from "../../store/notificationStore";
import { formatDate } from "../../utils/date";
import Skeleton from "./Skeleton";
import SkeletonPopup from "./SkeletonPopup";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";
import { useUserStore } from "../../store/userStore";
import { io } from "socket.io-client";
import { constants } from "../../constants";

const NEW_ORDER = "NEW_ORDER"; // Đơn hàng
const NEW_POST = "NEW_POST"; // Tin tức mới
const NEW_ORDER_REFERRAL = "NEW_ORDER_REFERRAL"; // Đơn hàng giới thiệu
const COMMISSION = "COMMISSION"; // Hoa hồng
const WALLET_COMMUNITY = "WALLET_COMMUNITY"; // Ví cộng đồng
const BUY_INVESTMENT_SUCCESS = "BUY_INVESTMENT_SUCCESS"; // Mua gói thành công
const WITHDRAWAL = "WITHDRAWAL"; // Rút tiền
const MANA = "MANA"; // Nạp tiền
const ORDER_STATUS_COMPLETE = "ORDER_STATUS_COMPLETE"; // Đơn hàng đã hoàn thành
const WALLET_MANA = "WALLET_MANA"

export default function Notification({ isPopup = false }) {
  const navigate = useNavigate();
  const divRef = useRef();
  const { widthScreen } = useGetScreenWidth();
  const {
    getAllNotifications,
    loading,
    notificationList,
    allNotificationInfo,
    readAllNotification,
    handleReceiveNoti,
    totalUnread,
    readAll,
    readOne
  } = useNotificationStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { getBadges, badges } = useUserStore();
  const query = `?page=${currentPage}`;

  const profile = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const socket = io(constants.HOST_SOCKET);
    if (profile) {
      socket.on(`notification:customer:${profile.id}`, (noti) => {
        if (noti?.id) {
          handleReceiveNoti(noti);
          getBadges();
        }
      });
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    getAllNotifications(query);
  }, [currentPage]);

  const classifiedByType = (type) => {
    if (type?.includes("ORDER_STATUS"))
      return {
        icon: <NoteIcon className="w-[24px] h-[24px]" />,
        link: "/don-hang",
      };
    switch (type) {
      case NEW_ORDER:
        return {
          icon: <NoteIcon className="w-[24px] h-[24px]" />,
          link: "/don-hang",
        };
      case NEW_POST:
        return {
          icon: <NoteIcon className="w-[24px] h-[24px]" />,
          link: "/don-hang",
        };
      case NEW_ORDER_REFERRAL:
        return {
          icon: <ListIcon />,
          link: "/don-hang",
        };
      case COMMISSION:
        return {
          icon: <IconRosePurse className="w-[24px] h-[24px]" />,
          link: "",
        };
      case WALLET_COMMUNITY:
        return {
          icon: <ShareWalletIcon className="w-[24px] h-[24px]" />,
          link: "",
        };
      case BUY_INVESTMENT_SUCCESS:
        return {
          icon: <BuyInvestmentIcon className="w-[24px] h-[24px]" />,
          link: "",
        };
      case WITHDRAWAL:
        return {
          icon: <WithdrawalIcon className="w-[24px] h-[24px]" />,
          link: "",
        };
      case MANA:
        return {
          icon: <DollarIcon className="w-[24px] h-[24px]" />,
          link: "/quan-ly-vi",
        };
      case WALLET_MANA:
        return {
          icon: <DollarIcon className="w-[24px] h-[24px]" />,
          link: "/quan-ly-vi",
        };
      case ORDER_STATUS_COMPLETE:
        return {
          icon: <DollarIcon className="w-[24px] h-[24px]" />,
          link: "/don-hang",
        };
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRedirect = (id, link, referencesValue) => {
    navigate(`${link || "/don-hang"}/${referencesValue}`);
    readOne(id)
    getBadges();
    getAllNotifications(query);
    // if (widthScreen < 576)
    //   navigate(`${link || "/don-hang"}/${referencesValue}`);
    // if (!isPopup) navigate(`${link || "/don-hang"}/${referencesValue}`);
  };

  const handleReadAll = () => {
    const onSuccess = () => {
      getAllNotifications(query);
      getBadges();
    };
    if (totalUnread || badges.notification_unread) {
      readAll(onSuccess);
    }
  };

  const renderContent = () => {
    if (loading && isPopup && notificationList?.length === 0)
      return (
        <div className="bg-white pt-5">
          <SkeletonPopup />
        </div>
      );

    if (loading && notificationList?.length === 0)
      return (
        <div className="bg-white pt-5">
          <Skeleton />
        </div>
      );

    if (notificationList && !notificationList.length)
      return <p className="text-center pt-5">Không có thông báo nào</p>;

    return (
      <div>
        {notificationList.map((item, index) => {
          const {
            content,
            title,
            type,
            unread,
            id,
            created_at,
            references_value,
          } = item;
          const { icon, link } = classifiedByType(type) ?? {};
          if (index > 4 && isPopup) return null;
          return (
            <div
              key={id}
              className={`p-4 xs:py-2 hover:bg-[#f5f6f7] transition duration-300 ${
                unread && "bg-[#f4eded]"
              } ${isPopup && "px-2 py-2 cursor-pointer"}`}
              onClick={() => handleRedirect(id, link, references_value)}
            >
              <div
                className={`flex justify-between items-center mb-2 ${
                  isPopup && "mb-1"
                }`}
              >
                <p className="font-medium text-[#CF5763] text-[18px] xs:text-[14px] flex gap-2 items-center ">
                  {icon}
                  {title}
                  {unread && (
                    <p className="w-[4px] h-[4px] bg-[#CF5763] rounded-full"></p>
                  )}
                </p>
                {!isPopup && (
                  <div
                    onClick={() => handleRedirect(link, references_value)}
                    className="cursor-pointer px-3 py-2 border-[1px] border-solid border-[#828282] hover:border-[#CF5763] hover:text-[#CF5763] xs:hidden"
                  >
                    Xem chi tiết
                  </div>
                )}
              </div>
              <p
                className={`text-[16px] xs:text-[14px] mb-2 ${
                  isPopup && "mb-0"
                }`}
              >
                {content}
              </p>
              <p className="text-[#383838] italic text-[14px] xs:text-[12px]">
                {formatDate(created_at, "HH:MM DD-MM-YYYY")}
              </p>
            </div>
          );
        })}
        <div
          className={`absolute left-[50%] translate-x-[-50%] ${
            isPopup ? "bottom-0" : "bottom-5"
          }`}
        >
          {isPopup && (
            <Link to="/notifications">
              <p className="text-center text-[#383838] hover:text-[#CF5763] cursor-pointer">
                Xem tất cả
              </p>
            </Link>
          )}
          {!isPopup && (
            <div className="text-center">
              <Pagination
                defaultCurrent={allNotificationInfo?.current_page || 1}
                total={allNotificationInfo?.total}
                pageSize={allNotificationInfo.per_page || 20}
                onChange={(page) => handlePageChange(page)}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`bg-white py-5 mb-5 xs:mb-0 rounded-lg min-w-[400px] xs:min-w-full min-h-[560px] xs:min-h-[calc(100vh-100px)] relative ${
        isPopup && "py-0 mb-0"
      }`}
      ref={divRef}
    >
      <div className="flex justify-between items-center pb-2">
        <p className={`pl-4 text-[20px] ${isPopup && "pl-1"}`}>Thông báo</p>
        <p
          className={`text-end pr-4 ${isPopup && "pr-1"} ${
            totalUnread || badges.notification_unread
              ? "cursor-pointer text-[#383838] hover:text-[#CF5763]"
              : "text-[#ccc]"
          }`}
          onClick={handleReadAll}
        >
          Đánh dấu tất cả là đã đọc
        </p>
      </div>
      {renderContent()}
    </div>
  );
}

Notification.propTypes = {
  isPopup: PropTypes.bool,
};
