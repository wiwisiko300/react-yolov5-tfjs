import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Conclusion.css";
import html2pdf from "html2pdf.js";

export default function Conclusion() {
  const [getScores, setGetScores] = useState();
  const [text, setText] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const pdfRef = useRef(null);

  const NormalEyeString = params.get("NormalEye");
  const NormalEye = JSON.parse(NormalEyeString);
  const CataractEyeString = params.get("CataractEye");
  const CataractEye = JSON.parse(CataractEyeString);
  const newScore = params.get("newScore");

  const photoRef = useRef(null);

  const capturedImage = decodeURIComponent(
    location.search
      .slice(1)
      .split("&")
      .find((param) => param.startsWith("capturedImage="))
      .split("=")[1]
  );

  useEffect(() => {
    if (NormalEye !== null) {
      let scores = NormalEye?.map((x) => parseFloat(x.score));
      let sum = scores.reduce((acc, x) => acc + x, 0);
      let mean = sum / NormalEye.length;
      let total = (mean * 70) / 100;
      total += parseFloat(newScore);

      setText(NormalEye[0].Normal);
      setGetScores(total.toFixed(2));
    } else if (CataractEye !== null) {
      let scores = CataractEye?.map((x) => parseFloat(x.score));
      let sum = scores.reduce((acc, x) => acc + x, 0);
      let mean = sum / CataractEye.length;
      let total = (mean * 70) / 100;
      total += parseFloat(newScore);

      setText(CataractEye[0].Cataract);
      setGetScores(total.toFixed(2));
    }
  }, [NormalEye, CataractEye]);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const canvas = photoRef.current;
      const context = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
    };
    image.src = capturedImage;
  }, [capturedImage]);

  const OnTry = () => {
    setText("");
    setGetScores(0);
    navigate(`/`);
    window.location.reload();
  };

  const downloadPdf = () => {
    const pdfElement = pdfRef.current;

    const options = {
      margin: 0,
      filename: "conclusion.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(pdfElement).save();
  };

  return (
    <div>
      <div className="conclusion-container" ref={pdfRef}>
        <h1 className="conclusion-heading">สรุปผล</h1>
        {text === "Normal" && (
          <div className="conclusion-normal">
            <h1 className="conclusion-message">สายตาของคุณปกติ</h1>
            <p>โปรดรักษาสุขภาพดวงตาของคุณแบบนี้ไว้นะคะ</p>
            <div className="conclusion-score">
              สายตาของคุณปกติ <span style={{ color: "red" }}>{getScores}%</span>
            </div>
            <div className="conclusion-score">
              เสี่ยงต่อการเป็นโรคต้อหิน{" "}
              <span style={{ color: "red" }}>{(100 - getScores) / 2}%</span>
            </div>
            <div className="conclusion-score">
              เสี่ยงต่อการเป็นโรคต้อกระจก{" "}
              <span style={{ color: "red" }}>{(100 - getScores) / 2}%</span>
            </div>
            <div style={{ marginTop: "20px" }}>
              <canvas ref={photoRef}></canvas>
            </div>
          </div>
        )}
        {text === "Cataract" && getScores > 70 && (
          <div className="conclusion-cataract">
            <h1 className="conclusion-message">
              สายตาของคุณเสี่ยงต่อโรคต้อหิน
            </h1>
            <p>โปรดเข้าปรึกษาแพทย์โดยด่วน</p>
            <div className="conclusion-score">
              เสี่ยงต่อการเป็นโรคต้อหิน{" "}
              <span style={{ color: "red" }}>{getScores}%</span>
            </div>
            <div className="conclusion-score">
              เสี่ยงต่อการเป็นโรคต้อกระจก{" "}
              <span style={{ color: "red" }}>{100 - getScores}%</span>
            </div>

            <canvas ref={photoRef}></canvas>
          </div>
        )}
        {text === "Cataract" && getScores > 60 && getScores <= 70 && (
          <div className="conclusion-cataract">
            <h1 className="conclusion-message">
              สายตาของคุณเสี่ยงต่อโรคต้อกระจก
            </h1>
            <p>โปรดเข้าปรึกษาแพทย์โดยด่วน</p>
            <div className="conclusion-score">
              เสี่ยงต่อการเป็นโรคต้อกระจก{" "}
              <span style={{ color: "red" }}>{getScores}%</span>
            </div>
            <div className="conclusion-score">
              เสี่ยงต่อการเป็นโรคต้อหิน{" "}
              <span style={{ color: "red" }}>{100 - getScores}%</span>
            </div>

            <canvas ref={photoRef}></canvas>
          </div>
        )}

        {text === "Cataract" && getScores < 60 && (
          <div className="conclusion-normal">
            <h1 className="conclusion-message">
              โปรดลองใหม่อีกครั้งการตรวจเกินข้อผิดพลาด
            </h1>
            <p>
              โปรดลองใหม่อีกครั้งแล้วนำดวงตามองมาที่กล้องและค้างไว้ประมาณ 5
              วินาที
            </p>
            <div className="conclusion-score">สายตาของคุณปกติ {0}%</div>
            <div className="conclusion-score">
              เสี่ยงต่อการเป็นโรคต้อหิน {0}%
            </div>
            <div className="conclusion-score">
              เสี่ยงต่อการเป็นโรคต้อกระจก {0}%
            </div>
          </div>
        )}
      </div>
      <div className="container-btn">
        <button className="btn-try" onClick={OnTry}>
          ลองอีกครั้ง
        </button>
        <button className="btn-dowload" onClick={downloadPdf}>
          ดาวโหลด PDF
        </button>
      </div>
    </div>
  );
}
