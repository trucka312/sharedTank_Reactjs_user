import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { formatPrice } from "../../../utils";
import TransactionNotify from "../../../components/TransactionNotify/TransactionNotify";
import { useWalletStore } from "../../../store/walletStore";
import { wallet } from "../../../services/wallet";

export default function WithDraw() {
  const navigate = useNavigate();
  const { getCustomerWallet, customerWallet } = useWalletStore();
  const [loading, setLoading] = useState(false);
  const [money, setMoney] = useState(0);
  const [showNotify, setShowNotify] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeWithDraw = searchParams.get("type_withdrawal");
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 17,
      }}
      spin
    />
  );

  useEffect(() => {
    if (!typeWithDraw) {
      navigate("/quan-ly-vi");
    } else {
      getCustomerWallet();
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const handleCloseNotify = () => {
    setShowNotify(false);
  };

  const handleClick = (e) => {
    e.preventDefault()
    if (
      parseInt(money) < 100000
    ) {
      toast.error("Số tiền rút tối thiểu là 100.000đ");
    } else if (
      parseInt(money) > customerWallet.mana &&
      typeWithDraw === "WALLET_WITHDRAWAL_SHAREHOLDER"
    ) {
      toast.error("Số tiền muốn rút phải nhỏ hơn hoặc bằng mana");
    } else {
      setLoading(true);
      const dataToExport = {
        is_withdrawal: true,
        images: [],
        money: parseInt(money),
        type_withdrawal: typeWithDraw,
      };
      wallet
        .requestWithDraw(dataToExport)
        .then((res) => {
          if (res.data.code === 200) {
            setShowNotify(true);
          } else {
            toast.error(res.data.msg);
          }
        })
        .catch((err) => toast.error(err.response.data.msg))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="mt-[20px]">
      {showNotify && (
        <TransactionNotify
          isRecharge={false}
          handleCloseNotify={handleCloseNotify}
          money={money}
        />
      )}
      <div className="mx-auto w-4/5 bg-[#fff] p-[20px] xs:w-full">
        <div
          className="text-[#CF5763] flex items-center gap-[10px] cursor-pointer"
          onClick={goBack}
        >
          <i className="fas fa-arrow-left"></i>
          <span>Quay lại</span>
        </div>

        <form
          className="text-center text-[20px] font-medium py-[40px]"
          onSubmit={handleClick}
        >
          <div className="w-2/5 m-[30px_auto] text-start text-[16px] ">
            Số dư:{" "}
            <span style={{ color: "#CF5763" }}>
              {typeWithDraw === "WALLET_WITHDRAWAL_SHAREHOLDER"
                ? formatPrice(customerWallet.balance_shareholder)
                : formatPrice(customerWallet?.account_balance)}
            </span>
          </div>
          {typeWithDraw === "WALLET_WITHDRAWAL_SHAREHOLDER" && (
            <div className="w-2/5 m-[30px_auto] text-start text-[16px]">
              Mana: {formatPrice(customerWallet?.mana)}
            </div>
          )}
          <div>Số tiền bạn muốn rút</div>
          <div className="w-2/5 m-[30px_auto] xs:w-full">
            <input
              value={formatPrice(money, true)}
              placeholder="Nhập tiền bạn muốn rút"
              onChange={(e) => setMoney(e.target.value.replace(/[^0-9]/g, ""))}
              style={{
                width: "100%",
                border: "1px solid #CF5763",
                borderRadius: "8px",
                padding: "30px 20px",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{
                fontStyle: "italic",
                color: "#535353",
                fontSize: "13px",
                textAlign: "start",
              }}
            >
              {typeWithDraw === "WALLET_WITHDRAWAL_SHAREHOLDER"
                ? "Số tiền muốn rút phải nhỏ hơn hoặc bằng mana"
                : "Bạn có thể rút tối thiểu là 100.000đ"}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-2/5 bg-[#cf5763] rounded-[8px] p-[15px_20px] text-[#fff] cursor-pointer border-none xs:w-full"
              disabled={loading}
            >
              {loading ? (
                <Spin
                  indicator={antIcon}
                  className="text-[#fff] w-[15px] h-[15px]"
                  size="small"
                />
              ) : (
                "Rút tiền"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
