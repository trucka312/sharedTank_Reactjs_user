import styled from "styled-components";
import { useEffect, useState } from "react";

import OrderHistoryTable from "./OrderHistoryTable";
import WalletHistoryTable from "./WalletHistoryTable";
import RequestWalletTable from "./RequestWalletTable";
import InvestHolderTable from "./InvestHolderTable";

const TabsStyle = styled.div`
  margin: 30px 0;
  .tabs-container {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  table th {
    background-color: #fbf4f5;
    color: #cf5763;
    /* width: 20%; */
    padding: 20px 0;
  }
  table td {
    padding: 20px 0;
  }
  .tab {
    cursor: pointer;
  }
`;

export default function Tabs(props) {
  const { walletType } = props;

  const [typeTab, setTypeTab] = useState("");

  const renderWalletTabs = () => {
    switch (walletType) {
      case "account-balance":
        return [
          { type: "ORDER_HISTORY", title: "Lịch sử đơn hàng" },
          {
            type: "WALLET_COMMISSION",
            title: "Lịch sử thay đổi số dư hoa hồng",
          },
          {
            type: "HISTORY_REQUEST_WALLET",
            title: "Yêu cầu rút tiền",
          },
        ];
      case "shareholder":
        return [
          {
            type: "WALLET_SHAREHOLDER",
            title: "Lịch sử thay đổi ví cổ đông",
          },
          {
            type: "WALLET_INVEST_SHAREHOLDER",
            title: "Lịch sử đầu tư",
          },
          {
            type: "WITHDRAW_HISTORY",
            title: "Lịch sử rút tiền",
          }
        ];
      case "mana":
        return [
          { type: "ORDER_HISTORY", title: "Lịch sử đơn hàng" },
          { type: "WALLET_MANA", title: "Lịch sử thay đổi số dư mana" },
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    setTypeTab(renderWalletTabs()[0].type);
  }, [walletType]);

  return (
    <TabsStyle>
      <div className="tabs-container overflow-x-auto">
        {renderWalletTabs().map((item, key) => {
          return (
            <div
              key={key}
              className="tab"
              onClick={() => setTypeTab(item.type)}
              style={{
                borderBottom: item.type === typeTab && "3px solid #e86371",
                color: item.type === typeTab && "#e86371",
                paddingBottom: "5px",
                whiteSpace:"nowrap"
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      {typeTab === "ORDER_HISTORY" && <OrderHistoryTable />}

      {(typeTab === "WALLET_COMMISSION" ||
        typeTab === "WALLET_SHAREHOLDER" ||
        typeTab === "WALLET_MANA") && (
        <WalletHistoryTable main_type={typeTab} />
      )}

      {typeTab === "WALLET_INVEST_SHAREHOLDER" && (
        <InvestHolderTable main_type={typeTab} />
      )}

      {(typeTab === "HISTORY_REQUEST_WALLET" || typeTab === "WITHDRAW_HISTORY") && <RequestWalletTable main_type={typeTab}/>}
    </TabsStyle>
  );
}
