import React, { useRef } from "react";
import Loaders from "./loader"; // import the Loader component from the appropriate file
import "../style/loader.css";
import "../style/App.css";
import beep from "../audios/deep.mp3";

export default function camera_({
  loading,
  modelName,
  videoRef,
  canvasRef,
  klass,
  score,
  newScore,
}) {
  return (
    <div className="App">
      <h1 style={{ color: "green" }}>
        โปรดนำดวงตาของท่านไว้ให้ตรงกรอบสีเขียว และค้างไว้ประมาณ 5 วินาที.
      </h1>
      {loading.loading ? (
        <Loaders>
          กำลังโหลดกรุณารอสักครู่... {(loading.progress * 100).toFixed(2)}%
        </Loaders>
      ) : (
        <p style={{ fontSize: "12px", color: "red" }}>
          *โมเดลยังอยู่ในช่วงการพัฒนา
        </p>
      )}

      <div className="content">
        <video autoPlay playsInline muted ref={videoRef} />
        <canvas width={640} height={640} ref={canvasRef} />
      </div>

      <div className="textContent">
        <table style={{ width: "100%" }}>
          <tr style={{ width: "50%" }}>
            <td style={{ fontSize: "20px", fontWeight: "bold" }}>
              ความผิดปกติของดวงตา
            </td>
            <td style={{ fontSize: "20px", fontWeight: "bold" }}> : </td>
            <td style={{ fontSize: "20px" }}> {klass}</td>
          </tr>
          <tr style={{ width: "50%" }}>
            <td style={{ fontSize: "20px", fontWeight: "bold" }}>
              เปอร์เซ็นความแม่นยำ
            </td>
            <td style={{ fontSize: "20px", fontWeight: "bold" }}> : </td>
            <td style={{ fontSize: "20px" }}> {score}%</td>
          </tr>

          {/* <tr style={{ width: "50%" }}>
            <td style={{ fontSize: "24px", fontWeight: "bold", color: "red" }}>
              {message}
            </td>
            <td style={{ fontSize: "20px", fontWeight: "bold" }}> : </td>
            <td style={{ fontSize: "20px" }}> {newScore}%</td>
          </tr> */}
        </table>
      </div>
    </div>
  );
}
