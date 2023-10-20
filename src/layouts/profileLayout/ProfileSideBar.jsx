import { useLocation, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { handleCheckRole } from "../../utils";
import DefaultAvatar from "../../assets/images/zin/userIcon.svg";
import { removeToken } from "../../utils/auth";
import { useUserStore } from "../../store/userStore";
import { formatNumber } from "../../utils/index";

const ProfileSideBarStyle = styled.div`
  background-color: #fff;
  padding: 10px 15px;
  border-radius: 10px;
  .sidebar-container {
    padding: 6px;
    .user-info {
      display: flex;
      padding: 0px 16px 16px 0;
      gap: 16px;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .info-container {
        .user-name {
          font-size: 18px;
          font-weight: 600;
          line-height: 25px;
          margin-top: 4px;
        }
      }
    }
    .basic-info-link {
      border-top: 1px solid #e7e7e7;
      padding: 16px 0;
      cursor: pointer;
      font-size: 14px;
    }
    .link-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      border-top: 1px solid #e7e7e7;
      border-bottom: 1px solid #e7e7e7;
      padding: 16px 0;
      color: #333333;
      font-size: 14px;
      line-height: 19.6px;
    }
    .setting-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-top: 16px;
      .logout-btn {
        cursor: pointer;
      }
    }
  }
`;
export default function ProfileSideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useUserStore();

  const handleLogout = () => {
    removeToken();
    navigate("/");
    // dispatch(userActions.accountLogout());
  };

  return (
    <ProfileSideBarStyle>
      <div className="sidebar-container">
        <div className="user-info">
          <img
            src={
              profile.avatar_image !== null
                ? profile.avatar_image
                : DefaultAvatar
            }
          />
          <div className="info-container">
            <div className="user-name">{profile.name}</div>
            <div className="text-[14px] text-[#A4A4A4]">
              {handleCheckRole(profile.customer_role)}
            </div>
            {profile?.wallet?.level_shareholder_invest > 0 && (
              <div className="text-[14px] text-[#A4A4A4]">
                {" "}
                Max đầu tư:{" "}
                {formatNumber(profile?.wallet?.level_shareholder_invest)}đ
              </div>
            )}
          </div>
        </div>

        <Link to="/ho-so">
          <div
            className="basic-info-link"
            style={{
              fontWeight: location.pathname === "/ho-so" ? "600" : "500",
              color: location.pathname === "/ho-so" ? "#CF5763" : "#383838",
            }}
          >
            Thông tin cá nhân
          </div>
        </Link>

        <div className="link-container">
          <Link to="/bao-cao-tong-quan">
            <div
              style={{
                color:
                  location.pathname === "/bao-cao-tong-quan"
                    ? "#CF5763"
                    : "#000",
              }}
            >
              Báo cáo tổng quan
            </div>
          </Link>
          <Link to="/don-hang">
            <div
              style={{
                color: location.pathname === "/don-hang" ? "#CF5763" : "#000",
              }}
            >
              Lịch sử đơn hàng
            </div>
          </Link>

          {/* <div>Đội nhóm</div> */}
          <Link to="/quan-ly-vi">
            <div
              style={{
                color: location.pathname === "/quan-ly-vi" ? "#CF5763" : "#000",
              }}
            >
              Quản lý ví
            </div>
          </Link>

          {/* <Link to="/recharge-withdraw-history">
            <div
              style={{
                color:
                  location.pathname === "/recharge-withdraw-history"
                    ? "#CF5763"
                    : "#000",
              }}
            >
              Lịch sử nạp, rút
            </div>
          </Link> */}

          <Link to="/shipping-address">
            <div
              style={{
                color:
                  location.pathname === "/shipping-address"
                    ? "#CF5763"
                    : "#000",
              }}
            >
              Địa chỉ nhận hàng
            </div>
          </Link>
          <Link to="/notifications">
            <div
              style={{
                color:
                  location.pathname === "/notifications" ? "#CF5763" : "#000",
              }}
            >
              Thông báo
            </div>
          </Link>
        </div>

        <div className="setting-container">
          <Link to="/cai-dat">
            <div
              style={{
                color: location.pathname === "/cai-dat" ? "#CF5763" : "#000",
              }}
            >
              Cài đặt
            </div>
          </Link>
          <div className="logout-btn" onClick={handleLogout}>
            Đăng xuất
          </div>
        </div>
      </div>
    </ProfileSideBarStyle>
  );
}
