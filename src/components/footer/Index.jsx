import styled from "styled-components";

import PhoneIcon from '../../assets/images/zin/call.svg'
import MessageIcon from '../../assets/images/zin/message.svg'
import LocationIcon from '../../assets/images/zin/location.svg'

const FooterStyle = styled.div`
  background-color: #393939;
  padding: 20px 0;
  color: #fff;
  .footer-wrapper {
    margin: 0 auto;
    max-width: 1300px;
    // width: 85%;
    margin: 0 auto;
    display: flex;
    gap: 10px;
    @media (max-width: 576px) {
      flex-direction: column;
      padding: 0 16px
    }
  }
  .footer-menu-item {
    flex: 1;
    line-height: 30px;
  }
  .footer-menu-title {
    font-weight: 600;
    margin-bottom: 7px;
    font-size: 16px;
  }
`;

export default function Footer() {
  return (
    <FooterStyle>
      <div className="footer-wrapper">
        <div className="footer-menu-item">
          <div className="footer-menu-title">Thông tin liên hệ</div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                lineHeight: "30px",
                gap: "5px",
              }}
            >
              <img src={PhoneIcon} alt="contact-icon" />
              <div>+380501234567</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                lineHeight: "30px",
                gap: "5px",
              }}
            >
              <img src={MessageIcon} alt="contact-icon" />
              <div>zin@gmail.com</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                lineHeight: "30px",
                gap: "5px",
              }}
            >
              <img src={LocationIcon} alt="contact-icon" />
              <div>Nguyễn Trãi, Thanh Xuân, Hà Nội</div>
            </div>
          </div>
        </div>
        <div className="footer-menu-item">
          <div className="footer-menu-title">Hỗ trợ khách hàng</div>
          <div>
            <div>Điều khoản - Điều kiện</div>
            <div>Chính sách hỗ trợ</div>
            <div>Chính sách bảo mật</div>
          </div>
        </div>
        <div className="footer-menu-item">
          <div className="footer-menu-title">Về chúng tôi</div>
          <div>
            <div>Giới thiệu</div>
            <div>Giúp đỡ</div>
            <div>Tham gia</div>
          </div>
        </div>
        <div className="footer-menu-item">
          <div className="footer-menu-title">Đăng ký email</div>
          <div>
            <div>Đăng ký ngay để nhận được các tin khuyến mãi mới nhất</div>
            <input
              placeholder="Email"
              style={{
                width: "100%",
                backgroundColor: "#fff",
                padding: "10px 7px",
                borderRadius: "5px",
              }}
            />
            <div>Đăng ký</div>
          </div>
        </div>
      </div>
      <div style={{ borderBottom: "1px solid #fff", margin: "20px 0" }}></div>
      <div
        style={{
          width: "85%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "11px",
        }}
      >
        <div>© 2023 ZIN</div>
        <div style={{ display: "flex", gap: "20px" }}>
          <div>Privacy Policy</div>
          <div>Terms And Conditions</div>
        </div>
      </div>
    </FooterStyle>
  );
}
