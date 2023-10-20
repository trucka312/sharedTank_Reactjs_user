import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { formatPrice } from "../../../utils/index.js";
import StepperContainer from "../../../components/Stepper/StepperContainer.jsx";
import { alerts } from "../../../utils/alerts.js";
import { useMemberStore } from "../../../store/memberStore.js";
import goBackIcon from "../../../assets/images/zin/goBack.svg";
import { useWalletStore } from "../../../store/walletStore.js";
import Loading from "../../../components/loading";

const ReChargeStyle = styled.div`
  margin-top: 20px;
  table th {
    background-color: #fbf4f5;
    color: #cf5763;
    width: 20%;
    padding: 20px 0;
  }
  table {
    font-size: 14px;
    margin: 30px auto;
  }
  table td {
    padding: 8px 12px;
  }
`;
export default function Recharge() {
  const { action } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(window.location.search);

  const money = parseFloat(urlParams.get("money"));
  const { getShareholderInvestments, shareHolderInvestment } = useMemberStore(
    (state) => state
  );
  const { requestBuyPackage, infoRequestBuyPackage, loadingBuyPackage } =
    useWalletStore();

  const [step, setStep] = useState(1);

  const handleChangeStep = () => {
    setStep(step + 1);
  };

  const goBack = () => {
    if (step > 1 && action !== "reg-affiliate") {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleBuyPackage = () => {
    const data = {
      money: money,
    };
    requestBuyPackage(
      data,
      () => {
        handleChangeStep();
      },
      (err) => {
        alerts.error(err || "Có lỗi xảy ra !");
      }
    );
  };

  useEffect(() => {
    if (action === "reg-affiliate") {
      setStep(2);
    }
    // if recharge from member page
    if (action === "buy-package") {
      setStep(2);
      handleBuyPackage(location?.state);
    } else {
      getShareholderInvestments(
        () => {},
        (err) => {
          alerts.error(err || "Có lỗi xảy ra");
        }
      );
    }
    handleBuyPackage();
  }, []);

  return (
    <ReChargeStyle>
      <div className="w-4/5 mx-auto bg-[#fff] p-[20px] xs:w-full">
        <div
          style={{
            color: "#CF5763",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={goBack}
        >
          <img src={goBackIcon} alt="" className="mt-[1px]" />
          <span>Quay lại</span>
        </div>

        <StepperContainer handleChangeStep={handleChangeStep} step={step} />
        {step === 1 && (
          <div
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "500",
              padding: "50px 0",
            }}
          >
            <div>Chọn gói bạn muốn mua</div>

            <div>
              <table>
                <thead>
                  <tr>
                    <th>Gói cổ đông</th>
                    <th>Đầu tư</th>
                    <th>Mức chia tối đa (Mana)</th>
                    <th>Hệ số thưởng Mana bán hàng</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {shareHolderInvestment?.length &&
                    shareHolderInvestment?.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.shareholder_package}</td>
                          <td>{formatPrice(item.money_invest, true)}</td>
                          <td>{formatPrice(item.max_dividend_level, true)}</td>
                          <td>{item.sale_coefficient}</td>
                          <td>
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
                              onClick={() =>
                                handleBuyPackage(item.money_invest)
                              }
                            >
                              Mua gói
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {step !== 1 && (
          <div
            style={{
              display: "flex",
              padding: "50px 0",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {loadingBuyPackage ? (
              <Loading />
            ) : (
              <div className="flex items-center gap-[30px] xs:flex-col">
                <div>
                  <img
                    src={infoRequestBuyPackage?.qr}
                    className="w-[240px]"
                    alt="qr-code"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <div>
                    Tên chủ tài khoản:{" "}
                    <span style={{ fontWeight: "600" }}>
                      {infoRequestBuyPackage?.account_name}
                    </span>
                  </div>
                  <div>
                    Số tài khoản:{" "}
                    <span className="font-bold">
                      {infoRequestBuyPackage?.account_number}
                    </span>
                  </div>
                  <div>
                    Tên ngân hàng:{" "}
                    <span className="font-bold">
                      {infoRequestBuyPackage?.bank}
                    </span>
                  </div>
                  <div>
                    Số tiền:{" "}
                    <span className="text-[#2298d0] font-bold">
                      {formatPrice(infoRequestBuyPackage?.money)}
                    </span>
                  </div>
                  <div>
                    Nội dung chuyển khoản:{" "}
                    <span className="font-bold">
                      {infoRequestBuyPackage?.code}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-[50px] w-[80%] xs:w-full">
              <p>
                - <span className="text-[#f35353]">Lưu ý: </span>{" "}
                <span>
                  Quý khách ghi nội dung mã giao dịch khi thực hiện chuyển
                  khoản. Hệ thống sẽ tự động cập nhật số dư tài khoản trong vòng
                  5 đến 10 phút. Hệ thống cập nhật số dư xong sẽ gửi email thông
                  báo cho quý khách
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </ReChargeStyle>
  );
}
