import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import logo from "../img/A_B-removebg-preview.png";
import bg from "../img/bg-2.jpg";
import SiImg1 from "../img/si-img.jpeg";
import SiImg2 from "../img/si-img-2.jpeg";
import SiImg3 from "../img/si-img-3.jpeg";
import SiImg4 from "../img/si-img-4.png";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export default function HomePage() {
  const navigate = useNavigate();

  const GetStart = () => {
    navigate(`/Questionnaire`);
  };

  const [active, setActive] = useState(0);

  const handleItemClick = (index) => {
    setActive(index);
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "7rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: "0",
          boxShadow: "0 0 20px #F5F5F5",
          zIndex: "999",
        }}
      >
        <div>
          <div style={{ marginLeft: "40px" }}>
            <img src={logo} alt="logo" width="120" height="100" />
          </div>
        </div>
        <div style={{ width: "30%" }}>
          <ul
            style={{
              display: "flex",
              justifyContent: "space-between",
              listStyle: "none",
              fontSize: "16px",
            }}
          >
            <li
              className={active === 0 ? "active" : ""}
              onClick={() => handleItemClick(0)}
            >
              <a href="#home" style={{ textDecoration: "none", color: "#000" }}>
                หน้าแรก
              </a>
            </li>
            <li
              className={active === 1 ? "active" : ""}
              onClick={() => handleItemClick(1)}
            >
              <a
                href="#information"
                style={{ textDecoration: "none", color: "#000" }}
              >
                ข้อมูลโรคต้อ
              </a>
            </li>
            <li
              className={active === 2 ? "active" : ""}
              onClick={() => handleItemClick(2)}
            >
              ข้อมูลสุขภาพ
            </li>
            <li
              className={active === 3 ? "active" : ""}
              onClick={() => handleItemClick(3)}
            >
              เกี่ยวกับเรา
            </li>
          </ul>
        </div>
        <div style={{ marginRight: "80px" }}>
          <button className="btn-started" onClick={GetStart}>
            GET STARTED
          </button>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "90vh",
          display: "flex",
          justifyContent: "space-around",
          background: "#ffff",
          marginTop: "100px",
        }}
        id="home"
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "auto",
            marginTop: "auto",
          }}
        >
          <h1 style={{ fontSize: "18px" }}>
            เว็บไซต์ที่จะช่วยคุณตรวจสอบสภาวะผิดปกติของดวงตาเบื้องต้น
            <br />
            ก่อนจะไปปรึกษาแพทย์ผู้เชี่ยวชาญ
          </h1>
          <p style={{ fontSize: "14px", marginTop: "10px" }}>
            เว็บไซต์นี้จะช่วยอะไร?
            เว็บไซต์นี้จะเป็นตัวช่วยให้คุณวินิฉัยโรคดวงตาเบื้องต้นให้คุณถ้าเกิดโอกาสเสี่ยงต่อ
            <br />
            โรคมากหรือน้อยแค่ไหนก่อนจะไปปรึกษาแพทย์ผู้เชี่ยวชาญ
          </p>
          <button
            onClick={GetStart}
            className="btn-started"
            style={{ marginTop: "50px" }}
          >
            เริ่มกันเลย
          </button>
        </div>
        <div>
          <img src={bg} alt="Loading..." />
        </div>
      </div>
      <div
        id="information"
        style={{
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "100px",
        }}
      >
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          // controlsStrategy="alternate"
        />
      </div>
    </div>
  );
}

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const items = [
  <div className="item" data-value="1">
    <a
      href={
        "https://www.bangkokhospital.com/content/cataracts-causes-and-important-factors-to-be-aware-of"
      }
    >
      <img src={SiImg1} height={300} width={500} />
    </a>
  </div>,
  <div className="item" data-value="2">
    <a href="https://www.bangkokhospital.com/content/pterygium">
      <img src={SiImg2} height={300} width={500} />
    </a>
  </div>,
  <div className="item" data-value="3">
    <a href="https://www.bangkokpattayahospital.com/th/healthcare-services/eye-center-th/eye-articles-th/item/2379-glaucoma-th.html">
      <img src={SiImg3} height={300} width={500} />
    </a>
  </div>,
  <div className="item" data-value="4">
    <a href="https://www.bangkokhospital.com/content/pinguecula-and-pterygium-degeneration-of-the-conjunctiva">
      <img src={SiImg4} height={300} width={500} />
    </a>
  </div>,
];
