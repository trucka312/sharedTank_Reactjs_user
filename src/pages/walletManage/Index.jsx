import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { formatPrice } from "../../utils";
import Tabs from "./child/Tabs";
import { useWalletStore } from "../../store/walletStore";
import AccountBalanceRed from "../../assets/images/zin/account-balance-red.svg";
import AccountBalanceWhite from "../../assets/images/zin/account-balance-white.svg";
import ShareHolderWalletWhite from "../../assets/images/zin/shareholder-wallet-white.svg";
import ShareHolderWalletRed from "../../assets/images/zin/shareholder-wallet-red.svg";
import ManaWhite from "../../assets/images/zin/mana-white.svg";
import ManaRed from "../../assets/images/zin/mana-red.svg";
import WithDrawMoney from "../../assets/images/zin/withdraw-money.svg";
import RechargeMoney from "../../assets/images/zin/recharge-money.svg";

const WalletManageStyle = styled.div`
  background-color: #fff;
  padding: 25px 15px;
  .wallet-container {
    display: flex;
    gap: 10px;
    @media (max-width: 576px) {
      flex-direction: column;
      gap: 16px;
    }
    .wallet-item {
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding: 25px 15px;
      align-items: center;
      border: 1px solid #c4c4c4;
      border-radius: 8px;
      cursor: pointer;
      .wallet-item-container {
        display: flex;
        gap: 10px;
        .wallet-item-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
      }
    }
    .withdraw-button {
      border: 1px solid #cf5763;
      display: flex;
      align-items: center;
      padding: 5px 7px;
      gap: 5px;
      border-radius: 5px;
      &:hover {
        color: #000;
      }
    }
    .recharge-button {
      display: flex;
      align-items: center;
      padding: 5px 7px;
      gap: 5px;
      border-radius: 5px;
      background-color: #cf5763;
      color: #fff;
    }
  }
  a:hover {
    color: none;
  }
`;
export default function WalletManage() {
  const { getCustomerWallet, customerWallet } = useWalletStore();
  const [walletType, setWalletType] = useState("account-balance");
  useEffect(() => {
    getCustomerWallet();
  }, []);

  return (
    <WalletManageStyle>
      <div className="wallet-container">
        <p className="xs:block hidden font-semibold">Quản lý ví</p>
        <div
          className="wallet-item"
          style={{
            backgroundColor:
              walletType === "account-balance" ? "#E86371" : "#fafafa",
          }}
          onClick={() => setWalletType("account-balance")}
        >
          <div className="wallet-item-container items-center">
            <div>
              <img
                src={
                  walletType === "account-balance"
                    ? AccountBalanceWhite
                    : AccountBalanceRed
                }
                alt="account-balance"
              />
            </div>
            <div className="wallet-item-info">
              <div
                style={{
                  color: walletType === "account-balance" ? "#fff" : "#000",
                }}
              >
                Ví hoa hồng
              </div>
              <div
                style={{
                  color: walletType === "account-balance" ? "#fff" : "#cf5763",
                }}
              >
                {formatPrice(customerWallet.account_balance)}
              </div>
              <div
                style={{
                  color: walletType === "account-balance" ? "#fff" : "#000",
                }}
              >
                Số dư chờ xử lý:{" "}
                {formatPrice(
                  customerWallet?.request_wallet_commission_current?.money || 0
                )}
              </div>
            </div>
          </div>
          <Link
            // to="/transaction/buy-package"
            to="/transaction/withdraw-money?type_withdrawal=WALLET_COMMISSION_WITHDRAWAL"
            className="withdraw-button"
            style={{
              backgroundColor: walletType === "account-balance" && "#fff",
              width: "100px",
            }}
          >
            <img src={WithDrawMoney} alt="withdraw-money" />
            <span style={{ color: "#CF5763" }}>Rút tiền</span>
          </Link>
        </div>
        <div
          className="wallet-item"
          style={{
            backgroundColor:
              walletType === "shareholder" ? "#E86371" : "#fafafa",
          }}
          onClick={() => setWalletType("shareholder")}
        >
          <div className="wallet-item-container items-center">
            <div>
              <img
                src={
                  walletType === "shareholder"
                    ? ShareHolderWalletWhite
                    : ShareHolderWalletRed
                }
                alt="shareholder-wallet"
              />
            </div>
            <div className="wallet-item-info">
              <div
                style={{
                  color: walletType === "shareholder" ? "#fff" : "#000",
                }}
              >
                Ví cổ đông
              </div>
              <div
                style={{
                  color: walletType === "shareholder" ? "#fff" : "#cf5763",
                }}
              >
                {formatPrice(customerWallet.balance_shareholder)}
              </div>
              <div
                style={{
                  color: walletType === "shareholder" ? "#fff" : "#000",
                }}
              >
                Số dư chờ xử lý:{" "}
                {formatPrice(
                  customerWallet?.request_wallet_shareholder_current?.money || 0
                )}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <Link
              to="/member?role=partner"
              className="recharge-button w-[100px]"
            >
              <img src={RechargeMoney} alt="rechare-money" />
              <span>Mua gói</span>
            </Link>
            <Link
              to="/transaction/withdraw-money?type_withdrawal=WALLET_WITHDRAWAL_SHAREHOLDER"
              className="withdraw-button"
              style={{
                backgroundColor: walletType === "shareholder" && "#fff",
                width: "100px",
              }}
            >
              <img src={WithDrawMoney} alt="withdraw-money" />
              <span style={{ color: "#CF5763" }}>Rút tiền</span>
            </Link>
          </div>
        </div>
        <div
          className="wallet-item"
          style={{
            backgroundColor: walletType === "mana" ? "#E86371" : "#fafafa",
          }}
          onClick={() => setWalletType("mana")}
        >
          <div className="wallet-item-container">
            <div>
              <img
                src={walletType === "mana" ? ManaWhite : ManaRed}
                alt="mana"
              />
            </div>
            <div className="wallet-item-info">
              <div
                style={{
                  color: walletType === "mana" ? "#fff" : "#000",
                }}
              >
                Mana
              </div>
              <div
                style={{
                  color: walletType === "mana" ? "#fff" : "#cf5763",
                }}
              >
                {formatPrice(customerWallet.mana)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Tabs walletType={walletType} />
      </div>
    </WalletManageStyle>
  );
}
