import { faMagnifyingGlass, faPhone } from "@fortawesome/free-solid-svg-icons";
import "../xetnghiem/Xetnghiem.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from 'antd';
import React, { useState } from 'react';

const Xetnghiem = function () {
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = 100;
    const itemsPerPage = 4;

    const handlePageChange = (page:any) => {
        setCurrentPage(page);
    };

    return (
        <div className="styles_body1">
            <div style={{ maxWidth: '100%', margin: 'auto' }}>
                <div>
                    <div className="styles_main">
                        <div className="styles_header">
                            <div className="styles_bannerWrapper">
                                <div className="styles_bannerContainer">
                                    <div className="styles_card">
                                        <div className="styles_title_content">
                                            <h1>ĐẶT LỊCH XÉT NGHIỆM</h1>
                                            <div className="styles_title_content_span">
                                                Lựa chọn linh hoạt, tiện lợi: Xét nghiệm y tế tại cơ sở và tại nhà bạn, đảm bảo kết quả chính xác
                                            </div>
                                        </div>
                                        <div className="styles_advise">
                                            <p>Liên hệ <b>chuyên gia</b> để tư vấn thêm</p>
                                            <div className="styles_advise_title">
                                                <a href="styles_advise_phone">
                                                    <div className="styles_support">
                                                        <FontAwesomeIcon icon={faPhone} style={{ color: '#00b5f1' }} />
                                                    </div>

                                                </a>
                                            </div>
                                            <span>19001999</span> {/* Thêm thẻ span tại đây */}

                                        </div>
                                    </div>
                                    {/*  */}
                                </div>
                            </div>
                            <div className="styles_banner_img">
                                <span
                                    style={{
                                        boxSizing: 'border-box',
                                        display: 'block',
                                        overflow: 'hidden',
                                        width: 'initial',
                                        height: 'initial',
                                        background: 'none',
                                        opacity: 1,
                                        border: '0px',
                                        margin: '0px',
                                        padding: '0px',
                                        position: 'absolute',
                                        inset: 0
                                    }}
                                >
                                    <img
                                        alt=""
                                        src="../image/bannerxetnghiem1.webp"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            boxSizing: 'border-box',
                                            padding: 0,
                                            border: 'none',
                                            margin: 'auto',
                                            display: 'block',
                                            width: 0,
                                            height: 0,
                                            minWidth: '34%',
                                            maxWidth: '33%',
                                            minHeight: '37%',
                                            maxHeight: '96%',
                                            marginLeft: '1001px'

                                        }}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="styles_herder">
                            <div className="styles_body_search">
                                <form action="" className="styles_form">
                                    <div className="styles_formContent">
                                        <div className="styles_item">
                                            <div className="styles_inputItem">
                                                <div className="ant-form-item">
                                                    <div className="ant-row">
                                                        <div className="ant-col ant-form-item-control">
                                                            <div className="ant-form-item-control-input">
                                                                <div className="ant-form-item-control-input-content">
                                                                    <span className="styles_selectItem">
                                                                        <span className="ant-input-prefix">
                                                                            <FontAwesomeIcon icon={faMagnifyingGlass} height={20} width={20} style={{marginLeft:'20px'}} />
                                                                        </span>
                                                                        <input className="ant-input" type="text" placeholder="Tìm kiếm dịch vụ" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="styles_tag"></div>
                            <div className="ant-row" style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '-13px', marginRight: '-13px', rowGap: '26px', maxWidth: '1273px', margin: '0 auto' }}>
                                <div className="ant-row styles_card styles_pickCard" style={{ flex: '0 0 48%', margin: '0 1%' }}>
                                    <div className="styles_DetailInfo">
                                        <div className="styles_cardImage">
                                            <span
                                                style={{
                                                    boxSizing: "border-box",
                                                    display: "block",
                                                    overflow: "hidden",
                                                    width: "initial",
                                                    height: "initial",
                                                    background: "none",
                                                    opacity: 1,
                                                    border: 0,
                                                    margin: 0,
                                                    padding: 0,
                                                    position: "relative"
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        boxSizing: "border-box",
                                                        display: "block",
                                                        width: "initial",
                                                        height: "initial",
                                                        background: "none",
                                                        opacity: 1,
                                                        border: 0,
                                                        margin: 0,
                                                        padding: "150% 0px 0px"
                                                    }}
                                                />
                                                <img
                                                    alt="Tiêu chuẩn (Trả kết quả trong vòng 25-30 ngày) Xét nghiệm ADN Hài cốt liệt sĩ"
                                                    sizes="100vw"

                                                    src="../image/bacsigiadinh.webp"

                                                    style={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        boxSizing: "border-box",
                                                        padding: 0,
                                                        border: "none",
                                                        margin: "auto",
                                                        display: "block",
                                                        width: 0,
                                                        height: 0,
                                                        minWidth: "100%",
                                                        maxWidth: "100%",
                                                        minHeight: "100%",
                                                        maxHeight: "100%",
                                                        objectFit: "contain"
                                                    }}
                                                />
                                            </span>
                                        </div>
                                        <div className="styles_cardBody">
                                            <div className="styles_cardContent">
                                                <h3 className="styles_title">Tiêu chuẩn (Trả kết quả trong vòng 25-30 ngày) Xét nghiệm ADN Hài cốt liệt sĩ</h3>
                                                <p className="styles_contentItem">
                                                    <span className="styles_icon">
                                                        <span style={{ boxSizing: 'border-box', display: 'block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '0px', position: 'relative' }}>
                                                            <span style={{ boxSizing: 'border-box', display: 'block', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '100% 0px 0px' }}></span>
                                                            <img
                                                                alt="Icon bệnh viện"
                                                                sizes="100vw"
                                                                
                                                                src="../image/logo3.svg"
                                                                decoding="async"
                                                                data-nimg="responsive"
                                                                style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                                            />
                                                        </span>

                                                    </span>
                                                    Bệnh viện Khoái Châu
                                                </p>
                                                <div className="ant-row" style={{alignItems:'center', marginTop:'10px',marginBottom:'10px'}}>
                                                    <div className="ant-1">
                                                        <div className="styles_price">
                                                            <div className="styles_sale">
                                                                Giá:
                                                                12.000.000 đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ant-2">
                                                        <div className="styles_btnControl">
                                                            <button className="styles_btnBooking">
                                                                <span>Đặt khám ngay</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        

                                    </div>
                                    
                                </div>
                                <div className="ant-row styles_card styles_pickCard" style={{ flex: '0 0 48%', margin: '0 1%' }}>
                                    <div className="styles_DetailInfo">
                                        <div className="styles_cardImage">
                                            <span
                                                style={{
                                                    boxSizing: "border-box",
                                                    display: "block",
                                                    overflow: "hidden",
                                                    width: "initial",
                                                    height: "initial",
                                                    background: "none",
                                                    opacity: 1,
                                                    border: 0,
                                                    margin: 0,
                                                    padding: 0,
                                                    position: "relative"
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        boxSizing: "border-box",
                                                        display: "block",
                                                        width: "initial",
                                                        height: "initial",
                                                        background: "none",
                                                        opacity: 1,
                                                        border: 0,
                                                        margin: 0,
                                                        padding: "150% 0px 0px"
                                                    }}
                                                />
                                                <img
                                                    alt="Tiêu chuẩn (Trả kết quả trong vòng 25-30 ngày) Xét nghiệm ADN Hài cốt liệt sĩ"
                                                    sizes="100vw"

                                                    src="../image/bacsigiadinh.webp"

                                                    style={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        boxSizing: "border-box",
                                                        padding: 0,
                                                        border: "none",
                                                        margin: "auto",
                                                        display: "block",
                                                        width: 0,
                                                        height: 0,
                                                        minWidth: "100%",
                                                        maxWidth: "100%",
                                                        minHeight: "100%",
                                                        maxHeight: "100%",
                                                        objectFit: "contain"
                                                    }}
                                                />
                                            </span>
                                        </div>
                                        <div className="styles_cardBody">
                                            <div className="styles_cardContent">
                                                <h3 className="styles_title">Tiêu chuẩn (Trả kết quả trong vòng 25-30 ngày) Xét nghiệm ADN Hài cốt liệt sĩ</h3>
                                                <p className="styles_contentItem">
                                                    <span className="styles_icon">
                                                        <span style={{ boxSizing: 'border-box', display: 'block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '0px', position: 'relative' }}>
                                                            <span style={{ boxSizing: 'border-box', display: 'block', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '100% 0px 0px' }}></span>
                                                            <img
                                                                alt="Icon bệnh viện"
                                                                sizes="100vw"
                                                                
                                                                src="../image/logo3.svg"
                                                                decoding="async"
                                                                data-nimg="responsive"
                                                                style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                                            />
                                                        </span>

                                                    </span>
                                                    Bệnh viện Khoái Châu
                                                </p>
                                                <div className="ant-row" style={{alignItems:'center', marginTop:'10px',marginBottom:'10px'}}>
                                                    <div className="ant-1">
                                                        <div className="styles_price">
                                                            <div className="styles_sale">
                                                                Giá:
                                                                12.000.000 đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ant-2">
                                                        <div className="styles_btnControl">
                                                            <button className="styles_btnBooking">
                                                                <span>Đặt khám ngay</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            e
                                            
                                        </div>
                                        

                                    </div>
                                    
                                </div>
                                <div className="ant-row styles_card styles_pickCard" style={{ flex: '0 0 48%', margin: '0 1%' }}>
                                    <div className="styles_DetailInfo">
                                        <div className="styles_cardImage">
                                            <span
                                                style={{
                                                    boxSizing: "border-box",
                                                    display: "block",
                                                    overflow: "hidden",
                                                    width: "initial",
                                                    height: "initial",
                                                    background: "none",
                                                    opacity: 1,
                                                    border: 0,
                                                    margin: 0,
                                                    padding: 0,
                                                    position: "relative"
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        boxSizing: "border-box",
                                                        display: "block",
                                                        width: "initial",
                                                        height: "initial",
                                                        background: "none",
                                                        opacity: 1,
                                                        border: 0,
                                                        margin: 0,
                                                        padding: "150% 0px 0px"
                                                    }}
                                                />
                                                <img
                                                    alt="Tiêu chuẩn (Trả kết quả trong vòng 25-30 ngày) Xét nghiệm ADN Hài cốt liệt sĩ"
                                                    sizes="100vw"

                                                    src="../image/bacsigiadinh.webp"

                                                    style={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        boxSizing: "border-box",
                                                        padding: 0,
                                                        border: "none",
                                                        margin: "auto",
                                                        display: "block",
                                                        width: 0,
                                                        height: 0,
                                                        minWidth: "100%",
                                                        maxWidth: "100%",
                                                        minHeight: "100%",
                                                        maxHeight: "100%",
                                                        objectFit: "contain"
                                                    }}
                                                />
                                            </span>
                                        </div>
                                        <div className="styles_cardBody">
                                            <div className="styles_cardContent">
                                                <h3 className="styles_title">Tiêu chuẩn (Trả kết quả trong vòng 25-30 ngày) Xét nghiệm ADN Hài cốt liệt sĩ</h3>
                                                <p className="styles_contentItem">
                                                    <span className="styles_icon">
                                                        <span style={{ boxSizing: 'border-box', display: 'block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '0px', position: 'relative' }}>
                                                            <span style={{ boxSizing: 'border-box', display: 'block', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '100% 0px 0px' }}></span>
                                                            <img
                                                                alt="Icon bệnh viện"
                                                                sizes="100vw"
                                                                
                                                                src="../image/logo3.svg"
                                                                decoding="async"
                                                                data-nimg="responsive"
                                                                style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                                            />
                                                        </span>

                                                    </span>
                                                    Bệnh viện Khoái Châu
                                                </p>
                                                <div className="ant-row" style={{alignItems:'center', marginTop:'10px',marginBottom:'10px'}}>
                                                    <div className="ant-1">
                                                        <div className="styles_price">
                                                            <div className="styles_sale">
                                                                Giá:
                                                                12.000.000 đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ant-2">
                                                        <div className="styles_btnControl">
                                                            <button className="styles_btnBooking">
                                                                <span>Đặt khám ngay</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        

                                    </div>
                                    
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '20px',display:'flex',justifyContent:'center' }}> {/* Căn giữa phân trang */}
                            <Pagination
                                current={currentPage}
                                pageSize={itemsPerPage}
                                total={totalItems}
                                onChange={handlePageChange}
                            />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Xetnghiem



