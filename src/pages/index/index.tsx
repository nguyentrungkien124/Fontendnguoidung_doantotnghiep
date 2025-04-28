import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../index/index.css"
import { faStar, faChevronLeft, faUser, faMagnifyingGlass, faChevronRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import axios from "axios";
import { Slider } from "antd";
import { useNavigate } from "react-router-dom";
// import "../index/main.css"

interface khoa {
    id?: number;
    ten?: string;
    mo_ta?: string;
    hinh_anh?: any;
}

interface BacSi {
    bac_si_id: string
    id: string;
    ho_ten: string;
    khoa_id: number;
    chuyen_mon: string;
    so_dien_thoai: string;
    email: string;
    ngay_sinh: string;
    gioi_tinh: string;
    dia_chi: string;
    hinh_anh: string;
    mat_khau: string;
    gia: string;
    khambenh_qua_video: boolean;
    so_luong_kham: string;
    chuc_danh: string;
    ten_bac_si: string;
    trung_binh_so_sao: string,
    tong_luot_kham: string;
    tenKhoa: string;
    ten_chuyen_mon: string;
}

interface BookingPackageDetail {
    id: number;
    goi_kham_id: number;
    ten_chi_tiet: string;
    mo_ta: string;
    gia: string;
    gia_giam: string;
    hinh_anh: string;
}

interface ChuyenMon {
    id: number;
    ten_chuyen_mon: string;
}
const Index = function () {
    // const [specialties, setSpecialties] = useState<khoa[]>([]);
    // const [bacsi, setBacSi] = useState<BacSi[]>([]);
    const [topbacsi, setTopBacSi] = useState<BacSi[]>([]);
    //  const navigate = useNavigate();
    const [specialties, setSpecialties] = useState<khoa[]>([]);
    const [bacsi, setBacSi] = useState<BacSi[]>([]);
    const navigate = useNavigate();
    const [packages, setPackages] = useState<BookingPackageDetail[]>([]);
    const [selectedType, setSelectedType] = useState(3); // Mặc định chọn gói khám sức khỏe (3)
    const PAGE = 1; // Trang hiện tại
    const ITEMS_PER_PAGE = 10; // Số lượng items trên mỗi trang

    const [chuyenMonList, setChuyenMonList] = useState<ChuyenMon[]>([]);
    useEffect(() => {
        const fetchChuyenMonList = async () => {
            try {
                const response = await axios.get('http://localhost:9999/api/chuyenmon/getall');
                setChuyenMonList(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách chuyên môn:', error);
            }
        };
        fetchChuyenMonList();
    }, []);


    // 
    const [currentIndex3, setCurrentIndex3] = useState(0);
    const ITEMS_TO_SHOW3 = 4;


    const fetchPackages = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/chitietgoikham/getcmgoikham/${selectedType}/${PAGE}/${ITEMS_PER_PAGE}`);
            setPackages(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu gói khám:", error);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, [selectedType]);
    const handleNext3 = () => {
        if (currentIndex3 + ITEMS_TO_SHOW3 < packages.length) {
            setCurrentIndex3((prevIndex) => prevIndex + ITEMS_TO_SHOW3);
        }
    };

    const handlePrevious3 = () => {
        if (currentIndex3 - ITEMS_TO_SHOW3 >= 0) {
            setCurrentIndex3((prevIndex) => prevIndex - ITEMS_TO_SHOW3);
        }
    };

    const currentItems3 = packages.slice(currentIndex3, currentIndex3 + ITEMS_TO_SHOW3);


    const handleTypeChange = (type: any) => {
        setSelectedType(type);
    };


    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await axios.get("http://localhost:9999/api/khoa/getall");
                setSpecialties(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu chuyên khoa:", error);
            }
        };

        fetchSpecialties();
    }, []);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get<BacSi[]>('http://localhost:9999/api/bacsi/getBacSiQuaVideo');
                console.log('Danh sách bác sĩ:', response.data);
                const doctorsData = response.data.map((doctor) => {
                    const chuyenMon = chuyenMonList.find(c => c.id.toString() === doctor.chuyen_mon);

                    return {
                        ...doctor,
                        ten_chuyen_mon: chuyenMon ? chuyenMon.ten_chuyen_mon : 'Không xác định',

                    };
                });
                setBacSi(doctorsData);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bác sĩ:', error);
            }
        };

        if (chuyenMonList.length > 0) {
            fetchDoctors();
        }
    }, [chuyenMonList]);

    useEffect(() => {
        const Top10Bacsi = async () => {
            try {
                const response = await axios.get("http://localhost:9999/api//thongke/GetTop10Doctors");
                setTopBacSi(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Lỗi ghi lấy dữ liệu top 10 bác sĩ:", error);
            }
        };
        Top10Bacsi();

    }, [])
    const handleNavigate = (khoa_id: number) => {
        navigate(`/chonBacSi?khoa_id=${khoa_id}`);
    };

    // Pagination logic
    const [currentIndex, setCurrentIndex] = useState(0);
    const ITEMS_TO_SHOW = 4; // Hiển thị 4 sản phẩm mỗi lần
    const handleNext = () => {
        if (currentIndex + ITEMS_TO_SHOW < bacsi.length) {
            setCurrentIndex((prevIndex) => prevIndex + ITEMS_TO_SHOW);
        }
    };

    const handlePrevious = () => {
        if (currentIndex - ITEMS_TO_SHOW >= 0) {
            setCurrentIndex((prevIndex) => prevIndex - ITEMS_TO_SHOW);
        }
    };

    const currentItems = bacsi.slice(currentIndex, currentIndex + ITEMS_TO_SHOW);


    const [currentIndex2, setCurrentIndex2] = useState(0);
    const ITEMS_TO_SHOW2 = 4; // Hiển thị 4 sản phẩm mỗi lần
    const handleNext2 = () => {
        if (currentIndex2 + ITEMS_TO_SHOW2 < topbacsi.length) {
            setCurrentIndex2((prevIndex) => prevIndex + ITEMS_TO_SHOW2);
        }
    };

    const handlePrevious2 = () => {
        if (currentIndex2 - ITEMS_TO_SHOW2 >= 0) {
            setCurrentIndex2((prevIndex) => prevIndex - ITEMS_TO_SHOW2);
        }
    };

    const currentItems2 = topbacsi.slice(currentIndex2, currentIndex2 + ITEMS_TO_SHOW2);


    // // bấm để next
    const [currentIndex1, setCurrentIndex1] = useState(0);
    const items = [
        { imgSrc: "../image/trangchu1.webp", title: "Đặt khám tại bệnh viện" },
        { imgSrc: "../image/trangchu2.webp", title: "Đặt khám theo bác sĩ" },
        { imgSrc: "../image/trangchu3.webp", title: "Tư vấn khám bệnh qua video" },
        { imgSrc: "../image/trangchu4.webp", title: "Đặt khám gói xét nghiệm" },
        { imgSrc: "../image/trangchu5.webp", title: "Đặt khám gói tiêm chủng" },
        { imgSrc: "../image/trangchu6.webp", title: "Đặt khám gói sức khỏe " },
        { imgSrc: "../image/trangchu7.webp", title: "Đặt khám theo bác sĩ" },
        { imgSrc: "../image/trangchu.webp", title: "Thanh toán viện phí " }
    ];

    const ITEMS_TO_SHOW1 = 7;
    const MAX_INDEX = items.length - ITEMS_TO_SHOW1; // Index cuối cùng mà bạn có thể cuộn đến

    const handleNext1 = () => {
        if (currentIndex < MAX_INDEX) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrevious1 = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    // Create a new array that includes the items shifted for continuous scrolling
    const displayedItems = [
        ...items.slice(currentIndex, currentIndex + ITEMS_TO_SHOW1),
        ...items.slice(0, Math.max(0, currentIndex + ITEMS_TO_SHOW1 - items.length))
    ];
    // banner tự chuyển động

    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const banners = [
        "../image/home15_3_09.jpg",
        "../image/home15_3_10.jpg",
        "../image/home15_3_11.jpg",
    ];

    const BANNERS_TO_SHOW = 1;
    const MAX_BANNER_INDEX = banners.length - BANNERS_TO_SHOW;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => (prevIndex < MAX_BANNER_INDEX ? prevIndex + 1 : 0));
        }, 3000); // Thời gian tự động chuyển banner

        return () => clearInterval(intervalId); // Cleanup để tránh memory leaks
    }, []);

    const handleNextBanner = () => {
        if (currentBannerIndex < MAX_BANNER_INDEX) {
            setCurrentBannerIndex((prevIndex) => prevIndex + 1);
        } else {
            setCurrentBannerIndex(0);
        }
    };

    const handlePreviousBanner = () => {
        if (currentBannerIndex > 0) {
            setCurrentBannerIndex((prevIndex) => prevIndex - 1);
        } else {
            setCurrentBannerIndex(MAX_BANNER_INDEX);
        }
    };
    const handleBacSiClick1 = (bac_si_id: string, hoTen: string, chuyenKhoa: string) => {
        sessionStorage.setItem('selectedDoctor', JSON.stringify({
            id: bac_si_id,
            name: hoTen,
            specialty: chuyenKhoa
        }));

        sessionStorage.setItem('bacsi_id', bac_si_id);
        navigate(`/Chitietthongtinbacsi?bac_si_id=${bac_si_id}`);
    };

    const handleBacSiClick2 = (id: string) => {
        // 

        sessionStorage.setItem('bacsi_id', id);
        navigate(`/Chitietthongtinbacsi?bac_si_id=${id}`);
    };
    console.log("currentItems", currentItems)


    const ClickBacSiKhamQ = () => {
        navigate('/Bacsikhamquavideo');
    };
    const handleBooking = (doctor: BacSi) => {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        const bookingInfo = {
            bac_si_id: doctor.id,
            date: formattedDate,
            doctorSpecialty: doctor.ten_chuyen_mon,
            doctorName: doctor.ho_ten,
            gia: doctor.gia,
            appointmentType: 'online'
        };

        sessionStorage.setItem('selectedAppointment', JSON.stringify(bookingInfo));
        navigate("/Chondichvu");
    };
    return (
        <>
            <body>
                <div className="styles_bodys">
                    <div className="index-main">
                        {/* phần 1 */}
                        <div className="index-header">
                            <div className="styles_bannerHeader">
                                {/* <img src="../image/back.webp" alt="Ảnh nền banner"style={{width:'100%',height:'100%'}} /> */}
                                <div className="styles_container">
                                    <div className="styles_contentLeft">
                                        <div className="styles_wrapper">
                                            <div className="styles_tag">Nền tảng chăm sóc sức khỏe toàn diện</div>
                                            <h1 className="styles_title">Kết nối người dân với Bệnh viện Khoái Châu</h1>
                                            <div className="styles_searchInputCustom">
                                                <div className="styles_inputPopover">
                                                    <span className="ant-input">
                                                        <span className="ant-i">
                                                            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ height: '24px', width: '24px', color: '#B1B1B1' }} />
                                                        </span>
                                                        <input placeholder="Tìm kiếm bác sĩ" type="text" className="ant-inputs" />
                                                    </span>

                                                </div>
                                            </div>
                                            <h3 className="styles_desc">Bệnh viện đa khoa - Dịch vụ khám chữa bệnh chuyên nghiệp</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                            <div className="index_service">
                                <div className="styles_serviceHeader">
                                    <div className="ant-carousel">
                                        <div className="slick-slider">
                                            <div className="slick-list">
                                                <div className="slick-track" style={{ width: '1400px' }}>
                                                    {displayedItems.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="slick-active"
                                                            style={{ outline: 'none', width: '175px', flex: 'none' }}
                                                        >
                                                            <div>
                                                                <div className="styles_item" style={{ width: '100%', display: 'inline-block' }}>
                                                                    <div className="styles_card">
                                                                        <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', height: '60px', width: '60px', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'relative' }}>
                                                                            <img src={item.imgSrc} alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '100%', height: '100%' }} />
                                                                        </span>
                                                                        <h3 className="styles_title">{item.title}</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* <div className="slick-next" onClick={handleNext} style={{ pointerEvents: currentIndex === items.length - ITEMS_TO_SHOW ? 'none' : 'auto', opacity: currentIndex === items.length - ITEMS_TO_SHOW ? 0.5 : 1 }}>
                                                    <FontAwesomeIcon icon={faChevronRight} />
                                                </div>
                                                <div className="slick-prev" onClick={handlePrevious} style={{ pointerEvents: currentIndex === 0 ? 'none' : 'auto', opacity: currentIndex === 0 ? 0.5 : 1 }}>
                                                    <FontAwesomeIcon icon={faChevronLeft} />
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* phần 2 */}
                        <div className="index_homeContainer">
                            {/* 1 */}
                            <div className="styles_Cooperated">
                                <div className="styles_Cooperated_1">
                                    <h2 className="styles_headline_title"> Được tin tưởng hợp tác </h2>
                                </div>
                                <div className="styles_Cooperated_2">
                                    <div className="ant-carousel">
                                        <div className="slick-slider styles_content_carousel">
                                            <div className="slick-list">
                                                <div className="slick-track" style={{ width: '2262px', opacity: '1', transform: 'translate3d(0px, 0px, 0px)' }}>
                                                    <div className="slick-slide" style={{ outline: 'none' }}>
                                                        <div>
                                                            <div className="styles_carousel_item">
                                                                <div className="styles_carousel_item_image">
                                                                    <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: '64px', height: '64px', background: 'none', opacity: '1', border: '0', margin: '0', padding: '0', position: 'relative' }}>
                                                                        <img src="../image/phan2_trangchu1.webp" alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} />
                                                                    </span>
                                                                </div>
                                                                <h3 className="styles_carousel_item_name">Bệnh viện Trưng Vương</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="slick-slide" style={{ outline: 'none' }}>
                                                        <div>
                                                            <div className="styles_carousel_item">
                                                                <div className="styles_carousel_item_image">
                                                                    <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: '64px', height: '64px', background: 'none', opacity: '1', border: '0', margin: '0', padding: '0', position: 'relative' }}>
                                                                        <img src="../image/Logo-Benh-Vien-Bach-Mai-Gr.webp" alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} />
                                                                    </span>
                                                                </div>
                                                                <h3 className="styles_carousel_item_name">Bệnh viện Bạch Mai</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="slick-slide" style={{ outline: 'none' }}>
                                                        <div>
                                                            <div className="styles_carousel_item">
                                                                <div className="styles_carousel_item_image">
                                                                    <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: '64px', height: '64px', background: 'none', opacity: '1', border: '0', margin: '0', padding: '0', position: 'relative' }}>
                                                                        <img src="../image/logo-benh-vien-dong-do_090235394.png" alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} />
                                                                    </span>
                                                                </div>
                                                                <h3 className="styles_carousel_item_name">Bệnh viện Đông Đô</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="slick-slide" style={{ outline: 'none' }}>
                                                        <div>
                                                            <div className="styles_carousel_item">
                                                                <div className="styles_carousel_item_image">
                                                                    <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: '64px', height: '64px', background: 'none', opacity: '1', border: '0', margin: '0', padding: '0', position: 'relative' }}>
                                                                        <img src="../image/th.jpg" alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} />
                                                                    </span>
                                                                </div>
                                                                <h3 className="styles_carousel_item_name">Bệnh viện Đa Khoa Hưng Yên</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="slick-slide" style={{ outline: 'none' }}>
                                                        <div>
                                                            <div className="styles_carousel_item">
                                                                <div className="styles_carousel_item_image">
                                                                    <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: '64px', height: '64px', background: 'none', opacity: '1', border: '0', margin: '0', padding: '0', position: 'relative' }}>
                                                                        <img src="../image/logo-benh-vien-k-national-cancer-hospital.png" alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} />
                                                                    </span>
                                                                </div>
                                                                <h3 className="styles_carousel_item_name">Bệnh viện K</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="slick-slide" style={{ outline: 'none' }}>
                                                        <div>
                                                            <div className="styles_carousel_item">
                                                                <div className="styles_carousel_item_image">
                                                                    <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: '64px', height: '64px', background: 'none', opacity: '1', border: '0', margin: '0', padding: '0', position: 'relative' }}>
                                                                        <img src="../image/logo-benh-vien-30-4_090234256.png" alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} />
                                                                    </span>
                                                                </div>
                                                                <h3 className="styles_carousel_item_name">Bệnh viện 304</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className='styles_CarouselBanner'>
                                <div className="styles_CarouselDestop">
                                    <div className="ant-carousel">
                                        <div className="slick-slider">
                                            <div className="slick-list">
                                                <div className="slick-track" style={{ width: '8260px', opacity: '1' }}>
                                                    {banners.map((bannerSrc, index) => (
                                                        <div
                                                            className={`slick-slide ${index === currentBannerIndex ? "slick-active" : ""}`}
                                                            style={{ width: '1180px', display: index === currentBannerIndex ? "block" : "none" }}
                                                            key={index}
                                                        >
                                                            <div>
                                                                <a href="">
                                                                    <span style={{
                                                                        boxSizing: 'border-box',
                                                                        display: 'inline-block',
                                                                        overflow: 'hidden',
                                                                        width: '1180px',
                                                                        height: '310px',
                                                                        background: 'none',
                                                                        opacity: '1',
                                                                        border: '0px',
                                                                        margin: '0px',
                                                                        padding: '0px',
                                                                        position: 'relative'
                                                                    }}>
                                                                        <img src={bannerSrc} alt="" style={{
                                                                            position: 'absolute',
                                                                            inset: '0px',
                                                                            boxSizing: 'border-box',
                                                                            padding: '0px',
                                                                            border: 'none',
                                                                            margin: 'auto',
                                                                            display: 'block',
                                                                            width: '0px',
                                                                            height: '0px',
                                                                            minWidth: '100%',
                                                                            maxWidth: '100%',
                                                                            minHeight: '100%',
                                                                            maxHeight: '100%',
                                                                            borderRadius: '17.5px'
                                                                        }} />
                                                                    </span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="slick-prev1" onClick={handlePreviousBanner}>
                                                        <FontAwesomeIcon icon={faChevronLeft} />
                                                    </div>
                                                    <div className="slick-next1" onClick={handleNextBanner}>
                                                        <FontAwesomeIcon icon={faChevronRight} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}

                    </div>
                    <div className="index_Rectangle"></div>

                    <div className="index-main-ecomerce">
                        <div className="index_ecomerce">
                            {/* 1 */}
                            <div className="styles_NewPackageMonth">
                                <div className="styles_PackageMonthHeader">
                                    <div className="styles_PackageMonthHeaderTitle">
                                        <h2>Bác sĩ có lượt khám nhiều nhất</h2>
                                    </div>
                                </div>
                                <div className="styles_BodyCardDoctorTelemed">
                                    <div className="ant-carousel">
                                        <div className="slick-slider">
                                            <button className="slick-prev" style={{ display: 'block' }} onClick={handlePrevious2} disabled={currentIndex2 === 0}>
                                                <FontAwesomeIcon icon={faChevronLeft} />
                                            </button>
                                            <div className="slick-list">
                                                {currentItems2.map((ts) => {
                                                    // Tìm tên khoa tương ứng với khoa_id của bác sĩ
                                                    const tenKhoa = specialties.find((khoa) => khoa.id === ts.khoa_id)?.ten || "Chưa rõ";

                                                    return (
                                                        <div className="slick-slide" key={ts.bac_si_id} onClick={() => handleBacSiClick1(ts.bac_si_id, ts.ho_ten, ts.chuyen_mon)}>
                                                            <div style={{ width: '100%', display: 'inline-block' }}>
                                                                <div className="styles_DetailDoctor">
                                                                    <div className="styles_DetailDoctorCard">
                                                                        <div className="styles_DetailDoctorCardImage">
                                                                            <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'relative' }}>
                                                                                <img
                                                                                    src={ts.hinh_anh}
                                                                                    alt={ts.ten_bac_si}
                                                                                    style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', objectFit: 'cover' }}
                                                                                />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="styles_DetailDoctorTelemedCardContent">
                                                                        <div className="styles_CardContentBodyEvaluate">
                                                                            <p className="styles_item">
                                                                                <label>Đánh giá:</label>
                                                                                {ts.trung_binh_so_sao ? (
                                                                                    <>
                                                                                        <span>{parseFloat(ts.trung_binh_so_sao).toString()}</span>
                                                                                        <FontAwesomeIcon
                                                                                            icon={faStar}
                                                                                            style={{ color: '#ffb54a', width: '16px', height: '16px' }}
                                                                                        />
                                                                                    </>
                                                                                ) : (
                                                                                    <span>Chưa có</span>
                                                                                )}
                                                                            </p>

                                                                            <p className="styles_item">
                                                                                <label>Lượt khám:</label>
                                                                                <span>{ts.so_luong_kham}</span>
                                                                                <FontAwesomeIcon icon={faUser} style={{ color: '#ffb54a', width: '16px', height: '16px' }} />
                                                                            </p>
                                                                        </div>
                                                                        <div className="styles_CardContentHeader">
                                                                            <h2 className="styles_role">{ts.chuc_danh}</h2>
                                                                            <h2 className="styles_name">{ts.ten_bac_si}</h2>
                                                                        </div>
                                                                        <div className="styles_CardContentBody">
                                                                            <div className="styles_CardContentBodyText">
                                                                                <img src="../image/logokhoa1.svg" alt="" />
                                                                                <p>{tenKhoa}</p>  {/* Hiển thị tên khoa */}
                                                                            </div>
                                                                            <div className="styles_CardContentBodyText">
                                                                                <img src="../image/logo2.svg" alt="" />
                                                                                <p>{parseInt(ts.gia).toLocaleString('vi-VN')} VNĐ</p>  {/* Hiển thị giá với định dạng tiền tệ VNĐ */}
                                                                            </div>
                                                                            <div className="styles_CardContentBodyText">
                                                                                <img src="../image/logo3.svg" alt="" />
                                                                                <p>Bệnh viện Khoái Châu</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="styles_DoctorTelemedFoorterCard">
                                                                            <button className="ant-btn styles_DoctorTelemedButton">
                                                                                <span>Tư vấn ngay</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                            </div>
                                            <button className="slick-next" style={{ display: 'block' }} onClick={handleNext2} disabled={currentIndex2 + ITEMS_TO_SHOW2 >= topbacsi.length}>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button className="styles_NextButton ">
                                    <p>Xem tất cả</p>
                                    <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'relative', maxWidth: '100%' }}>

                                    </span>
                                </button>
                            </div>
                            {/* 2 */}
                            <div className="styles_NewDoctorTelemed">
                                <div className="styles_NewDoctorTelemedHeader">
                                    <div className="styles_NewDoctorTelemedHeaderTitle">
                                        <h2>
                                            Bác sĩ TƯ VẤN khám bệnh qua video
                                        </h2>
                                    </div>
                                </div>
                                <div className="styles_BodyCardDoctorTelemed">
                                    <div className="ant-carousel">
                                        <div className="slick-slider">
                                            <button className="slick-prev" style={{ display: 'block' }} onClick={handlePrevious} disabled={currentIndex === 0}>
                                                <FontAwesomeIcon icon={faChevronLeft} />
                                            </button>
                                            <div className="slick-list" >
                                                {currentItems.map((bs) => {
                                                    // Tìm tên khoa tương ứng với khoa_id của bác sĩ
                                                    const tenKhoa = specialties.find((khoa) => khoa.id === bs.khoa_id)?.ten || "Chưa rõ";

                                                    return (
                                                        <div className="slick-slide" >
                                                            <div style={{ width: '100%', display: 'inline-block' }}>
                                                                <div className="styles_DetailDoctor">
                                                                    <div className="styles_DetailDoctorCard">
                                                                        <div className="styles_DetailDoctorCardImage">
                                                                            <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'relative' }}>
                                                                                <img
                                                                                    key={bs.id} onClick={() => handleBacSiClick2(bs.id)}
                                                                                    src={bs.hinh_anh}
                                                                                    alt={bs.ho_ten}
                                                                                    style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', objectFit: 'cover' }}
                                                                                />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="styles_DetailDoctorTelemedCardContent">
                                                                        <div className="styles_CardContentBodyEvaluate">
                                                                            <p className="styles_item">
                                                                                <label>Đánh giá:</label>
                                                                                {bs.trung_binh_so_sao ? (
                                                                                    <>
                                                                                        <span>{parseFloat(bs.trung_binh_so_sao).toString()}</span>
                                                                                        <FontAwesomeIcon
                                                                                            icon={faStar}
                                                                                            style={{ color: '#ffb54a', width: '16px', height: '16px' }}
                                                                                        />
                                                                                    </>
                                                                                ) : (
                                                                                    <span>Chưa có</span>
                                                                                )}
                                                                            </p>

                                                                            <p className="styles_item">
                                                                                <label>Lượt khám:</label>
                                                                                <span>{bs.tong_luot_kham}</span>
                                                                                <FontAwesomeIcon icon={faUser} style={{ color: '#ffb54a', width: '16px', height: '16px' }} />
                                                                            </p>
                                                                        </div>
                                                                        <div className="styles_CardContentHeader" key={bs.id} onClick={() => handleBacSiClick2(bs.id)}>
                                                                            <h2 className="styles_role">{bs.chuc_danh} </h2>
                                                                            <h2 className="styles_name">{bs.ho_ten}</h2>
                                                                        </div>
                                                                        <div className="styles_CardContentBody">
                                                                            <div className="styles_CardContentBodyText">
                                                                                <img src="../image/logokhoa1.svg" alt="" />
                                                                                <p>{tenKhoa}</p>  {/* Hiển thị tên khoa */}
                                                                            </div>
                                                                            <div className="styles_CardContentBodyText">
                                                                                <img src="../image/logo2.svg" alt="" />
                                                                                <p>{parseInt(bs.gia).toLocaleString('vi-VN')} VNĐ</p>  {/* Hiển thị giá với định dạng tiền tệ VNĐ */}
                                                                            </div>
                                                                            <div className="styles_CardContentBodyText">
                                                                                <img src="../image/logo3.svg" alt="" />
                                                                                <p>Bệnh viện Khoái Châu</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="styles_DoctorTelemedFoorterCard">
                                                                            <button className="ant-btn styles_DoctorTelemedButton" onClick={() => handleBooking(bs)}>
                                                                                <span>Tư vấn ngay</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                            </div>
                                            <button className="slick-next" style={{ display: 'block' }} onClick={handleNext} disabled={currentIndex + ITEMS_TO_SHOW >= bacsi.length}>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button className="styles_NextButton " onClick={ClickBacSiKhamQ}>
                                    <p>Xem tất cả</p>
                                    <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'relative', maxWidth: '100%' }}>

                                    </span>
                                </button>
                            </div>

                            <div className="styles_NewBookingPackage" style={{ marginTop: '15px' }}>
                                <div className="styles_NewBookingPackageHerder">
                                    <div className="styles_NewBookingPackageHerderText">
                                        <h2>Chăm sóc sức khỏe toàn diện</h2>
                                    </div>
                                </div>
                                <div className="styles_NewBookingPackageHerderButton">
                                    <ul className="styles_tag">
                                        <li>
                                            <button
                                                className={`styles_tagItem ${selectedType === 2 ? 'styles_active' : ''}`}
                                                onClick={() => handleTypeChange(2)}
                                            >
                                                <span>Sức khỏe</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`styles_tagItem ${selectedType === 3 ? 'styles_active' : ''}`}
                                                onClick={() => handleTypeChange(3)}
                                            >
                                                <span>Tiêm chủng</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`styles_tagItem ${selectedType === 4 ? 'styles_active' : ''}`}
                                                onClick={() => handleTypeChange(4)}
                                            >
                                                <span>Xét nghiệm</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="styles_BodyCardPackage">
                                    <div className="ant-carousel">
                                        <div className="slick-slider">
                                            <button className="slick-prev" onClick={handlePrevious3} style={{ display: 'block' }} disabled={currentIndex3 === 0}>
                                                <FontAwesomeIcon icon={faChevronLeft} />
                                            </button>
                                            <div className="slick-list">
                                                <div className="slick-track">
                                                    {currentItems3.map((pkg) => (
                                                        <div className="slick-slide" key={pkg.id}>
                                                            <div>
                                                                <div className="styles_BookingPackageBody">
                                                                    <div className="styles_BookingPackageBodyCard">
                                                                        <div className="styles_BookingPackageBodyCardImage">
                                                                            <span style={{ display: "block", overflow: "hidden", width: "277px", height: "150px" }}>
                                                                                <img className="styles_img" src={pkg.hinh_anh} alt={pkg.hinh_anh} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                            </span>
                                                                        </div>
                                                                        <div className="styles_BookingPackageBodyCardContent">
                                                                            <div className="styles_BookingPackageName">
                                                                                <h2>{pkg.ten_chi_tiet}</h2>
                                                                            </div>
                                                                            <div className="styles_HospitalName">
                                                                                <label className="styles_name">{pkg.mo_ta}</label>
                                                                            </div>
                                                                            <div className="styles_BookingPackagePrice">
                                                                                <p className="styles_Price">{Number(pkg.gia_giam).toLocaleString('vi-VN')}đ</p>
                                                                                <p className="styles_Discount">{Number(pkg.gia).toLocaleString('vi-VN')}đ</p>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div className="styles_BookingPackageBodyFoorter">
                                                                        <button className="ant-btn styles_BookingPackageButton">
                                                                            <span>Đặt khám ngay</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <button className="slick-next" onClick={handleNext3} style={{ display: 'block' }} disabled={currentIndex3 + ITEMS_TO_SHOW3 >= packages.length}>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </button>
                                        </div>
                                    </div>
                                    <button className="styles_NextButton">
                                        <p>Xem tất cả</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="index_Rectangle2"></div>
                    <div className="index-main index-end">
                        <div id="index_homeContainer" className="styles_container styles_container-medproSeo">
                            <div className="styles_MPSpecialistCard">
                                <div className="styles_MPSpecialistCardTitle">
                                    <div className="styles_MPSpecialistCardTitleText">Chuyên khoa</div>
                                </div>
                                <div className="styles_MPSpecialistCardList" style={{ marginLeft: '193px' }}>
                                    {specialties.map((specialty) => (
                                        <div className="styles_MPSpecialistCardItem" key={specialty.id}
                                            onClick={() => handleNavigate(specialty.id!)}>

                                            <div>
                                                <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: '100px', height: '100px', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'relative' }}>
                                                    <img src={specialty.hinh_anh} alt={specialty.ten} style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '100%', height: '100%' }} />
                                                </span>
                                            </div>
                                            <div className="styles_MPSpecialistCardItemText">{specialty.ten}</div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                        <div id="index_homeContainer" className="styles_container">
                            <div className="styles_NewPackageMonth">
                                <div className="styles_NewPackageMonthHeader">
                                    <div className="styles_NewPackageMonthHeaderTitleText">
                                        <h2>Cảm nhận từ khách hàng</h2>
                                    </div>
                                </div>
                                <div className="styles_BodyCardPackageMonth" >
                                    <div className="ant-carousel">
                                        <div className="slick-slider">
                                            <div className="slick-list">
                                                <div className="slick-track" style={{ width: '1180px' }} >
                                                    <div className="slick-slide">
                                                        <div>
                                                            <div style={{ width: '0px', display: 'inline-block' }}>
                                                                <div className="styles_DetailFeelPeople">
                                                                    <div className="styles_DetailFeelPeopleTitle">
                                                                        <div className="styles_DetailFeelPeopleTitleImage">
                                                                            <span style={{
                                                                                boxSizing: 'border-box',
                                                                                display: 'block',
                                                                                overflow: 'hidden',
                                                                                width: 'initial',
                                                                                height: 'initial',
                                                                                background: 'none',
                                                                                opacity: '1',
                                                                                border: '0px',
                                                                                margin: '0px',
                                                                                padding: '0px',
                                                                                position: 'relative'
                                                                            }}>
                                                                                <span style={{
                                                                                    boxSizing: 'border-box', display: 'block', width: 'initial',
                                                                                    height: 'initial',
                                                                                    background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '120% 0px 0px'
                                                                                }}>
                                                                                    <img src="../image/Iconcomment.svg" alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minHeight: '100%', maxHeight: '100%', maxWidth: '100%', minWidth: '100%' }} />
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                        <div className="styles_DetailFeelPeopleTitleText">
                                                                            Đặt lịch xét nghiệm bên này rất gọn, có ngày giờ cụ thể luôn lên là được xét nghiệm liền không rườm rà gì mấy.
                                                                            An tâm đặt cho gia đình, có cả xét nghiệm tận nhà, không mất thời gian.
                                                                        </div>
                                                                    </div>
                                                                    <div className="styles_DetailFeelPeopleContent">
                                                                        <div className="styles_DetailFeelPeopleContentAvatar">
                                                                            <span style={{
                                                                                boxSizing: 'border-box',
                                                                                display: 'block',
                                                                                overflow: 'hidden',
                                                                                width: 'initial',
                                                                                height: 'initial',
                                                                                background: 'none',
                                                                                opacity: '1',
                                                                                border: '0px',
                                                                                margin: '0px',
                                                                                padding: '0px',
                                                                                position: 'relative'
                                                                            }}>
                                                                                <span style={{
                                                                                    boxSizing: 'border-box', display: 'block', width: 'initial',
                                                                                    height: 'initial',
                                                                                    background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '100% 0px 0px'
                                                                                }}>
                                                                                    <img src="../image/nhannguyen.webp" alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minHeight: '100%', maxHeight: '100%', maxWidth: '100%', minWidth: '100%' }} />
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                        <div className="styles_DetailFeelPeopleName">Nhân Nguyễn </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    );

}
export default Index;

