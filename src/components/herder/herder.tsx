import { faFileMedicalAlt, faPhone, faSignOutAlt, faTimesCircle, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "../herder/herder.css"
import "../herder/main.css"
import "../icon/icons"
import { faMobileScreenButton, faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Herder = function () {
    // Tạo state để lưu email từ sessionStorage
    const [ho_ten, setEmail] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showConfirmLogout, setShowConfirmLogout] = useState<boolean>(false);
    useEffect(() => {
        // Lấy email từ sessionStorage
        const userEmail = sessionStorage.getItem("ho_ten");
        setEmail(userEmail);
    }, []);

    // Xử lý đăng xuất
    const handleLogout = () => {
        sessionStorage.removeItem("ho_ten");
        setEmail(null);
        setShowConfirmLogout(false); // Ẩn hộp thoại sau khi đăng xuất
        alert("Bạn đã đăng xuất thành công!");
        navigate("/Dangnhap"); // Điều hướng tới trang đăng nhập
    };
    const handleHoSoBenhNhanClick = () => {
        navigate('/Thongtinnguoidung'); // Đường dẫn đến trang Thongtinnguoidung
    };
    const handleLichSuDatKham = () => {
        navigate('/Lichsudadatlich');
    }

    return (
        <>
            <header>
                <div className="newHeader">
                    <div className="newHeaderWrapper">
                        <div className="logoHeader">
                            <a href="/">
                                <span style={{ boxSizing: 'border-box', display: 'block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'relative' }}>
                                    <span style={{ boxSizing: 'border-box', display: 'block', width: 'initial', height: 'initial', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '85.3333% 0px 0px' }}>
                                        <img src="../image/logobenhvienKhoaiChau.jpg" alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} />
                                    </span>
                                </span>
                            </a>
                        </div>
                        <div className="styles_menu">
                            <div className="styles_header">
                                <div className="styles_network">
                                    <div>
                                        <a href="">
                                            <div className="styles_icon">
                                                <FontAwesomeIcon icon={['fab', 'tiktok']} />
                                            </div>
                                            Tiktok</a>
                                    </div>
                                    <div>
                                        <a href="">
                                            <div className="styles_icon">
                                                <FontAwesomeIcon icon={faFacebook} />
                                            </div>
                                            Facebook</a>
                                    </div>
                                    <div>
                                        <a href="">
                                            <div className="styles_icon">
                                                <FontAwesomeIcon icon="phone" />
                                            </div>
                                            Zalo</a>
                                    </div>
                                    <div>
                                        <a href="">
                                            <div className="styles_icon">
                                                <FontAwesomeIcon icon={faYoutube} />
                                            </div>
                                            Youtube</a>
                                    </div>
                                </div>
                                <div className="styles_buttonWrapper">
                                    <div className="styles_download">
                                        <button className="styles_btnDownload">
                                            <FontAwesomeIcon icon={faMobileScreenButton} style={{ color: '#fff' }} />
                                            <span style={{ color: '#fff' }}>Tải ứng dụng</span>
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className="styles_btnUser"
                                            onClick={() => {
                                                if (ho_ten) {
                                                    setShowConfirmLogout(!showConfirmLogout); // Hiển thị hộp thoại xác nhận
                                                } else {
                                                    navigate("/Dangnhap"); // Chuyển đến trang đăng nhập nếu chưa đăng nhập
                                                }
                                            }}
                                        >
                                            <div className="styles_bg">
                                                <div className="styles_text">
                                                    <FontAwesomeIcon icon={faUser} />
                                                    {ho_ten || "Tài khoản"} {/* Hiển thị tên hoặc "Tài khoản" */}
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                    {showConfirmLogout && ( // Hiển thị hộp thoại khi showConfirmLogout là true
                                        <div className="confirmLogout" style={{ marginBottom: '-311px', marginLeft: 125 }}>
                                            {/* Phần chào người dùng */}
                                            <h4>Xin chào  {ho_ten || ""} </h4>

                                            {/* Các mục menu trong hộp thoại */}
                                            <div className="menu__items">
                                                <div className="menu__item" onClick={handleHoSoBenhNhanClick}>
                                                    <FontAwesomeIcon icon={faUserCircle} />
                                                    <span>Hồ sơ bệnh nhân</span>
                                                </div>
                                                <div className="menu__item" onClick={handleLichSuDatKham}>
                                                    <FontAwesomeIcon icon={faFileMedicalAlt} />
                                                    <span>Lịch sử khám bệnh</span>
                                                </div>
                                            </div>

                                            {/* Xác nhận đăng xuất */}
                                            <p>Bạn có muốn đăng xuất không?</p>
                                            <div className="button-group">
                                                <button onClick={handleLogout} className="logout-button">
                                                    <FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất
                                                </button>
                                                <button onClick={() => setShowConfirmLogout(false)} className="cancel-button">
                                                    <FontAwesomeIcon icon={faTimesCircle} /> Hủy
                                                </button>
                                            </div>
                                        </div>
                                    )}


                                    <button className="styles_btnAntd">
                                        <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: '32px', height: '21px', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'relative' }}>
                                            <img src="../image/VN.svg" alt="" style={{ position: 'relative', inset: '0px', boxSizing: 'border-box', padding: '0px', border: '0px', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="styles_body">
                                <div className="styles_support">
                                    <div className="styles_iconCall">
                                        <span style={{ boxSizing: 'border-box', display: 'block', overflow: 'hidden', width: '40px', height: '40px', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'relative' }}>
                                            <span style={{ boxSizing: 'border-box', display: 'block', width: '40px', height: '41px', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '102.5% 0px 0px' }}>
                                                <img src="../image/hp.svg" alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: '0px', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} />
                                            </span>
                                        </span>
                                    </div>
                                    <a href="" className="styles_titleSupport">
                                        Hỗ trợ đặt khám
                                        <p>1900 2115</p>
                                    </a>
                                </div>
                                <div className="styles_nvarbar">
                                    <ul>
                                        <li>
                                            <div className="styles_item">
                                                <a href="/Chuyenkhoa">Chuyên khoa</a>
                                                {/* <article className="styles_icon">
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                </article> */}

                                            </div>
                                        </li>
                                        <li>
                                            <div className="styles_item">
                                                <a href="">Dịch vụ y tế</a>
                                                <article className="styles_icon">
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                </article>
                                                <div>
                                                    <ul>
                                                        <a href="/Xetnghiem">
                                                            <li style={{ fontSize: '14px', marginLeft: '-30px' }}>Đặt lịch xét nghiệm</li>
                                                        </a>
                                                        <a href="/Bacsikhamquavideo">
                                                            <li style={{ fontSize: '14px', marginLeft: '-30px' }}>Đặt khám qua video</li>
                                                        </a>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="styles_item">
                                                <a href="/Khamdoanhnghiep">Khám sức khỏe doanh nghiệp</a>
                                                {/* <article className="styles_icon">
                                                <FontAwesomeIcon icon={faCaretDown} />
                                                </article> */}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="styles_item">
                                                <a href="">Tin tức</a>
                                                <article className="styles_icon">
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                </article>
                                                <div>
                                                    <ul>
                                                        <a href="/Tintuc">
                                                            <li style={{ fontSize: '14px', marginLeft: '-30px' }}>Tin dịch vụ</li>
                                                        </a>
                                                        <a href="/Tintuc">
                                                            <li style={{ fontSize: '14px', marginLeft: '-30px' }}>Tin y tế</li>
                                                        </a>
                                                        <a href="/Tintuc">
                                                            <li style={{ fontSize: '14px', marginLeft: '-30px' }}>Y học thường thức</li>
                                                        </a>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="styles_item">
                                                <a href="">Hướng dẫn</a>
                                                <article className="styles_icon">
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                </article>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="styles_item">
                                                <a href="">Liên hệ hợp tác</a>
                                                <article className="styles_icon">
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                </article>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </header>

        </>
    );
};
export default Herder;
