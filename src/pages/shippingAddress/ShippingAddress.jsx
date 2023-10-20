import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Skeleton } from 'antd';
const { confirm } = Modal;

import { useUserStore } from '../../store/userStore.js';
import ChangeAddress from '../setting/child/ChangeAddress.jsx';
import { alerts } from '../../utils/alerts.js';

const ShippingAddress = () => {
  const navigate = useNavigate();
  const { getAllShippingAddress, listShippingAddress, loadingShippingAddress, deleteShippingAdd } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  useEffect(() => {
    getAllShippingAddress();
    setSelectedRecord(null);
  }, [navigate]);

  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const showConfirmModal = (id) => {
    confirm({
      title: (<p style={{color: '#ff8383', fontWeight: 500}}>Bạn có chắc muốn xóa địa chỉ này ?</p>),
      content: 'Hành động này sẽ không thể hoàn tác !',
      onOk() {
        handleDelShippingAdd(id);
      },
      onCancel() {
        
      },
      okButtonProps: {
        className: 'bg-[#CF5763] text-[#fff]',
      },
      cancelText: 'Hủy',
      closeIcon: true,
    });
  };

  const showUpdateModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleDelShippingAdd = (id) => {
    deleteShippingAdd(id, () => {alerts.success('Xóa thành công địa chỉ nhận hàng', getAllShippingAddress()), (err) => {
      alerts.error(err || 'Có lỗi xảy ra !');
    }})
  }

  return (
    <div className="bg-white px-[20px] mb-[20px] pb-[10px] rounded-[8px]">
      {isModalOpen && <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        <ChangeAddress handleOk={handleOk} handleClose={handleCancel} record={selectedRecord}/>
      </Modal>}
      <div className="pt-[15px]">
        <div className="flex items-center justify-between xs:flex-col xs:gap-3 xs:items-start">
          <div>
            <p className="font-bold text-[16px] xs:text-[12px]">ĐỊA CHỈ NHẬN HÀNG CỦA TÔI</p>
          </div>
          <div
            className="flex xs:text-[12px] mr-[20px] items-center px-[10px] py-[7px] gap-[10px] rounded-[5px] bg-[#cf5763] text-white w-[175px] h-[40px] xs:w-fit xs:py-0 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="fas fa-plus"></i>
            <span>Thêm địa chỉ mới</span>
          </div>
        </div>
      </div>
      <div className="mt-[50px] xs:mt-6">
        {loadingShippingAddress ? (
          <div className="pb-[20px]">
            <Skeleton active />
          </div>
        ) : (
          listShippingAddress && listShippingAddress.length > 0 &&
          listShippingAddress.map((record, index) => (
            <React.Fragment key={index}>
              <div className="flex justify-between border-[2px] border-solid border-b-[#f5f5f5] border-t-0 border-x-0 mt-[20px] pb-[26px] xs:pb-3 pr-[30px] xs:pr-4 xs:text-[12px]">
                <div className="leading-[23px] ">
                  <p>
                    <span>{record?.name || ''}</span> | <span>{record?.phone}</span>
                  </p>
                  <p>
                    <span>{record?.address_detail}</span>
                    {', '}
                    <span>{record?.wards_name}</span>
                    {', '}
                    <span>{record?.district_name}</span>
                    {', '}
                    <span>{record?.province_name}</span>
                    {'.'}
                  </p>
                  {record?.is_default && (
                    <div className="rounded-[1px] text-center mt-[10px] text-[#EB5757] px-[8px] py-[6px] xs:px-1 border-[1px] border-solid border-[#EB5757] w-[90px] h-[36px] xs:text-[10px]">
                      <span>Mặc định</span>
                    </div>
                  )}
                </div>
                <div className="xs:text-[12px] xs:flex xs:gap-1">
                  <span className="text-[#2F80ED] text-[16px] xs:text-[12px] xs:w-max xs:inline-block cursor-pointer" onClick={() => showUpdateModal(record)}>Cập nhật</span>
                  <span className="text-[16px] xs:text-[12px] xs:w-max xs:inline-block cursor-pointer ml-4 text-[#EB5757]" onClick={() => showConfirmModal(record.id)}>Xóa</span>
                </div>  
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default ShippingAddress;
