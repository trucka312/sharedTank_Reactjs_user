import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import { alerts } from "../../utils/alerts";
import { validatePassword, validatePhoneNumber } from "../../utils/validate";
import Header from "../../components/Header";

const SendOTP = ({ phoneNumber }) => {
  const navigate = useNavigate();
  const authStore = useAuthStore((state) => state);
  const location = useLocation();

  const [otp, setOtp] = useState("");
  console.log('otp: ', otp);
  const [timer, setTimer] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleResendClick = () => {
    if (timer > 0) return;
    setTimer(30);
    setResendEnabled(false);
    sendOTP();
  };

  const onFinish = () => {
    authStore.forgotPassword(
      {
        email_or_phone_number: phoneNumber,
        otp: otp,
        // otp_from: "phone",
        password: newPassword,
      },
      (response) => {
        // alerts.success("Đổi mật khẩu thành công");
        navigate("/login");
      },
      (error) => {
        alerts.error(error.response.data.msg);
        // navigate("/");
      }
    );
  };

  const sendOTP = () => {
    authStore.sendOtp(
      { phone_number: phoneNumber },
      (response) => {
        // alerts.success("Gửi mã OTP thành công!");
      },
      (error) => {
        alerts.error(error.response.data.msg);
      }
    );
  };

  const validateButtonFinish = () => {
    console.log(otp);
    if (otp.length < 6 || !validatePassword(newPassword)) return true;
    return false;
  };

  return (
    <div className="send-otp">
      <Header title="Đăng ký" />
      <div className="text-center text-[12px] text-[#A0A0A0] bg-white pb-[10px]">
        <p>Mã xác thực (OTP) đã được gửi đến số điện thoại</p>
        <p className="font-semibold text-[#000]">SĐT: {phoneNumber}</p>
      </div>
      <div className="p-[12px] mb-2 text-center bg-[#FDF7F7] text-[10px] text-[#CF5763]">
        Nhập mã OTP và nhập mật khẩu mới để lấy lại mật khẩu
      </div>
      <Form name="basic" initialValues={{ remember: true }} autoComplete="off">
        <div className="flex justify-center bg-white">
          <Form.Item
            style={{ marginBottom: "0px" }}
            rules={[
              {
                validator(_, value) {
                  if (otp.length === 6) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("vui lòng nhập đầy đủ mã OTP!")
                  );
                },
              },
            ]}
          >
            <OtpInput
              value={otp}
              inputStyle={{
                width: "30px",
                height: "36px",
                borderRadius: "6px",
                border: "1px solid blue",
                outline: "none",
              }}
              onChange={setOtp}
              inputType="number"
              numInputs={6}
              renderSeparator={<span className="w-[12px]"></span>}
              renderInput={(props) => <input {...props} />}
            />
          </Form.Item>
        </div>
        <div className="text-center text-[12px] text-[#A0A0A0] bg-white pb-[10px]">
          <p className="mt-[10px]">
            {timer === 0
              ? "Yêu cầu gửi lại mã mới"
              : `Bạn có thể yêu cầu gửi lại mã mới sau ${timer}s`}{" "}
          </p>
          <p
            className={
              timer > 0
                ? `text-[#ccc] underline w-fit mx-auto`
                : `text-[#CF5763] underline w-fit mx-auto`
            }
            onClick={handleResendClick}
          >
            Gửi lại mã
          </p>
        </div>

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
            placeholder="Mật khẩu mới"
            className="py-[8px]"
            name="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Item>
        <div className="text-center mt-5">
          <Button
              loading={authStore.loading}
            type="primary"
            htmlType="submit"
            className="px-10 bg-primary rounded-md w-full h-[40px]"
            onClick={onFinish}
          >
            Tiếp tục
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default SendOTP;
