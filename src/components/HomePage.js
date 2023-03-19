import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  const GetStart = () => {
    navigate(`/Questionnaire`);
  };

  return (
    <div className="home-page-container">
      <h1 className="home-page-heading">
        เว็บไซต์ที่จะช่วยคุณตรวจสอบสภาวะผิดปกติของดวงตาเบื้องต้นก่อนจะไปปรึกษาแพทย์ผู้เชี่ยวชาญ
      </h1>
      <p className="home-page-subheading">
        เว็บไซต์นี้จะตรวจสอบอะไร?
        เว็บไซต์นี้จะเป็นตัวช่วยให้คุณวินิฉัยโรคดวงตาเบื้องต้นให้คุณว่าคุณโอกาสเสี่ยงต่อโรคมากน้อยแค่ไหนและนำผลการทดสอบไปปรึกษาแพทย์ผู้เชี่ยวชาญ
      </p>
      <button className="home-page-button" onClick={GetStart}>
        เริ่มกันเลย
      </button>
    </div>
  );
}
