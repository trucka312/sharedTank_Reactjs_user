import styled from "styled-components";
import { Link } from "react-router-dom";

import { formatPrice } from "../../utils/index.js";
import TransactionNotifyIcon from "../../assets/images/zin/transaction-notification.svg";

const TransactionNotifyStyle = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  .wrapper {
    background-color: #fff;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: center;
    border-radius: 6px;
  }
`;
export default function TransactionNotify(props) {
  const { isRecharge, money, handleRecharge } = props;
  return (
    <TransactionNotifyStyle>
      <div className="wrapper">
        <div className="icon">
          <img src={TransactionNotifyIcon} alt="notify" />
        </div>
        <div className="title">
          {isRecharge
            ? "Yêu cầu nạp tiền thành công"
            : "Yêu cầu rút tiền thành công"}
        </div>
        <div style={{ width: "400px", margin: "0 auto" }}>
          {isRecharge ? (
            <div>
              Số tiền{" "}
              <span style={{ color: "#CF5763" }}>{formatPrice(money)}</span> của
              bạn đang trong quá trình xử lý
            </div>
          ) : (
            <div>
              Số tiền{" "}
              <span style={{ color: "#CF5763" }}>{formatPrice(money)}</span> của
              bạn sẽ bị đóng băng để chờ duyệt. Số tiền này không thể giao dịch
              trong quá trình xử lý`
            </div>
          )}
        </div>
        <Link
          style={{
            backgroundColor: "#CF5763",
            color: "#fff",
            padding: "10px 5px",
            borderRadius: "6px",
            width: "500px",
            cursor: "pointer",
          }}
          to="/quan-ly-vi"
        >
          Ok
        </Link>
      </div>
    </TransactionNotifyStyle>
  );
}
