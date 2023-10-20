import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";

import { useAuthStore } from "../../store/authStore";
import { alerts } from "../../utils/alerts";
import FacebookIcon from "../../assets/images/zin/facebook.svg";
import GoogleIcon from "../../assets/images/zin/google.svg";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import LockIcon from "../../assets/icons/LockIcon";
import LoginLogo from "../../assets/images/zin/login-logo.png";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";
import { validatePassword, validatePhoneNumber } from "../../utils/validate";

const LoginStyle = styled.div`
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

export default function LoginPage() {
  const navigate = useNavigate();
  const { widthScreen } = useGetScreenWidth();
  const { login, loading } = useAuthStore();
  const [loginForm, setLoginForm] = useState({});

  const handleLogin = (e) => {
    if(!e.phone_number) e.preventDefault();
    const onSuccess = () => {
      navigate("/");
      alerts.success("Đăng nhập thành công");
    };
    const onFail = (error) => {
      alerts.error(error || "Có lỗi xảy ra");
    };
    login(loginForm, onSuccess, onFail);
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 17,
      }}
      spin
    />
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm((prevForm) => ({ ...prevForm, [name]: value }));
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
          <p className="text-[24px] font-medium">Đăng nhập</p>
          <div className="flex justify-between items-center gap-3 mt-[30px]">
            <p className="flex items-center gap-2 flex-1 justify-center bg-[#FDF7F7] py-4 rounded-[8px]">
              <img
                src={GoogleIcon}
                alt="google-icon"
                className="w-[20px] h-[20px]"
              />
              <span className="text-[#CF5763]">Tiếp tục với Google</span>
            </p>
            <p className="p-3 rounded-[8px] bg-[#F6F6F6] w-[53px] h-[53px] flex items-center justify-center">
              <img
                src={FacebookIcon}
                alt="facebook-icon"
                className="w-[25px] h-[25px]"
              />
            </p>
          </div>
          <div className="mt-[30px]">
            <Form
              name="basic"
              // style={{ padding: "0 20px", marginTop: "20px" }}
              onFinish={handleLogin}
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
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                style={{ marginBottom: "4px" }}
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  {
                    validator(_, value) {
                      if (validatePassword(value) || !value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu phải ít nhất 6 ký tự!")
                      );
                    },
                  },
                ]}
              >
                <Input.Password
                  // prefix={<IconLock className="text-[#ccc] w-[20px]" />}
                  placeholder="Mật khẩu"
                  className="py-[8px]"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Item>

              <p
                className="text-end text-[12px] text-[#CF5763]"
                onClick={() => navigate("/forgotPassword")}
              >
                Quên mật khẩu?
              </p>

              <div className="w-full flex justify-center mt-5">
                <Button
                  // onClick={handleRegister}
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  className="px-10 bg-primary rounded-md w-full h-[40px]"
                  // disabled={validateButtonRegister()}
                >
                  Đăng nhập
                </Button>
              </div>
            </Form>
            <p className="text-[12px] text-center mt-5">
              Bạn chưa có tài khoản?{" "}
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
    <LoginStyle>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            Chào mừng bạn đến với ZIN
          </div>
          <div>Nếu bạn chưa có tài khoản</div>
          <div>
            Bạn có thể{" "}
            <Link
              to="/register"
              style={{ color: "#CF5763", marginLeft: "7px" }}
            >
              Đăng ký tại đây!
            </Link>
          </div>
          {/* <div style={{ display: "flex", gap: "7px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: "8",
                justifyContent: "center",
                gap: "7px",
                backgroundColor: "#F4F4F4",
                padding: "5px 0",
                borderRadius: "6px",
              }}
            >
              <img src={FacebookIcon} alt="facebook-icon" />
              <div>Tiếp tục với Facebook</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: "2",
                backgroundColor: "#F4F4F4",
                justifyContent: "center",
                borderRadius: "6px",
              }}
            >
              <img src={GoogleIcon} alt="google-icon" />
            </div>
          </div> */}
          <form className="flex flex-col gap-[15px]" onSubmit={handleLogin}>
            <div className="flex flex-col gap-[5px]">
              <label htmlFor="phone_number" style={{ marginBottom: "7px" }}>
                Số điện thoại
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  // borderBottom: "1px solid #000",
                  paddingBottom: "5px",
                }}
              >
                {/* <img src={PhoneIcon} alt="phone-icon" /> */}
                <Input
                  prefix={<PhoneIcon />}
                  name="phone_number"
                  id="phone_number"
                  placeholder="Nhập số điện thoại"
                  className=" overflow-hidden rounded-none border-t-0 border-x-0 !border-b border-black focus:shadow-none focus:border-black hover:border-black"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[5px]">
              <label htmlFor="password" style={{ marginBottom: "7px" }}>
                Mật khẩu
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  // borderBottom: "1px solid #000",
                  paddingBottom: "5px",
                }}
              >
                {/* <img src={LockIcon} alt="lock-icon" /> */}
                <Input.Password
                  prefix={<LockIcon/>}
                  name="password"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  className=" overflow-hidden rounded-none border-t-0 border-x-0 !border-b border-black focus:shadow-none focus:border-black hover:border-black"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div
              onClick={() => navigate("/forgotPassword")}
              style={{ color: "#CF5763", textAlign: "end", cursor: "pointer" }}
            >
              Quên mật khẩu ?
            </div>
            <button
              style={{
                backgroundColor: "#CF5763",
                color: "#fff",
                padding: "15px 0",
                borderRadius: "6px",
                cursor: "pointer",
                border: "none",
                width: "100%",
                textAlign: "center",
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Spin
                  indicator={antIcon}
                  className="text-[#fff] w-[15px] h-[15px]"
                  size="small"
                />
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>
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
            src={LoginLogo}
            style={{ objectFit: "contain", width: "200px", height: "200px" }}
          />
        </div>
      </div>
    </LoginStyle>
  );
}
