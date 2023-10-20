import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";

import { useAuthStore } from "../../store/authStore";
import { alerts } from "../../utils/alerts";
import UserRegister from "../../assets/icons/UserRegister";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import LockIcon from "../../assets/icons/LockIcon";
import LogoZin from "../../assets/images/zin/login-logo.png";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";
import { validatePassword, validatePhoneNumber } from "../../utils/validate";

const RegisterStyle = styled.div`
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

export default function Register() {
  const navigate = useNavigate();
  const { widthScreen } = useGetScreenWidth();
  const { register, loading } = useAuthStore();
  const [registerForm, setRegisterForm] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterForm((prevFrom) => ({ ...prevFrom, [name]: value }));
  };
  const cowc_id = localStorage.getItem("cowc_id");

  const handleRegister = (e) => {
    if(!e.phone_number) e.preventDefault();
    const onSuccess = () => {
      navigate("/login");
      alerts.success("Đăng ký thành công");
    };
    const dataToExport = {
      ...registerForm,
      collaborator_by_customer_id: parseInt(cowc_id),
    };
    register(dataToExport, onSuccess);
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 17,
      }}
      spin
    />
  );

  if (widthScreen < 576) {
    return (
      <div className="bg-[#CF5763] min-h-screen flex justify-center items-center">
        <div className="bg-white rounded-[20px] mx-[16px] px-4 py-6">
          <p className="text-[24px] font-medium">Đăng ký</p>
          <Form
            name="basic"
            // style={{ padding: "0 20px", marginTop: "20px" }}
            onFinish={handleRegister}
            initialValues={{ remember: true }}
            autoComplete="off"
            className="mt-5"
          >
            <Form.Item
              label="Tên đầy đủ"
              name="name"
              style={{ marginBottom: "4px" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đầy đủ",
                },
              ]}
            >
              <Input
                // prefix={<IconPerson className="text-[#ccc] w-[20px]" />}
                placeholder="Tên đầy đủ"
                className="py-[8px]"
                name="name"
                onChange={handleChange}
              />
            </Form.Item>
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
                // prefix={<IconPhone className="text-[#ccc]" />}
                placeholder="Số điện thoại"
                className="py-[8px]"
                type="number"
                name="phone_number"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              style={{ marginBottom: "4px" }}
            >
              <Input
                // prefix={<IconEmail className="text-[#ccc]" />}
                placeholder="Email"
                className="py-[8px]"
                name="email"
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

            <div className="w-full flex justify-center mt-5">
              <Button
                // onClick={handleRegister}
                loading={loading}
                type="primary"
                htmlType="submit"
                className="px-10 bg-primary rounded-md w-full h-[40px]"
                // disabled={validateButtonRegister()}
              >
                Đăng ký
              </Button>
            </div>
          </Form>
          <p className="text-[12px] text-center mt-5">
            Bạn đã có tài khoản?{" "}
            <span className="text-[#CF5763]" onClick={() => navigate("/login")}>
              Đăng nhập
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <RegisterStyle>
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
            flex: 1,
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "500" }}>
            Lần đầu tiên đến ZIN
          </div>
          <div>Nếu bạn đã có tài khoản</div>
          <div>
            Bạn có thể{" "}
            <Link to="/login" style={{ color: "#CF5763", marginLeft: "7px" }}>
              Đăng nhập tại đây!
            </Link>
          </div>
          <form onSubmit={handleRegister} className="flex flex-col gap-[15px]">
            <div className="flex flex-col gap-[7px]">
              <label htmlFor="name" style={{ marginBottom: "7px" }}>
                Họ tên
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
                {/* <img src={UserIcon} alt="user-icon" /> */}
                <Input
                  prefix={<UserRegister />}
                  name="name"
                  id="name"
                  placeholder="Nhập họ tên"
                  className=" overflow-hidden rounded-none border-t-0 border-x-0 !border-b border-black focus:shadow-none focus:border-black hover:border-black"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[7px]">
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
            <div className="flex flex-col gap-[7px]">
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
                <Input.Password
                  prefix={<LockIcon />}
                  name="password"
                  // type="password"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  className=" overflow-hidden rounded-none border-t-0 border-x-0 !border-b border-black focus:shadow-none focus:border-black hover:border-black"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[7px]">
              <label htmlFor="confirm_password" style={{ marginBottom: "7px" }}>
                Nhập lại mật khẩu
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
                  name="confirm_password"
                  prefix={<LockIcon />}
                  // type="password"
                  id="confirm_password"
                  className=" overflow-hidden rounded-none border-t-0 border-x-0 !border-b border-black focus:shadow-none focus:border-black hover:border-black"
                  placeholder="Nhập lại mật khẩu"
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <div style={{ marginBottom: "15px" }}>
            <div style={{ marginBottom: "7px" }}>Nhập mã giới thiệu</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                borderBottom: "1px solid #000",
                paddingBottom: "5px",
              }}
            >
              <img src={UserIconContact} alt="phone-icon" />
              <input
                name="referral_phone_number"
                placeholder="Nhập số điện thoại người giới thiệu"
                style={{ flexGrow: "1" }}
                onChange={handleChange}
              />
            </div>
          </div> */}
            <button
              style={{
                backgroundColor: "#CF5763",
                color: "#fff",
                padding: "10px 0",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                width: "100%",
              }}
              type="submit"
            >
              {loading ? (
                <Spin
                  indicator={antIcon}
                  className="text-[#fff] w-[15px] h-[15px]"
                  size="small"
                />
              ) : (
                "Đăng ký"
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
          <div>
            <img
              src={LogoZin}
              style={{ objectFit: "contain", width: "200px", height: "200px" }}
            />
          </div>
        </div>
      </div>
    </RegisterStyle>
  );
}
