import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import logo from "../img/A_B-removebg-preview.png";
import bg from "../img/bg-2.jpg";

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
              fontSize: "18px",
            }}
          >
            <li
              className={active === 0 ? "active" : ""}
              onClick={() => handleItemClick(0)}
            >
              Home
            </li>
            <li
              className={active === 1 ? "active" : ""}
              onClick={() => handleItemClick(1)}
            >
              About Us
            </li>
            <li
              className={active === 2 ? "active" : ""}
              onClick={() => handleItemClick(2)}
            >
              Services
            </li>
            <li
              className={active === 3 ? "active" : ""}
              onClick={() => handleItemClick(3)}
            >
              Pharmacy
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
    </div>
  );
}
