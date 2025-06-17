import React, { } from "react";

function Footer() {
    return (
        <>
            <footer id="footer" class="footer">
                <div class="container footer-top">
                    <div class="row gy-4">
                        <div class="col-lg-5 col-md-12 footer-about">
                            <a href="index.html" class="logo d-flex align-items-center">
                                <span class="sitename">ARTHEORY</span>
                            </a>
                            <p>ARTHEORY tiên phong trong lĩnh vực nghệ thuật kỹ thuật số, mang đến những tác phẩm sáng
                                tạo, độc đáo, kết hợp giữa công nghệ hiện đại và đam mê nghệ thuật.</p>
                            <div class="social-links d-flex mt-4">
                                <a href=""><i class="bi bi-twitter-x"></i></a>
                                <a href=""><i class="bi bi-facebook"></i></a>
                                <a href=""><i class="bi bi-instagram"></i></a>
                                <a href=""><i class="bi bi-linkedin"></i></a>
                            </div>
                        </div>

                        <div class="col-lg-2 col-6 footer-links">
                            <h4>Liên Kết Hữu Ích</h4>
                            <ul>
                                <li><a href="#">Trang chủ</a></li>
                                <li><a href="#about">Giới thiệu</a></li>
                                <li><a href="#services">Dịch vụ</a></li>
                                <li><a href="#">Điều khoản dịch vụ</a></li>
                                <li><a href="#">Chính sách bảo mật</a></li>
                            </ul>
                        </div>

                        <div class="col-lg-2 col-6 footer-links">
                            <h4>Dịch Vụ Nghệ Thuật</h4>
                            <ul>
                                <li><a href="#">Minh họa kỹ thuật số</a></li>
                                <li><a href="#">Concept Art</a></li>
                                <li><a href="#">Thiết kế nhân vật</a></li>
                                <li><a href="#">Matte Painting</a></li>
                                <li><a href="#">Tư vấn sáng tạo</a></li>
                            </ul>
                        </div>

                        <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                            <h4>Liên Hệ</h4>
                            <p>1842 LỤC NGẠN</p>
                            <p>Quận 1, BẮC GIANG</p>
                            <p>Việt Nam</p>
                            <p class="mt-4"><strong>Điện thoại:</strong> <span>+84 365531154</span></p>
                            <p><strong>Email:</strong> <span>supercellc1nghiaho@gmail.com</span></p>
                        </div>
                    </div>
                </div>

                <div class="container copyright text-center mt-4">
                    <p>© <span>Bản quyền</span> <strong class="px-1 sitename">ARTHEORY</strong> <span>Mọi quyền được bảo
                        lưu</span></p>
                    <div class="credits">
                        Thiết kế bởi <a href="">VANH</a>
                    </div>
                </div>
            </footer>
        </>
    );

}
export default Footer;  