import styled from "styled-components";
import { useEffect } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Switch } from "antd";

import { useUserStore } from "../../../store/userStore";
import { alerts } from "../../../utils/alerts.js";

const ChangeAddressStyle = styled.div`
  padding: 0 30px 10px;
  background-color: #fff;
  margin-bottom: 40px;
  @media (max-width: 576px) {
    margin-bottom: 0px;
    padding: 0;
  }
  input {
    outline: none;
  }
  .form-title {
    padding: 15px 0;
  }
  .form {
    display: flex;
    gap: 20px;
    @media (max-width: 576px) {
      flex-direction: column;
      gap: 0;
    }
    .form-col {
      flex: 1;
      .form-item {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 20px 0;
        @media (max-width: 576px) {
          margin: 14px 0 0 0;
        }
        .form-label {
          font-weight: 600;
        }
        .form-input {
          border: 1px solid #cdc3c3;
          padding: 10px;
          border-radius: 4px;
        }
        .id-container {
          display: flex;
          gap: 30px;
        }
        .id-img {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      }
    }
  }
  .button-container {
    text-align: end;
    button {
      background-color: #cf5763;
      color: #fff;
      width: 150px;
      padding: 10px 0;
      border-radius: 6px;
    }
  }
`;

export default function ChangeAddress({ handleOk, handleClose, record }) {
  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    province: null,
    district: null,
    ward: null,
    address_detail: "",
    is_default: false,
  });
  const {
    createAddress,
    getProvinces,
    getDistricts,
    getWards,
    listProvinces,
    listDistricts,
    listWards,
    profile,
    getAllShippingAddress,
    loadingCreate,
    updateShipAdd,
  } = useUserStore();

  const formatListProvinces = listProvinces.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const formatListDistricts = listDistricts.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const formatListWards = listWards.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  useEffect(() => {
    if (record) {
      getProvinces();
      getDistricts(record?.province);
      getWards(record?.district);
      setAddressForm({
        province: { value: record?.province, label: record?.province_name },
        district: { value: record?.district, label: record?.district_name },
        ward: { value: record?.wards, label: record?.wards_name },
        address_detail: record?.address_detail,
        is_default: record?.is_default,
        phone: record?.phone,
        name: record?.name,
      });
    } else {
      getProvinces();
    }

    return () => {
      setAddressForm({
        province: null,
        district: null,
        ward: null,
        address_detail: "",
        is_default: false,
      });
    };
  }, [record]);

  const handleChangeDistrict = (district) => {
    setAddressForm((prevForm) => ({
      ...prevForm,
      district,
      ward: null,
    }));
    getWards(district.value);
  };

  const handleChangeProvince = (province) => {
    setAddressForm((prevForm) => ({
      ...prevForm,
      province,
      district: null,
      ward: null,
    }));
    getDistricts(province.value);
  };

  const handleChangeWard = (ward) => {
    setAddressForm((prevForm) => ({
      ...prevForm,
      ward,
    }));
  };

  const handleChangeAddressDetail = (e) => {
    setAddressForm((prevForm) => ({
      ...prevForm,
      address_detail: e.target.value,
    }));
  };

  const handleAddAddress = () => {
    const data = {
      name: addressForm.name,
      address_detail: addressForm.address_detail,
      country: 1,
      province: addressForm.province.value,
      district: addressForm.district.value,
      wards: addressForm.ward.value,
      email: profile.email,
      phone: addressForm.phone,
      is_default: addressForm.is_default,
    };
    createAddress(
      data,
      () => {
        getAllShippingAddress(), handleOk();
      },
      (err) => {
        alerts.error(err || "Có lỗi xảy ra");
      }
    );
  };

  const handleUpdate = () => {
    const data = {
      name: addressForm.name,
      address_detail: addressForm.address_detail,
      country: 1,
      province: addressForm.province.value,
      district: addressForm.district.value,
      wards: addressForm.ward.value,
      email: profile.email,
      phone: addressForm.phone,
      is_default: addressForm.is_default,
    };
    updateShipAdd(
      record?.id,
      data,
      () => {
        alerts.success("Cập nhật thành công địa chỉ giao hàng"),
          getAllShippingAddress(),
          handleOk();
      },
      (err) => {
        alerts.error(err || "Có lỗi xảy ra !");
      }
    );
  };

  const handleSwitchChange = (state) => {
    setAddressForm((prevForm) => ({
      ...prevForm,
      is_default: state,
    }));
  };

  const handleChangeUserName = (e) => {
    setAddressForm((prevForm) => ({
      ...prevForm,
      name: e.target.value,
    }));
  };

  const handleChangePhoneNumber = (e) => {
    setAddressForm((prevForm) => ({
      ...prevForm,
      phone: e.target.value,
    }));
  };

  return (
    <ChangeAddressStyle>
      <div className="form-title">
        <h3>
          {record ? "Cập nhật địa chỉ nhận hàng" : "Thêm địa chỉ giao hàng"}
        </h3>
      </div>
      <div>
        <div className="form">
          <div className="form-col">
            <div className="form-item">
              <label className="form-label">Họ tên: </label>
              <input
                value={addressForm.name}
                type="text"
                className="form-input"
                placeholder="Nhập tên người nhận hàng"
                onChange={handleChangeUserName}
                tabIndex={1}
              />
            </div>
            <div className="form-item">
              <label className="form-label">Thành phố/Tỉnh:</label>
              <Select
                options={formatListProvinces}
                placeholder="Chọn tỉnh thành phố"
                onChange={(value) => handleChangeProvince(value)}
                value={addressForm.province}
                tabIndex={3}
              />
            </div>
            <div className="form-item">
              <label className="form-label">Phường/Xã:</label>
              <Select
                options={formatListWards}
                placeholder="Chọn phường/xã"
                onChange={(value) => handleChangeWard(value)}
                value={addressForm.ward}
                tabIndex={5}
              />
            </div>
          </div>
          <div className="form-col">
            <div className="form-item">
              <label className="form-label">Số điện thoại:</label>
              <input
                value={addressForm?.phone}
                type="text"
                className="form-input"
                placeholder="Nhập số điện thoại người nhận hàng"
                onChange={handleChangePhoneNumber}
                tabIndex={2}
              />
            </div>
            <div className="form-item">
              <label className="form-label">Quận/Huyện</label>
              <Select
                options={formatListDistricts}
                placeholder="Chọn quận/huyện"
                onChange={(value) => handleChangeDistrict(value)}
                value={addressForm.district}
                tabIndex={4}
              />
            </div>
            <div className="form-item">
              <label className="form-label">Địa chỉ chi tiết:</label>
              <input
                value={addressForm.address_detail}
                type="text"
                className="form-input"
                placeholder="Nhập số nhà/số phòng..."
                onChange={handleChangeAddressDetail}
                tabIndex={6}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end xs:mt-4">
          <span>Đặt làm địa chỉ mặc định :</span>
          <Switch
            size="large"
            onChange={(state) => handleSwitchChange(state)}
            defaultChecked={record ? record.is_default : false}
            className="ml-[30px]"
            // checkedChildren={<i className="fas fa-check-circle"></i>}
            // unCheckedChildren={<i className="far fa-times-circle"></i>}
          />
        </div>

        <div className="mt-[20px] flex justify-end">
          <Button
            size="large"
            className="px-[20px] xs:text-[12px]"
            onClick={() => handleClose()}
          >
            Hủy
          </Button>
          <Button
            size="large"
            type="primary"
            className="ml-[20px] px-[40px] xs:text-[12px]"
            loading={loadingCreate}
            onClick={record ? handleUpdate : handleAddAddress}
          >
            {record ? "Cập nhật" : "Lưu địa chỉ"}
          </Button>
        </div>
      </div>
    </ChangeAddressStyle>
  );
}

ChangeAddress.propTypes = {
  handleOk: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  record: PropTypes.shape({
    province: PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    }),
    district: PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    }),
    ward: PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    }),
    address_detail: PropTypes.string,
    is_default: PropTypes.bool,
  }),
};
