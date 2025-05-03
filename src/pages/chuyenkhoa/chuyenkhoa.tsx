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

       

    return (
        <div>
            <div className="index-main index-end">
                <div id="index_homeContainer" className="styles_container styles_container-medproSeo">
                    <div className="styles_MPSpecialistCard" style={{ marginTop: '153px' }}>
                        <div className="styles_MPSpecialistCardTitle">
                            <div className="styles_MPSpecialistCardTitleText">Chuyên khoa</div>
                        </div>
                        <div className="styles_MPSpecialistCardList" style={{ marginLeft: '193px' }}>
                       

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Chuyenkhoa;



