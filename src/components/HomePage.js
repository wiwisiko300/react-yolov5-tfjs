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
import { Card, Image } from "antd";

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
              <a
                href="#health"
                style={{ textDecoration: "none", color: "#000" }}
              >
                ข้อมูลสุขภาพ
              </a>
            </li>
            <li
              className={active === 3 ? "active" : ""}
              onClick={() => handleItemClick(3)}
            >
              <a href="#cccc" style={{ textDecoration: "none", color: "#000" }}>
                เกี่ยวกับเรา
              </a>
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
        <h1 style={{ padding: "20px" }}>ข้อมูลโรคต้อ</h1>
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          // controlsStrategy="alternate"
        />
      </div>

      <div id="health" style={{ padding: "30px" }}>
        <h1 style={{ marginBottom: "30px" }}>ข้อมูลสุขภาพ</h1>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Card
            title="ข้อมูลการดูแลรักษาโรคต้อหิน"
            extra={<a href="https://bangpo-hospital.com/glaucoma/">View</a>}
            style={{ width: 600, height: 500, textAlign: "center" }}
          >
            <Image
              width={350}
              height={250}
              src="https://bangpo-hospital.com/wp-content/uploads/2022/09/%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%AB%E0%B8%B4%E0%B8%99-370x270-03.jpg"
            />
            <p>
              โรคต้อหินเป็นโรคของดวงตาชนิดหนึ่งซึ่งเกิดจากความเสื่อมของประสาทตา
              เป็นประสาทที่เชื่อมระหว่างตากับสมอง (Optic Nerve)
              หรือการที่เส้นประสาทตาถูกทำลาย{" "}
            </p>
            <p>
              สาเหตุมักเกิดจากความดันในลูกตาสูง
              ทำให้สูญเสียการมองเห็นเพิ่มขึ้นเรื่อยๆ โดยเริ่มจากบริเวณรอบนอกก่อน
              แต่ยังสามารถเห็นวัตถุที่วางอยู่ตรงหน้าได้ชัดเจน
              แต่จะมองไม่เห็นวัตถุที่อยู่ด้านข้าง{" "}
            </p>
            <p>
              เมื่อมีอาการมากขึ้น การมองเห็นก็จะค่อยๆแคบลงและตาบอดในที่สุด
              สามารถเกิดได้กับทุกเพศทุกวัย โดยเฉพาะผู้ที่มีอายุ 40 ปีขึ้นไป
            </p>
          </Card>
          <Card
            title="ข้อมูลการดูแลรักษาโรคต้อกระจก"
            extra={
              <a href="https://www.sikarin.com/doctor-articles/%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%97%E0%B8%B1%E0%B8%99-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%81-%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3-%E0%B8%AA%E0%B8%B2">
                View
              </a>
            }
            style={{ width: 600, height: 500, textAlign: "center" }}
          >
            <Image
              width={350}
              height={250}
              src="https://storage.yanhee.co.th/uploads/2022/01/Cataract-1200.jpg"
            />
            <p>
              “ต้อกระจก (Cataract)” เป็นภาวะที่เลนส์ภายในลูกตามีความขุ่นขาว
              จึงทำให้แสงที่จะผ่านเข้าไปในดวงตาไม่สามารถผ่านเข้าไปได้
              ทำให้เกิดอาการตามัว มองเห็นภาพเบลอ สีเพี้ยน
              และมองเห็นคล้ายมีหมอกมาบังตลอดเวลา
            </p>
          </Card>
        </div>
      </div>

      <h2 style={{ padding: "20px" }}>ผู้จัดทำ</h2>
      <div
        style={{
          width: "100%",
          height: "10vh",
          background: "#2699fb",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          color: "#ffff",
        }}
        id="cccc"
      >
        <div style={{ display: "flex", marginLeft: "10px" }}>
          <div>รายชื่อผู้จัดทำโครงการ</div>
          <div style={{ marginLeft: "5px" }}>
            1.นายอภิรักษ์ นามรักษ์ <br />
            2.นายบุณยวัทน์ บุญห่อ
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "5px" }}>สถานศึกษา</div>
          <div>
            มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ วิทยาเขตปราจีนบุรี
            <div>
              <div>
                <span style={{ marginRight: "5px" }}>ที่อยู่</span>
                <span>
                  129 หมู่ 21 ตำบลเนินหอม อำเภอเมือง จังหวัดปราจีนบุรี 25230.
                  โทร 0-3721-7300-9
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/th/thumb/b/be/Seal_of_KMUTNB.svg/1200px-Seal_of_KMUTNB.svg.png"
            width={50}
          />
        </div>
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
