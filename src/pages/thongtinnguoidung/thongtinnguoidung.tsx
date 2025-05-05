import React, { useEffect, useState } from "react";
import { Modal, Card, Descriptions, Button, Space } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  PhoneOutlined,
  ManOutlined,
  IdcardOutlined,
  MailOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  SolutionOutlined,
  DeleteOutlined, InfoCircleOutlined, EditOutlined
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "../thongtinnguoidung/thongtinnguoidung.css";
import { useNavigate } from "react-router-dom";


interface User {
  id: number; // AI PK
  ho_ten: string; // varchar(100)
  email: string; // varchar(100)
  mat_khau: string; // varchar(255)
  so_dien_thoai: string; // varchar(15)
  ngay_sinh: string; // date
  gioi_tinh: string; // varchar(10)
  dia_chi: string; // varchar(255)
  hinh_anh: string; // varchar(255)
  created_at: Date; // timestamp
  updated_at: Date; // timestamp
  CMND:string,
  nghe_nghiep:string
}

const Thongtinnguoidung = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Trạng thái tải dữ liệu
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Hàm lấy thông tin người dùng từ API
  const fetchUserInfo = async (id: number) => {
    setIsLoading(true); // Bắt đầu tải dữ liệu
    try {
      const response = await fetch(`http://localhost:9999/api/user/getthongtinbyId/${id}`);
      const data = await response.json();

      // Trích xuất dữ liệu từ `data[0]`
      if (data && Array.isArray(data) && data.length > 0) {
        const newsData: User = data[0]; // Lấy dữ liệu từ phần tử đầu tiên
        setUserInfo(newsData); // Cập nhật state
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    } finally {
      setIsLoading(false); // Hoàn thành việc tải dữ liệu
    }
  };

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    const userId = Number(sessionStorage.getItem("id"));
    if (userId) {
      fetchUserInfo(userId);
    }
  }, []);
  const handleCapnhatthongtinnguoidungClick = () => {
    navigate('/Capnhatthongtinnguoidung'); // Đường dẫn đến trang Thongtinnguoidung
  };


  return (

    <div className="styles_body2">

      <div className="styles_breadcrumb">
        <div className="styles_containerPartner">

          <ul className="styles_breadcrumbs">
            <li><a href="/">Trang chủ</a></li>
            <li>
              <span className="styles_text">
                <FontAwesomeIcon icon={faChevronRight} width="1em" height='10px' fontSize={13} style={{ marginBottom: '-3px' }} />
                <a href="/" style={{ color: '#00b5f1' }}>Hồ sơ bệnh nhân</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="styles_container1">
        <div>
          {isLoading ? (
            <p>Đang tải thông tin...</p>
          ) : userInfo ? (
            <div className="styles_container">
              <Card
                title="Danh sách hồ sơ bệnh nhân"
                style={{
                  width: 600,
                  margin: "20px auto",
                  borderRadius: 10,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Descriptions column={1} style={{ marginBottom: 20 }}>
                  <Descriptions.Item
                    label={
                      <span>
                        <UserOutlined style={{ marginRight: 8 }} />
                        Họ và tên:
                      </span>
                    }
                  >
                    <span style={{ fontWeight: "bold", color: "#1890ff" }}>
                      {userInfo.ho_ten}
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span>
                        <CalendarOutlined style={{ marginRight: 8 }} />
                        Ngày sinh:
                      </span>
                    }
                  >
                    {userInfo?.ngay_sinh
                      ? new Date(userInfo.ngay_sinh).toLocaleDateString("vi-VN")
                      : "Chưa cập nhật"}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span>
                        <PhoneOutlined style={{ marginRight: 8 }} />
                        Số điện thoại:
                      </span>
                    }
                  >
                    {userInfo.so_dien_thoai}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span>
                        <ManOutlined style={{ marginRight: 8 }} />
                        Giới tính:
                      </span>
                    }
                  >
                    {userInfo.gioi_tinh}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span>
                        <EnvironmentOutlined style={{ marginRight: 8 }} />
                        Địa chỉ:
                      </span>
                    }
                  >
                    {userInfo.dia_chi}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span>
                        <TeamOutlined style={{ marginRight: 8 }} />
                        Dân tộc:
                      </span>
                    }
                  >
                    {userInfo.email}
                  </Descriptions.Item>
                </Descriptions>

                <div style={{ textAlign: "right" }}>
                  <Space>
                    <Button icon={<DeleteOutlined />} danger>
                      Xóa hồ sơ
                    </Button>
                    <Button icon={<EditOutlined />} type="primary" onClick={handleCapnhatthongtinnguoidungClick}>
                      Sửa hồ sơ
                    </Button>
                    <Button icon={<InfoCircleOutlined />} type="primary" onClick={showModal}>
                      Chi tiết
                    </Button>
                  </Space>
                </div>
              </Card>
            </div>
          ) : (
            <p>Không có thông tin người dùng.</p>
          )}
        </div>
      </div>
      <Modal
        title="Chi tiết hồ sơ"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        centered
      >   {isLoading ? (
        <p>Đang tải thông tin...</p>
      ) : userInfo ? (
        <Descriptions column={1} bordered>
          <Descriptions.Item
            label={
              <span>
                <UserOutlined style={{ marginRight: 8 }} />
                Họ và tên
              </span>
            }
          >
            <span style={{ fontWeight: "bold", color: "#1890ff" }}>
              {userInfo.ho_ten}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <CalendarOutlined style={{ marginRight: 8 }} />
                Ngày sinh
              </span>
            }
          >
            {userInfo?.ngay_sinh
              ? new Date(userInfo.ngay_sinh).toLocaleDateString("vi-VN")
              : "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <PhoneOutlined style={{ marginRight: 8 }} />
                Số điện thoại
              </span>
            }
          >
            {userInfo.so_dien_thoai}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <ManOutlined style={{ marginRight: 8 }} />
                Giới tính
              </span>
            }
          >
            {userInfo.gioi_tinh}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <IdcardOutlined style={{ marginRight: 8 }} />
                CMND
              </span>
            }
          >
                {userInfo.CMND}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <MailOutlined style={{ marginRight: 8 }} />
                Email
              </span>
            }
          >
            {userInfo.email}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <SolutionOutlined style={{ marginRight: 8 }} />
                Nghề Nghiệp
              </span>
            }
          >
                {userInfo.nghe_nghiep}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <GlobalOutlined style={{ marginRight: 8 }} />
                Quốc gia
              </span>
            }
          >
            Việt Nam
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <EnvironmentOutlined style={{ marginRight: 8 }} />
                Địa chỉ
              </span>
            }
          >
            {userInfo.dia_chi}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <TeamOutlined style={{ marginRight: 8 }} />
                Dân tộc
              </span>
            }
          >
            Kinh
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p>Không có thông tin người dùng.</p>
      )}
      </Modal>
    </div>
  );
};

export default Thongtinnguoidung;
