import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <hr></hr>
      <div className="footerContent">
        <div className="footerOne">
          <h5>Chăm sóc khách hàng</h5>
          <ul>
            <li>Hotline: 0346616800</li>
            <li>Hỗ trợ khách hàng: tknhu1302@gmail.com</li>
            <li>Hướng dẫn đặt hàng</li>
            <li>Phương thức vận chuyển</li>
            <li>Bảo mật </li>
          </ul>
        </div>
        <div className="footerTwo">
          <h5>Về TKN Tour</h5>
          <ul>
            <li>Gioi thieu về TKN Tour</li>
            <li>Tuyển dụng</li>
            <li>Chính sách bảo mật thông tin cá nhân</li>
            <li>Điều khoản sử dụng </li>
            <li>Chính sách bảo mật thanh toán</li>
          </ul>
        </div>
        <div className="footerThree">
          <h5>Phương thức thanh toán</h5>
          <div className="footerPayment">
            <a href="https://play.google.com/store/apps/details?id=com.mservice.momotransfer&hl=vi&gl=US">
              <img src={"/images/payment/momo.png"} alt="" />
            </a>

            <a href="https://apps.apple.com/vn/app/moca/id965112152?l=vi">
              <img src={"/images/payment/moca.png"} alt="" />
            </a>

            <a href="https://www.visa.com.vn/vi_VN/pay-with-visa/find-a-card/credit-cards.html">
              <img src={"/images/payment/visacard.png"} alt="" />
            </a>

            <a href="https://zalopay.vn/">
              <img src={"/images/payment/zalopay.png"} alt="" />
            </a>

            <a href="https://vnpay.vn/en">
              <img src={"/images/payment/vnpay.png"} alt="" />
            </a>

            <a href="https://www.mastercard.com.vn/vi-vn.html">
              <img src={"/images/payment/mastercard.png"} alt="" />
            </a>

            {/* <img src={"/images/payment/atmdcard"} alt="" /> */}

            <img src={"/images/payment/tragop.jpg"} alt="" />
          </div>
          <h5>Dịch vụ giao hàng</h5>
          <div className="footerShipment">
            <a href="https://www.ahamove.com/">
              <img src={"/images/shipment/ahamove.png"} alt="" />
            </a>

            <a href="https://play.google.com/store/apps/details?id=com.grabtaxi.passenger&hl=vi&gl=US">
              <img src={"/images/shipment/dowload.png"} alt="" />
            </a>

            <a href="https://play.google.com/store/apps/details?id=com.lazada.android&hl=vi&gl=US">
              <img src={"/images/shipment/lazada.png"} alt="" />
            </a>

            <a href="https://shopee.vn/">
              <img src={"/images/shipment/shopee.jpg"} alt="" />
            </a>

            <a href="https://tiki.vn/">
              <img src={"/images/shipment/tiki.png"} alt="" />
            </a>

            <a href="http://www.vnpost.vn/">
              <img src={"/images/shipment/vnpost.png"} alt="" />
            </a>

            <img src={"/images/shipment/shiperbee.png"} alt="" />
          </div>
        </div>
        <div className="footerFour">
          <h5>Kết nối với chúng tôi</h5>
          <div className="footerSocial">
            <a href="https://www.facebook.com/">
              <img src={"/images/social/facebook.png"} alt="" />
            </a>
            <a href="https://www.facebook.com/">
              <img src={"/images/social/youtube.png"} alt="" />
            </a>

            <img src={"/images/social/instagram.jpg"} alt="" />
          </div>
        </div>
      </div>
      <hr></hr>

      <div className="footerCountry">
        <p>Quốc gia và các tỉnh thành</p>
        <p>
          An Giang - Kon Tum - Vũng Tàu - Lai Châu - Bắc Giang - Lâm Đồng - Bắc Kạn -
          Lạng Sơn - Bạc Liêu - Lào Cai - Bắc Ninh - Long An - Bến Tre - Nam Định - Bình Định -
          Nghệ An - Bình Dương - Ninh Bình - Bình Phước - Ninh Thuận - Bình Thuận - Phú Thọ
          Cà Mau - Phú Yên - Cần Thơ - Quảng Bình - Cao Bằng - Quảng Nam - Đà Nẵng - Quảng
          Ngãi - Đắk Lắk - Quảng Ninh - Đắk Nông - Quảng Trị - Điện Biên - Sóc Trăng - Đồng
          Nai - Sơn La - Đồng Tháp - Tây Ninh - Gia Lai - Thái Bình - Hà Giang - Thái Nguyên -
          Hà Nam - Thanh Hóa - Hà Nội - Thừa Thiên Huế - Hà Tĩnh - Tiền Giang - Hải Dương - TP
          Hồ Chí Minh - Hải Phòng - Trà Vinh - Hậu Giang - Tuyên Quang - Hòa Bình - Vĩnh
          Long - Hưng Yên - Vĩnh Phúc - Khánh Hòa - Yên Bái - Kiên Giang
        </p>
      </div>

      <div className="footerBottom">
        <p>Công ty TNHH Dịch vụ du lịch Trần Khắc Nhu</p>
        <p>KTX KHU B ĐẠI HOC QUÔC GIA DĨ AN BÌNH DƯƠNG THÀNH PHỐ THỦ ĐỨC</p>
        <p>ĐIỆN THOẠI: 0346616800 EMAIL: TKNHU1302@GMAIL.COM</p>
        <p>GIAY CHUNG NHAN SO</p>
        <p>© 2022 TRAN KHAC NHU TOUR Limited</p>
      </div>
    </div>
  );
};

export default Footer;
