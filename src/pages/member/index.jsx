import { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { Skeleton } from "antd";

import { formatPrice } from "../../utils/index.js";
import affilicate_img from "../../assets/images/member_affilicate.png";
import saller_benifit_img from "../../assets/zin/seller-benefit.svg";
import { useMemberStore } from "../../store/memberStore.js";
import { alerts } from "../../utils/alerts.js";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/auth.js";
import { useUserStore } from "../../store/userStore.js";

const MemberStyle = styled.div`
  background-color: #f7f8f9;
  .member-wrapper {
    width: 80%;
    margin: 0 auto;
    padding-top: 25px;
    @media (max-width: 475px) {
      width: 100%;
      padding: 25px 16px 0;
    }
  }
  .member-option {
    display: flex;
    gap: 10px;
  }
  .bonus-sharing {
    width: 80%;
    margin: 60px auto;
    @media (max-width: 475px) {
      width: 100%;
      padding: 25px 16px 16px;
      margin: 0 auto;
    }
  }
  table {
    width: 100%;
  }
  table th {
    background-color: #fbf4f5;
    color: #cf5763;
    width: 20%;
    padding: 20px 0;
  }
  table td {
    border: none;
    text-align: center;
    padding: 8px 12px;
  }
`;

export default function Member() {
  const {
    getRewardPolicies,
    rewardPolicies,
    getTierRevenues,
    bonusSharing,
    getShareholderInvestments,
    shareHolderInvestment,
    loadingRewardPolicies,
    loadingBonusSharing,
    loadingShareHolder,
  } = useMemberStore((state) => state);
  const location = useLocation();
  const [role, setRole] = useState("seller");
  const { profile } = useUserStore();
  const token = getToken();
  const navigate = useNavigate();

  const checkPosition = (position) => {
    switch (position) {
      case 0:
        return "Aff";
      case 1:
        return "Người bán hàng";
      case 2:
        return "Bể đồng chia";
      case 3:
        return "Cổ đông sáng lập";
      case 4:
        return "Cổ đông góp vốn";
      default:
        return "";
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryValue = queryParams.get("role");
    if (!queryValue) {
      setRole("seller");
    } else {
      setRole(queryValue);
    }
    if (queryValue === "partner") {
      getShareholderInvestments(
        () => {},
        (err) => {
          alerts.error(err || "Có lỗi xảy ra !");
        }
      );
    } else {
      getRewardPolicies(
        () => {},
        (err) => {
          alerts.error(err || "Có lỗi xảy ra !");
        }
      );
      getTierRevenues(
        () => {},
        (err) => {
          alerts.error(err || "Có lỗi xảy ra !");
        }
      );
    }
  }, [location]);

  return (
    <MemberStyle>
      {role === "seller" ? (
        <div className="">
          <div className="member-wrapper">
            <div
              className={`flex xs:flex-col xs:gap-4 ${
                !profile.customer_role
                  ? "justify-between"
                  : "justify-center"
              }`}
            >
              {/* {profile.customer_role === null && ( */}
              {!profile.customer_role && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    lineHeight: "24px",
                  }}
                >
                  <img
                    src={affilicate_img}
                    alt="benefit-img"
                    style={{ marginBottom: "20px" }}
                    className="w-[285px]"
                  />
                  <div className="text-center">
                    Bỏ vốn <span style={{ color: "#CF5763" }}>100.000vnđ</span>{" "}
                    sẽ được hưởng 20%, hưởng bể đồng chia
                  </div>
                  <div className="text-center">
                    Mời được người khác nhận ngay{" "}
                    <span style={{ color: "#CF5763" }}>30% + 50,000 Mana</span>
                  </div>
                  <div
                    style={{
                      color: "#CF5763",
                      border: "1px solid #CF5763",
                      backgroundColor: "#fff",
                      width: "250px",
                      padding: "10px",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      marginTop: "15px",
                    }}
                    onClick={() => {
                      if (token) {
                        navigate("/transaction/reg-affiliate?money=100000");
                      } else {
                        navigate("/register");
                      }
                    }}
                  >
                    Đăng ký làm Affiliate
                  </div>
                </div>  
              )}

              {/* )} */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  lineHeight: "24px",
                }}
              >
                <img
                  src={saller_benifit_img}
                  alt="benefit-img"
                  style={{ marginBottom: "20px" }}
                  className="w-[285px]"
                />
                <div className="text-center">
                  Bỏ vốn <span style={{ color: "#CF5763" }}>100.000vnđ</span> sẽ
                  được hưởng 40%, hưởng bể đồng chia
                </div>
                <div className="text-center">
                  Được tham gia vào hội cổ đông và chia thưởng lợi tức
                </div>
                <div
                  className="text-[#fff] bg-[#CF5763] w-[250px] p-[10px] rounded-[5px] text-center cursor-pointer mt-[15px] border border-solid border-[#CF5763]"
                  onClick={() => navigate("/member?role=partner")}
                >
                  Đăng ký làm nhà bán hàng
                </div>
              </div>
            </div>
          </div>
          <div className="bonus-sharing">
            <div>
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  margin: "20px 0",
                }}
              >
                Chính sách chia thưởng
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Đối tượng</th>
                    <th>Chia thưởng</th>
                    <th>Thuế thu nhập cá nhân</th>
                    <th>Điều kiện</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "#fff" }}>
                  {loadingRewardPolicies ? (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan={4} className="px-[12px] py-[18px]">
                        <Skeleton active />
                      </td>
                    </tr>
                  ) : (
                    rewardPolicies?.length &&
                    rewardPolicies?.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{checkPosition(item.type)}</td>
                          <td>{item.percent_share_award}%</td>
                          <td>{item.personal_income_tax}%</td>
                          <td>{formatPrice(item.condition, true)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <div style={{ lineHeight: "24px" }}>
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  margin: "20px 0",
                }}
              >
                Bể đồng chia
              </div>
              <div style={{ marginBottom: "10px" }}>
                Bể đồng chia "doanh thu" đội nhóm (Cá nhân + F1) theo tuần (Từ
                thứ 2 đến chủ nhật)
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Bể</th>
                    <th>Mốc doanh số tuần</th>
                    <th>Mốc</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "#fff" }}>
                  {loadingBonusSharing ? (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan={4} className="px-[12px] py-[18px]">
                        <Skeleton active />
                      </td>
                    </tr>
                  ) : (
                    bonusSharing?.length &&
                    bonusSharing?.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.tier}</td>
                          <td>{formatPrice(item.sale_target, true)}</td>
                          <td>{item.percent_target}%</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>

              <div style={{ marginTop: "10px" }}>
                - Người ở bể cao sẽ được hưởng quyền lợi của các bể phía dưới
              </div>
              <div>
                - Hàng tuần nếu chưa ai đạt được mốc 8,9,10 thì phần thưởng vẫn
                cộng dồn treo đấy, tuần sau ai đạt mốc thì chia
              </div>
              <div>- Hàng tuần reset về số 0</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[80%] mx-auto pt-[25px] xs:w-full xs:px-4">
          <div
            style={{
              color: "#CF5763",
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            Trở thành đối tác chiến lược
          </div>
          <div
            style={{ fontSize: "16px", fontWeight: "600", margin: "15px 0" }}
            className="xs:text-center"
          >
            Cổ đông
          </div>
          <div style={{ marginBottom: "15px" }} className="xs:text-center">
            Quyền lợi của cổ đông góp vốn tính theo tháng (Mùng 1 tháng này đến
            mùng 1 tháng sau) - Ngày 5 được rút
          </div>
          <table>
            <thead>
              <tr className="xs:text-[10px]">
                <th>Gói cổ đông</th>
                <th>Đầu tư</th>
                <th>Mức chia tối đa (Mana)</th>
                <th style={{ width: "27.5%" }}>Hệ số thưởng Mana bán hàng</th>
                <th className="xs:hidden"></th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "#fff" }}>
              {loadingShareHolder ? (
                <tr style={{ textAlign: "center" }}>
                  <td colSpan={4} className="px-[12px] py-[18px]">
                    <Skeleton active />
                  </td>
                </tr>
              ) : (
                shareHolderInvestment?.length &&
                shareHolderInvestment?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="xs:text-[10px]">
                        {item.shareholder_package}
                      </td>
                      <td className="xs:text-[10px]">
                        {formatPrice(item.money_invest, true)}
                      </td>
                      <td className="xs:text-[10px]">
                        {formatPrice(item.max_dividend_level, true)}
                      </td>
                      <td style={{ width: "27.5%" }}>
                        {item.sale_coefficient}
                        <div
                          className="xs:block hidden cursor-pointer w-max p-[3px_10px] mx-auto rounded-[6px] bg-[#cf5763] text-white xs:text-[10px] xs:mt-2"
                          onClick={() => {
                            if (token) {
                              navigate(
                                `/transaction/buy-package?money=${item.money_invest}`
                              );
                            } else {
                              navigate("/register");
                            }
                          }}
                        >
                          Mua gói
                        </div>
                      </td>
                      <td className="xs:hidden">
                        <div
                          style={{
                            color: "#fff",
                            backgroundColor: "#cf5763",
                            width: "max-content",
                            padding: "3px 10px",
                            margin: "0 auto",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            if (token) {
                              navigate(
                                `/transaction/buy-package?money=${item.money_invest}`
                              );
                            } else {
                              navigate("/register");
                            }
                          }}
                        >
                          Mua gói
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div style={{ margin: "15px 0 300px" }}>
            - Chia 20% doanh thu theo tỉ lệ góp vốn/tổng số vốn góp
          </div>
        </div>
      )}
    </MemberStyle>
  );
}
