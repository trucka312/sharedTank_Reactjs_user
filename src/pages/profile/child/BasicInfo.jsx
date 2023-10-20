import { useState, useRef } from "react";
import styled from "styled-components";
import ReactDatePicker from "react-datepicker";
import {message} from 'antd'

import { useUserStore } from "../../../store/userStore";
import { getToken } from "../../../utils/auth";
import { constants as c } from "../../../constants";
import UploadIcon from "../../../assets/images/zin/upload-avatar.svg";
import UserAvatar from "../../../assets/images/zin/userIcon.svg";

const BasicInfoStyle = styled.div`
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
  .avatar-container {
    display: flex;
    gap: 20px;
    .avatar-img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
      @media (max-width: 576px) {
        width: 70px;
        height: 70px;
      }
    }
    .avatar-change-button {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 15px;
    }
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
        .gender-container {
          display: flex;
          gap: 30px;
          .gender-label {
            display: flex;
            align-items: center;
            gap: 5px;
            cursor: pointer;
          }
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
      @media (max-width: 576px) {
        width: 100%;
      }
    }
  }
  .react-datepicker-wrapper {
    display: inline-block;
    padding: 0;
    border: 0;
    width: 100%;
  }
  .react-datepicker__input-container {
    position: relative;
    display: inline-block;
    width: 100%;
    input {
      padding: 10px;
      border-radius: 7px;
      outline: none;
    }
  }
`;
export default function BasicInfo(props) {
  const [selectedImage, setSelectedImage] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const inputRef = useRef();
  const { information, setInformation, profile } = props;
  const { updateProfile, getProfile } = useUserStore();

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

  const handleUpdateProfile = async () => {
    if (selectedImage) {
      let formData = new FormData();
      formData.append("image", information.avatar_image);
      let url = await uploadImage(formData);
      information.avatar_image = url;
    } else {
      information.avatar_image = information?.avatar_image?.image;
    }
    const onSuccess = () => {
      getProfile();
    };
    updateProfile(information, onSuccess);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.origin + `?cowc_id=${profile?.id}`)
      .then(() => {
        messageApi.open({
          type: "success",
          content: "Đã sao chép",
        });
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "Sao chép thất bại",
        });
      });
  };

  const handleChangeInputInfomation = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (e.target.files) {
      const file = e.target.files[0];
      file.image = URL.createObjectURL(file);
      value = file;
      setSelectedImage(true);
    }
    setInformation((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <BasicInfoStyle>
      {contextHolder}
      <div className="form-title">
        <h3>Thông tin cơ bản</h3>
      </div>
      <div>
        <div className="avatar-container">
          <div>
            <img
              src={
                information.avatar_image !== null
                  ? information.avatar_image.image
                  : UserAvatar
              }
              loading="lazy"
              alt=""
              className="avatar-img"
            />
            <div
              className="avatar-change-button"
              onClick={() => inputRef.current.click()}
            >
              <input
                type="file"
                hidden
                name="avatar_image"
                onChange={handleChangeInputInfomation}
                accept="image/*"
                style={{ display: "none" }}
                ref={inputRef}
              />
              <img src={UploadIcon} />
              <div className="xs:w-max">Ảnh đại diện</div>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <div>Người giới thiệu</div>
              <div>{profile.link_referral}</div>
            </div>
            <div>
              <div className="xs:flex xs:flex-col">
                Link giới thiệu:{" "}
                <span className="text-[#CF5763] cursor-pointer" onClick={copyToClipboard}>
                  {/* https://zinv2.ikitech.vn?cowc_id={profile?.id} */}
                  {window.location.origin + `?cowc_id=${profile?.id}`}
                  {/* {link_referral} */}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="form">
          <div className="form-col">
            <div className="form-item">
              <label className="form-label">Họ tên:</label>
              <input
                name="name"
                type="text"
                value={information.name || ""}
                onChange={handleChangeInputInfomation}
                className="form-input"
              />
            </div>
            <div className="form-item">
              <label className="form-label">Email:</label>
              <input
                name="email"
                type="text"
                value={information.email || ""}
                onChange={handleChangeInputInfomation}
                className="form-input"
              />
            </div>

          </div>
          <div className="form-col">
            <div className="form-item">
              <label className="form-label">Số điện thoại:</label>
              <input
                name="phone_number"
                type="text"
                value={information.phone_number || ""}
                onChange={handleChangeInputInfomation}
                className="form-input"
              />
            </div>
            <div className="form-item">
              <label className="form-label">Ngày sinh:</label>
              <ReactDatePicker
                className="datepicker p-[10px]"
                name="date_of_birth"
                placeholderText="Chọn ngày sinh"
                selected={information.date_of_birth}
                onChange={(date) =>
                  setInformation((prevform) => ({
                    ...prevform,
                    date_of_birth: date,
                  }))
                }
              />
            </div>
          </div>
        </div>
        <div className="form-item flex gap-4 items-center mt-[20px] xs:mt-[16px] xs:mb-8">
              <label className="form-label">Giới tính:</label>
              <div className="gender-container flex gap-4">
                <label className="gender-label flex gap-1">
                  <input
                    type="radio"
                    value={0}
                    name="sex"
                    checked={parseInt(information.sex) === 0}
                    onChange={(e) => {
                      setInformation((prevForm) => ({
                        ...prevForm,
                        sex: parseInt(e.target.value),
                      }));
                    }}
                  />
                  <span>Nam</span>
                </label>
                <label className="gender-label flex gap-1">
                  <input
                    type="radio"
                    value={1}
                    name="sex"
                    checked={parseInt(information.sex) === 1}
                    onChange={(e) => {
                      setInformation((prevForm) => ({
                        ...prevForm,
                        sex: parseInt(e.target.value),
                      }));
                    }}
                  />
                  <span>Nữ</span>
                </label>
                <label className="gender-label flex gap-1">
                  <input
                    type="radio"
                    value={3}
                    name="sex"
                    checked={parseInt(information.sex) === 3}
                    onChange={(e) => {
                      setInformation((prevForm) => ({
                        ...prevForm,
                        sex: parseInt(e.target.value),
                      }));
                    }}
                  />
                  <span>Khác</span>
                </label>
              </div>
            </div>
        <div className="button-container">
          <button
            className="border-none cursor-pointer"
            onClick={() => handleUpdateProfile()}
          >
            Lưu
          </button>
        </div>
      </div>
    </BasicInfoStyle>
  );
}
