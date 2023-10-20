import styled from "styled-components";
import { useState } from "react";

import { useUserStore } from "../../../store/userStore";
import { toastFailure } from "../../../utils";

const ChangePasswordStyle = styled.div`
  padding: 0 30px 10px;
  background-color: #fff;
  margin-bottom: 40px;
  input {
    outline: none;
  }
  .form-title {
    padding: 15px 0;
  }
  .form {
    .form-col {
      flex: 1;
      .form-item {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 20px 0;
        @media (max-width: 576px) {
         margin: 16px 0 0 0;
        }
        .form-label {
          font-weight: 600;
        }
        .form-input {
          border: 1px solid #e7e7e7;
          border-radius: 7px;
          padding: 10px;
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
    .form-col-2 {
      display: flex;
      gap: 20px;
      @media (max-width: 576px) {
        gap: 0px;
       }
      .form-item {
        flex: 1;
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
      cursor: pointer;
      border-radius: 6px;
      @media (max-width: 576px) {
        width: 100%;
        margin-top: 16px;
      }
    }
  }
`;

export default function ChangePassword() {
  const { changePassword } = useUserStore();

  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChangePasswordForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPasswordForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleChangePassword = () => {
    if (Object.values(passwordForm).every((item) => item !== "")) {
      if (passwordForm.new_password === passwordForm.confirm_password) {
        changePassword(passwordForm);
      } else {
        toastFailure("Mật khẩu mới và mật khẩu xác nhận không khớp");
      }
    } else {
      toastFailure("Vui lòng nhập đầy đủ các trường");
    }
  };

  return (
    <ChangePasswordStyle>
      <div className="form-title">
        <h3>Thay đổi mật khẩu</h3>
      </div>
      <div>
        <div className="form">
          <div className="form-col">
            <div className="form-item">
              <label className="form-label">Mật khẩu cũ:</label>
              <input
                name="old_password"
                type="password"
                className="form-input"
                placeholder="Nhập mật khẩu cũ"
                onChange={handleChangePasswordForm}
              />
            </div>
          </div>
          <div className="form-col form-col-2 xs:flex-col">
            <div className="form-item">
              <label className="form-label">Mật khẩu mới:</label>
              <input
                name="new_password"
                type="password"
                className="form-input"
                placeholder="Nhập mật khẩu mới"
                onChange={handleChangePasswordForm}
              />
            </div>
            <div className="form-item">
              <label className="form-label">Nhập lại mật khẩu mới:</label>
              <input
                name="confirm_password"
                type="password"
                className="form-input"
                placeholder="Nhập lại mật khẩu mới"
                onChange={handleChangePasswordForm}
              />
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="border-none" onClick={handleChangePassword}>
            Lưu
          </button>
        </div>
      </div>
    </ChangePasswordStyle>
  );
}
