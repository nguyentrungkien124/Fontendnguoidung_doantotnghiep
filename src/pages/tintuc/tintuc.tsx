import { faArrowRight, faCalendar } from "@fortawesome/free-solid-svg-icons";
import "../tintuc/tintuc.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "antd";
// import ReactHtmlParser from 'html-react-parser'; // Đảm bảo import đúng

interface Category {
    id: number;
    tieu_de: string;
    mo_ta: string;
    trang_thai: number;
    created_at: string;
    updated_at: string;
}

interface BaiViet {
    id: number;
    id_admin: number | null;
    tieu_de: string;
    noi_dung: string;
    hinh_anh: string;
    loai_bai_viet: number;
    trang_thai: number;
    luot_xem: number | null;
    ngay_dang: string;
    RowNumber: number;
    RecordCount: string;
    PageCount: number;
}

const Tintuc = () => {
    const [categories, setCategories] = useState<Category[]>([]); // Danh sách nhóm bài viết
    const [newsData, setNewsData] = useState<BaiViet[]>([]); // Dữ liệu bài viết
    const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
    const [selectedCategory, setSelectedCategory] = useState<number>(1); // ID nhóm bài viết
    const [page, setPage] = useState(1); // Trang hiện tại
    const [limit] = useState(16); // Số bài viết trên mỗi trang

    // Lấy danh sách nhóm bài viết
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:9999/api/nhombaiviet/getall");
                setCategories(response.data); // Cập nhật danh sách nhóm bài viết
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchCategories();
    }, []);


    // Lấy nhóm bài viết được lưu trong Session Storage
    useEffect(() => {
        const savedCategoryId = sessionStorage.getItem("selectedCategory");
        if (savedCategoryId) {
            setSelectedCategory(parseInt(savedCategoryId)); // Gán giá trị từ sessionStorage
        }
    }, []);

    // Gọi API lấy bài viết
    useEffect(() => {
        const fetchNews = async () => {
            const categoryId = sessionStorage.getItem("selectedCategory") || selectedCategory; // Lấy từ sessionStorage
            try {
                const response = await axios.get(
                    `http://localhost:9999/api/baiviet/getbaivietCM/${categoryId}/${page}/${limit}}`
                );
                // Sắp xếp tin nổi bật trước
                const highlightedNews = response.data.filter((news: BaiViet) => news.trang_thai === 1);
                const normalNews = response.data.filter((news: BaiViet) => news.trang_thai === 0);
                const sortedNews = [...highlightedNews, ...normalNews];
                setNewsData(sortedNews); // Cập nhật dữ liệu bài viết
            } catch (error) {
                console.error("Error fetching news", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [selectedCategory, page, limit]); // Gọi lại khi `selectedCategory`, `page`, hoặc `limit` thay đổi

    // Xử lý khi chọn nhóm bài viết
    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategory(categoryId); // Cập nhật state
        sessionStorage.setItem("selectedCategory", categoryId.toString()); // Lưu vào Session Storage
        setPage(1); // Đặt lại về trang đầu tiên
    };
    const handleNewsClick = (newsId: number) => {
        sessionStorage.setItem("selectedNews", newsId.toString()); // Lưu ID bài viết vào Session Storage
    };

    // Xử lý chuyển trang
    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const highlightedNews = newsData.filter(news => news.trang_thai === 1);

    return (
        <div className="styles_body2">
            <div style={{ background: "rgb(255, 255, 255)" }}>
                <div className="styles_news">
                    <div className="styles_newsHeaderNavbar">
                        <a href="">
                            <div className="styles_title">Tin tức y khoa</div>
                        </a>
                        <div className="styles_desktop" style={{ marginBottom: 10 }}>
                            {categories.map((category) => (
                                <div key={category.id} onClick={() => handleCategoryClick(category.id)}>
                                    <a href="">
                                        <div className={`styles_tabItem ${selectedCategory === category.id ? "styles_active" : ""}`}>
                                            {category.tieu_de} {/* Hiển thị tên loại bài viết */}
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="styles_container" style={{ minHeight: 3000 }}>
                        <div className="styles_catePost">
                            <div className="styles_headerWrapper" style={{ marginLeft: '-17.5px', marginRight: '-17.5px', rowGap: '0px' }}>
                                {highlightedNews.length > 0 && (
                                    <div key={highlightedNews[0].id} className="styles_left" style={{ paddingLeft: '17.5px', paddingRight: '17.5px' }}>
                                        <a href="/Chitiettintuc" onClick={() => handleNewsClick(highlightedNews[0].id)}>
                                            <div className="styles_card1">
                                                <div className="styles_image">
                                                    <span style={{ boxSizing: 'border-box', display: 'block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: '1', border: '0px', margin: '-20px', padding: '0px', position: 'absolute', inset: 0 }}>
                                                        <img src={highlightedNews[0].hinh_anh || "../image/default.jpg"} alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%', borderRadius: 10 }} />
                                                    </span>
                                                </div>
                                                <div className="styles_categories"></div>
                                                <h2 className="styles_title">{highlightedNews[0].tieu_de}</h2>
                                                <div className="styles_description" style={{ fontSize: 12, color: '#737373' }}>
                                                    {highlightedNews[0].noi_dung.length > 100 ? (
                                                        <div dangerouslySetInnerHTML={{ __html: highlightedNews[0].noi_dung.substring(0, 50) + '...' }} />
                                                    ) : (
                                                        <div dangerouslySetInnerHTML={{ __html: highlightedNews[0].noi_dung }} />
                                                    )}
                                                </div>

                                                <div className="styles_tag">
                                                    <div className="styles_icon">
                                                        <FontAwesomeIcon icon={faCalendar} />
                                                    </div>
                                                    <span>
                                                        {new Date(highlightedNews[0].ngay_dang).toLocaleDateString('vi-VN')}
                                                    </span>

                                                    <span> - </span>
                                                    <span>Admin</span>
                                                </div>
                                                <div className="styles_more">
                                                    Xem tiếp
                                                    <div className="styles_icon styles_rightIcon">
                                                        <FontAwesomeIcon icon={faArrowRight} style={{ color: 'rgb(0, 224, 255)' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                )}
                                <div className="styles_right" style={{ paddingLeft: '17.5px', paddingRight: '17.5px' }}>
                                    <div className="styles_list">
                                        {newsData.slice(0, 5).map((news) => (
                                            <div className="styles_cardItem">
                                                <a href="/Chitiettintuc" onClick={() => handleNewsClick(news.id)}>
                                                    <div className="styles_cards">
                                                        <div className="styles_image">
                                                            <span style={{ boxSizing: 'border-box', display: 'block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'absolute', inset: 0 }}>
                                                                <img src={news.hinh_anh || "../image/default.jpg"} alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%', borderRadius: 10 }} />
                                                            </span>
                                                        </div>
                                                        <div className="content">
                                                            <div className="styles_categories">
                                                                <div className="styles_icon">
                                                                    <span className="styles_icon">
                                                                        <svg
                                                                            width="6"
                                                                            height="7"
                                                                            viewBox="0 0 6 7"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <circle
                                                                                cx="3"
                                                                                cy="3.23877"
                                                                                r="3"
                                                                                fill="#FFB54A"
                                                                                id="Ellipse_1880"
                                                                            />
                                                                        </svg>
                                                                    </span>
                                                                    <div style={{ marginLeft: 5 }}>Tin y tế</div>
                                                                </div>
                                                            </div>
                                                            <div className="styles_title">
                                                                {news.tieu_de}
                                                            </div>
                                                            <div className="styles_tag">
                                                                <div className="styles_icon">
                                                                    <FontAwesomeIcon icon={faCalendar} />
                                                                </div>
                                                                <span > {new Date(news.ngay_dang).toLocaleDateString()} {/* Chuyển đổi ngày tháng */}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>

                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>

                            <div className="styles_wrapper" style={{ rowGap: '30px', justifyContent: 'space-between', marginLeft: '-29px' }}>
                                {newsData
                                    .filter((news) => news.trang_thai === 0) // Chỉ lấy bài viết có trạng thái = 0
                                    .map((news) => (
                                        <div className="styles_item3" key={news.id}>
                                            <a href="/Chitiettintuc" onClick={() => handleNewsClick(news.id)}>
                                                <div className="styles_cards">
                                                    <div className="styles_image">
                                                        <span style={{ boxSizing: 'border-box', display: 'block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: '1', border: '0px', margin: '-20px', padding: '0px', position: 'absolute', inset: 0 }}>
                                                            <img src={news.hinh_anh || "../image/default.jpg"} alt="" style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%', borderRadius: 10 }} />
                                                        </span>
                                                    </div>
                                                    <div className="styles_categories">
                                                        <div className="styles_icon">
                                                            <span className="styles_icon">
                                                                <svg
                                                                    width="6"
                                                                    height="7"
                                                                    viewBox="0 0 6 7"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <circle
                                                                        cx="3"
                                                                        cy="3.23877"
                                                                        r="3"
                                                                        fill="#FFB54A"
                                                                        id="Ellipse_1880"
                                                                    />
                                                                </svg>
                                                            </span>

                                                        </div>
                                                        <div>Tin y tế</div>
                                                    </div>
                                                    <h2 className="styles_title">
                                                        {news.tieu_de}
                                                    </h2>
                                                    {/* <div className="styles_description">
                                                {ReactHtmlParser(news.noi_dung)}
                                                </div> */}
                                                    <div className="styles_tag">
                                                        <div className="styles_icon">
                                                            <FontAwesomeIcon icon={faCalendar} />
                                                        </div>
                                                        <span > {new Date(news.ngay_dang).toLocaleDateString()} {/* Chuyển đổi ngày tháng */}</span>
                                                        <span>-</span>
                                                        <span>Thanh Ngân</span>
                                                    </div>
                                                    <div className="styles_more">
                                                        Xem tiếp
                                                        <div className="styles_icon styles_rightIcon">
                                                            <FontAwesomeIcon icon={faArrowRight} style={{ color: 'rgb(0, 224, 255)', marginTop: 6 }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>

                                        </div>
                                    ))}

                            </div>
                        </div>
                        <div className="styles_pagination" style={{ textAlign: 'center', marginBottom: 20, marginLeft: 500 }}>
                            <Pagination
                                current={page}
                                total={parseInt(newsData[0]?.RecordCount || '0', 15)} // Tổng số bài viết
                                pageSize={limit}
                                onChange={handlePageChange}
                            />

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Tintuc;
