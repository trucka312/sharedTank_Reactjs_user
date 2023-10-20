import styled from "styled-components";
import { useState } from "react";
import { Modal } from "antd";
import ChangeAddress from "../../setting/child/ChangeAddress";

const AddressPopupStyle = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  .wrapper {
    background-color: #fff;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 6px;
    width: 600px;
  }
`;

export default function AddressPopup(props) {
  const handleChooseAddress = (address) => {
    setSelectedAddress(address);
    getListShipper({ id_address_customer: address.id });
    handleClosePopup();
  };
  const {
    listShippingAddress,
    setSelectedAddress,
    handleClosePopup,
    getListShipper,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <AddressPopupStyle>
      <div className="wrapper">
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
            footer={null}
            centered={false}
          >
            <ChangeAddress
              handleOk={handleOk}
              handleClose={handleCancel}
              // record={selectedRecord}
            />
          </Modal>
        )}
        <div className="flex justify-between items-center">
          <div className="text-[16px] font-semibold">Địa chỉ giao hàng</div>
          <div
            className="cursor-pointer text-[20px]"
            onClick={() => handleClosePopup()}
          >
            x
          </div>
        </div>
        <div className="overflow-y-auto h-[400px]">
          <div
            className="text-[#CF5763] cursor-pointer "
            onClick={() => setIsModalOpen(true)}
          >
            Thêm địa chỉ
          </div>
          {listShippingAddress.map((item) => {
            return (
              <div key={item.id} className="p-[14px] mt-[14px] shadow-md">
                <div className="pt-[7px] pb-[10px]">
                  {item.name} - {item.phone}
                </div>
                <div className="mt-[7px]">
                  {`Địa chỉ: ${item.address_detail}, ${item.wards_name}, ${item.district_name}, ${item.province_name}`}
                </div>
                <div className="mt-[7px] flex justify-between">
                  <div></div>
                  <button
                    className="bg-[#cf5763] text-[#fff] py-[7px] px-[7px] rounded-[5px] border-none cursor-pointer"
                    onClick={() => handleChooseAddress(item)}
                  >
                    Giao đến địa chỉ này
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AddressPopupStyle>
  );
}
