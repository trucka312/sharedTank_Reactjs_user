import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { constants as c } from "../../../constants";

import { useUserStore } from "../../../store/userStore";
import Identification from "../../../assets/images/zin/id-img.svg";
import { getToken } from "../../../utils/auth";

const BillingInfomationStyle = styled.div`
  padding: 0 30px 10px;
  background-color: #fff;
  margin-bottom: 40px;
  @media (max-width: 576px) {
    padding: 0 16px 20px;
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
      gap: 0px;
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
          border: 1px solid #e7e7e7;
          padding: 10px;
          border-radius: 7px;
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
      cursor: pointer;
      @media (max-width: 576px) {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
`;

export default function BillingInfomation() {
  const { userBank, getUserBank, updateUserBank } = useUserStore();
  const [billingForm, setBillingForm] = useState({
    bank_account_name: "",
    bank_account_number: "",
    bank_name: "",
    bank_name_branch: "",
    cmnd_front: null,
    cmnd_back: null,
  });
  const imgFrontRef = useRef();
  const imgBackRef = useRef();
  const [frontIdImg, setFrontIdImg] = useState(false);
  const [backIdImg, setBackIdImg] = useState(false);

  const uploadImage = async (formData) => {
    const token = getToken();
    const path = `${c.API_URL}/customer/v1/images`;
    const requestOptions = {
      method: "POST",
      headers: {
        "customer-token": token,
      },
      body: formData,
    };
    const response = await fetch(path, requestOptions);
    if (!response.ok) return "";
    const json = await response.json();
    return json.data;
  };

  const handleChangeBillingForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (e.target.files) {
      const file = e.target.files[0];
      file.image = URL.createObjectURL(file);
      value = file;
      if (name === "cmnd_front") {
        setFrontIdImg(true);
      }
      if (name === "cmnd_back") {
        setBackIdImg(true);
      }
      // setSelectedImage(true);
    }
    setBillingForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleUpdateUserBank = async () => {
    if (frontIdImg) {
      let formData = new FormData();
      formData.append("image", billingForm.cmnd_front);
      let url = await uploadImage(formData);
      billingForm.cmnd_front = url;
    } else {
      billingForm.cmnd_front = billingForm?.cmnd_front?.image;
    }

    if (backIdImg) {
      let formData = new FormData();
      formData.append("image", billingForm.cmnd_back);
      let url = await uploadImage(formData);
      billingForm.cmnd_back = url;
    } else {
      billingForm.cmnd_back = billingForm?.cmnd_back?.image;
    }
    const onSuccess = () => {
      getUserBank();
    };
    updateUserBank(billingForm, onSuccess);
  };

  useEffect(() => {
    if (Object.keys(userBank ?? {}).length > 0) {
      setBillingForm({
        bank_account_name: userBank.bank_account_name,
        bank_account_number: userBank.bank_account_number,
        bank_name: userBank.bank_name,
        bank_name_branch: userBank.bank_name_branch,
        cmnd_back: userBank.cmnd_back ? {image: userBank.cmnd_back} : null,
        cmnd_front: userBank.cmnd_front ? {image:userBank.cmnd_front} : null,
      });
      setBackIdImg(false)
      setFrontIdImg(false)
    }
  }, [userBank]);

  useEffect(() => {
    getUserBank();
  }, []);

  return (
    <BillingInfomationStyle>
      <div className="form-title">
        <h3>Thông tin thanh toán</h3>
      </div>
      <div>
        <div className="form">
          <div className="form-col">
            <div className="form-item">
              <label className="form-label">Tên chủ tài khoản:</label>
              <input
                name="bank_account_name"
                type="text"
                className="form-input"
                placeholder="Vui lòng nhập tên chủ tài khoản"
                onChange={handleChangeBillingForm}
                value={billingForm.bank_account_name}
              />
            </div>
            <div className="form-item">
              <label className="form-label">Tên ngân hàng:</label>
              <input
                name="bank_name"
                type="text"
                className="form-input"
                onChange={handleChangeBillingForm}
                placeholder="Vui lòng nhập tên ngân hàng"
                value={billingForm.bank_name}
              />
            </div>
          </div>
          <div className="form-col">
            <div className="form-item">
              <label className="form-label">Số tài khoản:</label>
              <input
                name="bank_account_number"
                type="text"
                className="form-input"
                placeholder="Vui lòng nhập số tài khoản"
                onChange={handleChangeBillingForm}
                value={billingForm.bank_account_number}
              />
            </div>
            <div className="form-item">
              <label className="form-label">Chi nhánh:</label>
              <input
                name="bank_name_branch"
                type="text"
                className="form-input"
                placeholder="Vui lòng nhập chi nhánh"
                onChange={handleChangeBillingForm}
                value={billingForm.bank_name_branch}
              />
            </div>
          </div>
        </div>
        <div className="form-item xs:mt-3">
          <label className="form-label font-semibold">Ảnh CMND/CCCD:</label>
          <div className="id-container flex gap-4 xs:flex-col">
            <div className="id-img xs:text-center">
              <div className="my-3">Mặt trước</div>
              <div
                className="cursor-pointer"
                onClick={() => imgFrontRef.current.click()}
              >
                <input
                  type="file"
                  hidden
                  name="cmnd_front"
                  onChange={handleChangeBillingForm}
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={imgFrontRef}
                />
                <img
                  src={
                    billingForm.cmnd_front
                      ? billingForm.cmnd_front.image
                      : Identification
                  }
                  className="w-[200px] h-[133px]"
                  alt="id-img"
                />
              </div>
            </div>
            <div className="id-img xs:text-center">
              <div className="my-3">Mặt sau</div>
              <div
                className="cursor-pointer"
                onClick={() => imgBackRef.current.click()}
              >
                <input
                  type="file"
                  hidden
                  name="cmnd_back"
                  onChange={handleChangeBillingForm}
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={imgBackRef}
                />
                <img
                  src={
                    billingForm.cmnd_back
                      ? billingForm.cmnd_back.image
                      : Identification
                  }
                  className="w-[200px] h-[133px]"
                  alt="id-img"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="border-none" onClick={handleUpdateUserBank}>
            Lưu
          </button>
        </div>
      </div>
    </BillingInfomationStyle>
  );
}
