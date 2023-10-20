import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuthStore } from "../../store/authStore";
// import PhoneIcon from "../../assets/images/zin/phone-icon.svg";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import LockIcon from "../../assets/icons/LockIcon";
import LoginLogo from "../../assets/images/zin/login-logo.png";
import OtpIcon from "../../assets/images/zin/otpIcon.svg";
import LogoSmall from "../../assets/images/zin/zinlogo-small.svg";
import { Button, Form, Input } from "antd";
import { validatePhoneNumber } from "../../utils/validate";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";
import SendOTP from "./SentOTP";
import { toast } from "react-toastify";

const ForgotPassStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
  input {
    border: none;
  }
  input:focus {
    outline: none;
  }
  .ant-input-affix-wrapper-focused {
    box-shadow: none;
  }
`;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { widthScreen } = useGetScreenWidth();

  const { forgotPassword, sendOtp, loading } = useAuthStore();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [forgotPassForm, setForgotPassForm] = useState({
    password: "",
    otp: "",
    passwordConfirm: "",
  });
  const [step, setStep] = useState(1);

  const handleSendOtp = () => {
    const onSuccess = () => {
      setStep(2);
    };
    sendOtp({ phone_number: phoneNumber }, onSuccess);
  };

  const handleForgotPass = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      navigate("/login");
    };
    if (forgotPassForm.password !== forgotPassForm.passwordConfirm) {
      toast.error("Mật khẩu mới và mật khẩu xác thực không khớp");
      return;
    } else {
      delete forgotPassForm.passwordConfirm;
      forgotPassword(
        { ...forgotPassForm, phone_number: phoneNumber },
        onSuccess
      );
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForgotPassForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  if (widthScreen < 576) {
    return (
      <div className="bg-[#CF5763] min-h-screen flex flex-col justify-center items-center px-4 py-4">
        <div className="text-center py-4">
          <img
            src={LoginLogo}
            style={{ objectFit: "contain", width: "126px", height: "109px" }}
          />
        </div>
        <div className="bg-white rounded-[20px] mx-[16px] w-full py-6 px-4">
          <p className="text-[24px] font-medium">Lấy lại mật khẩu</p>
          <div className="mt-[20px]">
           {step === 1 ? <Form
              name="basic"
              // style={{ padding: "0 20px", marginTop: "20px" }}
              onFinish={handleSendOtp}
              initialValues={{ remember: true }}
              autoComplete="off"
              className="mt-5"
            >
              <Form.Item
                label="Số điện thoại"
                name="phone_number"
                style={{ marginBottom: "4px" }}
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    validator(_, value) {
                      if (validatePhoneNumber(value) || !value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Số điện thoại không hợp lệ!")
                      );
                    },
                  },
                ]}
              >
                <Input
                  placeholder="Số điện thoại"
                  className="py-[8px]"
                  type="number"
                  name="phone_number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Item>

              <div className="w-full flex justify-center mt-5">
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  className="px-10 bg-primary rounded-md w-full h-[40px]"
                >
                  Gửi mã OTP
                </Button>
              </div>
            </Form> : <SendOTP phoneNumber={phoneNumber}/>}
            <p className="text-[12px] text-center mt-5">
              <span
                className="text-[#CF5763]"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </span>{" "}
              <span className="text-[#ccc]">|</span>{" "}
              <span
                className="text-[#CF5763]"
                onClick={() => navigate("/register")}
              >
                Đăng ký
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ForgotPassStyle>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   height: "410px",
          gap: "20px",
          padding: "30px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{
            width: "350px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "500" }} className="mb-8">
            Quên mật khẩu
          </div>
          {step === 1 && (
            <form onSubmit={handleSendOtp}>
              <div style={{ marginBottom: "7px" }}>Số điện thoại</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  paddingBottom: "5px",
                }}
              >
                <Input
                  prefix={<PhoneIcon />}
                  name="phone_number"
                  placeholder="Nhập số điện thoại"
                  className=" overflow-hidden rounded-none border-t-0 border-x-0 !border-b border-black focus:shadow-none focus:border-black hover:border-black"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: "#CF5763",
                  color: "#fff",
                  padding: "10px 0",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: "none",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                Gửi mã OTP
              </button>
            </form>
          )}
          {step === 2 && (
            <form
              onSubmit={handleForgotPass}
              className="flex flex-col gap-[15px]"
            >
              <div>
                <div style={{ marginBottom: "7px" }}>OTP</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  <Input
                    prefix={<OtpIcon />}
                    name="otp"
                    placeholder="Nhập mã otp"
                    className=" overflow-hidden rounded-none border-t-0 border-x-0 !border-b border-black focus:shadow-none focus:border-black hover:border-black"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div style={{ marginBottom: "7px" }}>Nhập mật khẩu mới</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  <Input.Password
                    prefix={<LockIcon />}
                    name="password"
                    placeholder="Nhập mật khẩu"
                    className=" overflow-hidden rounded-none border-t-0 border-x-0 !border-b border-black focus:shadow-none focus:border-black hover:border-black"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div style={{ marginBottom: "7px" }}>Xác nhận mật khẩu</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  <Input.Password
                    prefix={<LockIcon />}
                    name="passwordConfirm"
                    placeholder="Xác nhận mật khẩu"
                    className=" overflow-hidden rounded-none border-t-0 border-x-0 !border-b border-black focus:shadow-none focus:border-black hover:border-black"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                style={{
                  backgroundColor: "#CF5763",
                  color: "#fff",
                  padding: "10px 0",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: "none",
                  width: "100%",
                  marginTop: "15px",
                }}
                type="submit"
              >
                Đổi mật khẩu
              </button>
            </form>
          )}
        </div>
        <div
          style={{
            backgroundColor: "#CF5763",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "350px",
            alignSelf: "stretch",
          }}
        >
          <img
            src={LogoSmall}
            style={{ objectFit: "cover", width: "150px", height: "150px" }}
          />
        </div>
      </div>
    </ForgotPassStyle>
  );
}
