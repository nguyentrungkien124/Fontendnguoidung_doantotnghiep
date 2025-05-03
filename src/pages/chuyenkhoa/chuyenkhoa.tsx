import { faCalendarDays, faChevronRight, faHandHoldingMedical, faHospital, faMedkit, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../chuyenkhoa/chuyenkhoa.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import axios from "axios";
interface khoa {
    id?: number;
    ten?: string;
    mo_ta?: string;
    hinh_anh?: any;
  }

const Chuyenkhoa = function () {
    const [specialties, setSpecialties] = useState<khoa[]>([]); 
    const navigate = useNavigate(); // Khởi tạo useNavigate

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await axios.get("http://localhost:9999/api/khoa/getall");
                setSpecialties(response.data); // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu chuyên khoa:", error);
            }
        };

        fetchSpecialties();
    }, []);
    const handleNavigate = (khoa_id: number) => {
        navigate(`/chonBacSi?khoa_id=${khoa_id}`);
    };

       

    return (
        <div>
            <div className="index-main index-end">
                <div id="index_homeContainer" className="styles_container styles_container-medproSeo">
                    <div className="styles_MPSpecialistCard" style={{ marginTop: '153px' }}>
                        <div className="styles_MPSpecialistCardTitle">
                            <div className="styles_MPSpecialistCardTitleText">Chuyên khoa</div>
                        </div>
                        <div className="styles_MPSpecialistCardList" style={{ marginLeft: '193px' }}>
                        {specialties.map((specialty) => (
                                <div className="styles_MPSpecialistCardItem" key={specialty.id}
                                onClick={() => handleNavigate(specialty.id!)}>
                                    <div>
                                        <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: '100px', height: '100px', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'relative' }}>
                                            <img  src={specialty.hinh_anh} alt={specialty.ten} style={{ position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '100%', height: '100%' }} />
                                        </span>
                                    </div>
                                    <div className="styles_MPSpecialistCardItemText" >{specialty.ten}</div>
                                </div>
                            ))}


                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Chuyenkhoa;



