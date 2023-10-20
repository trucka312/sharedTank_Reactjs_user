import { Badge, Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { CloseIcon, MobileMenuIcon, UserIcon } from "../../assets/icons";
import BellIcon from "../../assets/icons/BellIcon";
import CartIcon from "../../assets/icons/CartIcon";
import ImageDefault from "../../assets/images/image-default.jpg";
import AppLogo from "../../assets/images/zin/logo-zin.svg";
import { constants } from "../../constants";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { removeToken } from "../../utils/auth";

export default function HeaderMobile() {
  const navigate = useNavigate();
  const { getProfile, profile, getBadges, badges } = useUserStore();
  const { logout } = useAuthStore();

  const [isShowDrawerMainMenu, setDrawerMainMenu] = useState(false);
  const [isShowDrawerProfileMenu, setDrawerProfileMenu] = useState(false);

  useEffect(() => {
    const socket = io(constants.HOST_SOCKET);
    if (profile) {
      socket.on(
        `notification:customer:${profile.id}`,
        (noti) => {
          if (noti?.id) {
            getBadges();
          }
        }
      );
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    getProfile();
    getBadges();
  }, []);

  const drawerMainMenu = () => {
    const menu = [
      {
        id: 1,
        name: "Trang chủ",
        path: "/",
      },
      {
        id: 2,
        name: "Thành viên",
        path: "/member",
      },
      {
        id: 3,
        name: "Sản phẩm",
        path: "/products",
      },
      {
        id: 4,
        name: "Blog",
        path: "/blog",
      },
    ];
    return (
      <Drawer
        placement="left"
        closable={false}
        onClose={() => setDrawerMainMenu(false)}
        open={isShowDrawerMainMenu}
        width="80vw"
        className="relative"
        // key={placement}
      >
        <div className="mt-3">
          {menu.map((item) => {
            return (
              <div
                key={item.id}
                className={`py-2 px-3 text-[14px] uppercase ${
                  location.pathname === item.path && "text-[#CF5763]"
                }`}
                onClick={() => {
                  navigate(item.path);
                  setDrawerMainMenu(false);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
        <CloseIcon
          className="absolute top-4 right-4"
          onClick={() => setDrawerMainMenu(false)}
        />
      </Drawer>
    );
  };

  const drawerProfileMenu = () => {
    const menu = [
      {
        id: 1,
        name: "Báo cáo tổng quan",
        path: "/bao-cao-tong-quan",
      },
      {
        id: 2,
        name: "Lịch sử đơn hàng",
        path: "/don-hang",
      },
      {
        id: 3,
        name: "Quản lý ví",
        path: "/quan-ly-vi",
      },
      {
        id: 4,
        name: "Địa chỉ nhận hàng",
        path: "/shipping-address",
      },
      {
        id: 5,
        name: "Thông báo",
        path: "/notifications",
      },
    ];

    const handleLogout = () => {
      removeToken();
      navigate("/login");
      localStorage.removeItem("profile");
      setDrawerProfileMenu(false);
    };

    return (
      <Drawer
        placement="right"
        closable={false}
        onClose={() => setDrawerProfileMenu(false)}
        open={isShowDrawerProfileMenu}
        width="80vw"
        className="relative"
        // key={placement}
      >
        <div className="">
          <div className="flex gap-4 items-center py-4">
            <img
              src={profile?.avatar_image || ImageDefault}
              alt="avatar"
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
            <div className="flex gap-1 flex-col">
              <p className="uppercase text-[#333333] font-semibold text-[16px]">
                {profile.name}
              </p>
              {profile.customer_role && (
                <p className="text-[#A4A4A4]">{profile.customer_role}</p>
              )}
            </div>
          </div>
          <div
            className={`py-4 text-[14px] border-[1px] border-solid border-l-0 border-r-0 border-[#E7E7E7] ${
              location.pathname === "/ho-so" && "text-[#CF5763]"
            }`}
            onClick={() => {
              navigate("/ho-so");
              setDrawerProfileMenu(false);
            }}
          >
            Thông tin cá nhân
          </div>
          {menu.map((item) => {
            return (
              <div
                key={item.id}
                className={`py-4 text-[14px] ${
                  location.pathname === item.path && "text-[#CF5763]"
                }`}
                onClick={() => {
                  navigate(item.path);
                  setDrawerProfileMenu(false);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
        <div style={{ borderTop: "1px solid #E7E7E7" }}>
          <div
            className={`py-4 text-[14px] ${
              location.pathname === "/cai-dat" && "text-[#CF5763]"
            }`}
            onClick={() => {
              navigate("/cai-dat");
              setDrawerProfileMenu(false);
            }}
          >
            Cài đặt
          </div>
          <div className={`py-4 text-[14px]`} onClick={handleLogout}>
            Đăng xuất
          </div>
        </div>
        <CloseIcon
          className="absolute top-4 right-8"
          onClick={() => setDrawerProfileMenu(false)}
        />
      </Drawer>
    );
  };

  return (
    <div className="bg-white py-3 fixed top-0 left-0 right-0 z-10 px-[16px] flex justify-between items-center w-[100vw]">
      <div className="w-[96px]" onClick={() => setDrawerMainMenu(true)}>
        <MobileMenuIcon className="text-[#CF5763]" />
      </div>
      <div onClick={() => navigate("/")}>
        <img
          src={AppLogo}
          alt="logo-zin"
          className="w-[32px] h-[30px] object-cover"
        />
      </div>
      <div className="flex gap-3">
        {location.pathname !== "/notifications" && (
            <div className="text-center cursor-pointer group">
              <Badge count={badges.notification_unread} size="small">
                <div
                  onClick={() => navigate("/notifications")}
                  className="p-1 w-[24px] h-[24px] flex justify-center items-center rounded-full bg-[#CF57631A]"
                >
                  <BellIcon className="text-[#CF5763]" />
                </div>
              </Badge>
            </div>
        )}
        <Badge count={badges.cart_quantity} size="small">
          <div
            onClick={() => navigate("/gio-hang")}
            className="p-1 w-[24px] h-[24px] flex justify-center items-center rounded-full bg-[#CF57631A]"
          >
            <CartIcon className="text-[#CF5763] w-[24px] h-[24px]" />
          </div>
        </Badge>
        <div
          onClick={() =>
            profile?.id ? setDrawerProfileMenu(true) : navigate("/login")
          }
          className="p-1 w-[24px] h-[24px] flex justify-center items-center rounded-full bg-[#CF57631A]"
        >
          {profile?.id ? (
            <img
              src={profile?.avatar_image || ImageDefault}
              alt="avatar"
              className="w-[24px] h-[24px] rounded-full object-cover"
            />
          ) : (
            <UserIcon className="text-[#CF5763] w-[24px] h-[24px]" />
          )}
        </div>
      </div>
      {drawerMainMenu()}
      {drawerProfileMenu()}
    </div>
  );
}
