import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { useAuthStore } from "../../store/authStore";
import { getToken } from "../../utils/auth";
import { useUserStore } from "../../store/userStore";
import UserIcon from "../../assets/images/zin/user-zin.svg";
import AppLogo from "../../assets/images/zin/logo-zin.svg";
import UserAvatar from "../../assets/images/zin/userIcon.svg";
import { Badge, Popover } from "antd";
import BellIcon from "../../assets/icons/BellIcon";
import Notification from "../../pages/notifications";
import CartIcon from "../../assets/icons/CartIcon";
import { constants } from "../../constants";
import { io } from "socket.io-client";

const HeaderWrapperStyle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
  background-color: #fff;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
  height: 120px;
  @media (max-width: 768px) {
    display: none;
  }
  .menu {
    display: flex;
    width: 700px;
    justify-content: space-around;
  }
  .account-infomation {
    display: flex;
    gap: 20px;
    .account-infomation-item {
      text-align: center;
      cursor: pointer;
    }
  }

  .user-container {
    position: relative;
    cursor: pointer;
    text-align: center;
  }
  & > a:hover {
    color: none;
  }
  .dropdown-user {
    border: 1px solid #f5f5f5;
    display: none;
    position: absolute;
    line-height: 25px;
    background-color: #fff;
    z-index: 2;
    text-align: start;
    top: 45px;
    right: -60px;
    border-radius: 3px;
    width: 150px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    padding: 8px 12px;
    line-height: 28px;
    font-size: 16px;
  }
  .dropdown-user::after {
    content: "";
    position: absolute;
    top: -20px;
    width: 120px;
    height: 20px;
    background-color: transparent;
    z-index: 100;
  }
  .dropdown-user::before {
    content: "";
    position: absolute;
    top: -20px;
    right: 60px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #f5f5f5 transparent;
  }
  .user-container:hover .dropdown-user {
    display: block;
  }
`;

export default function Header() {
  const token = getToken();
  const location = useLocation();
  const navigate = useNavigate();
  const { getProfile, profile, getBadges, badges } = useUserStore();
  const { logout } = useAuthStore();

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <React.Fragment>
      <HeaderWrapperStyle>
        <Link to="/">
          <img src={AppLogo} alt="app-logo"></img>
        </Link>
        <div className="menu">
          <Link to="/">
            <div
              style={{
                color: location.pathname === "/" ? "#CF5763" : "#000",
              }}
            >
              Trang chủ
            </div>
          </Link>
          <Link to="/member">
            <div
              style={{
                color: location.pathname === "/member" ? "#CF5763" : "#000",
              }}
            >
              Thành viên
            </div>
          </Link>
          <Link to="/products">
            <div
              style={{
                color: location.pathname === "/products" ? "#CF5763" : "#000",
              }}
            >
              Sản phẩm
            </div>
          </Link>
          {/* <Link
            to="/aboutUs"
            style={{
              color: location.pathname === "/aboutUs" ? "#CF5763" : "#000",
            }}
          >
            Về chúng tôi
          </Link> */}
          <Link
            to="/blog"
            style={{
              color: location.pathname === "/blog" ? "#CF5763" : "#000",
            }}
          >
            Blog
          </Link>
        </div>
        <div className="account-infomation">
          {location.pathname !== "/notifications" && (
            <Popover
              placement="bottomRight"
              content={<Notification isPopup={true} />}
              title=""
              trigger="click"
              width={300}
            >
              <div className="text-center cursor-pointer group">
                <Badge count={badges.notification_unread}>
                  <BellIcon className="group-hover:text-[#CF5763]" />
                </Badge>
                <div className="group-hover:text-[#CF5763]">Thông báo</div>
              </div>
            </Popover>
          )}
          <Link
            to="/gio-hang"
            className="account-infomation-item text-[#000] relative hover:text-[#CF5763]"
          >
            <Badge count={badges.cart_quantity}>
              <CartIcon />
            </Badge>
            <div>Giỏ hàng</div>
          </Link>
          {token ? (
            <div className="user-container">
              <img
                style={{ width: "24px", height: "25px", borderRadius: "50%" }}
                src={
                  profile.avatar_image !== null
                    ? profile.avatar_image
                    : UserAvatar
                }
              />
              <div>{profile.name}</div>
              <div className="dropdown-user">
                <div>
                  <Link
                    to="/ho-so"
                    className="py-2 hover:text-[#CF5763] text-[#383838]"
                  >
                    Hồ sơ
                  </Link>
                </div>
                <div className="my-2">
                  <Link
                    to="/don-hang"
                    className="py-2 hover:text-[#CF5763] text-[#383838]"
                  >
                    Đơn mua
                  </Link>
                </div>
                <div
                  onClick={handleLogout}
                  className="hover:text-[#CF5763] text-[#383838]"
                >
                  Đăng xuất
                </div>
              </div>
            </div>
          ) : (
            <Link className="account-infomation-item" to="/login">
              <img src={UserIcon} alt="user-icon"></img>
              <div>Đăng nhập</div>
            </Link>
          )}
        </div>
      </HeaderWrapperStyle>
    </React.Fragment>
  );
}
