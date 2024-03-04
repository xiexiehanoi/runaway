import React from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

//사용하는 이미지
import runawayimg from "../image/running.png";

import pushupImage from "../image/push-up.png";

import background from "../image/로고사진.png";
import pushupimg from "../image/KakaoTalk_20240304_145319261.png";
import homeimg1 from "../image/homeimg1.jpg";
import homeimg2 from "../image/3조.png";

//사용하는 css
import "../CSS/Main.css";

//이동
import Slider from "react-slick";

var settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "40px",
  speed: 500,
  slidesToShow: 1,
  arrow: false
};

const Home = () => {
  var token = window.localStorage.getItem("token");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navi = useNavigate();

  if (token) {
    console.log("Token found:", token);
    (async () => {
      try {
        const request = {
          method: "GET",
          url: `${BACKEND_URL}/api/login/me`,
          headers: {
            Authorization: token,
          },
        };
        const res = await axios(request);
        if (
          res.data.height === null ||
          res.data.height === 0 ||
          res.data.weight === null ||
          res.data.weight === 0
        ) {
          alert(
            "추가 정보 입력이 필요하여 추가 정보 입력 페이지로 이동합니다."
          );
          navi("/signup-add");
        }
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    })();
  } else {
    console.log("Token not found.");
  }

  return (
    <div >
      <div className="header-inscreen">
        <span style={{ fontFamily: "Anton", marginLeft: "8%" }}>Runaway</span>
      </div>

      <div className="startAnimation" style={{marginTop:'15%'}}>
        <div className="home-exercise-item">
          <div
            className="home-exercise-content primaryCard"
            style={{ textAlign: "center" }}
          >
            <Link to={"/running"} style={{textDecoration:"none"}}>
              <img
                src={runawayimg}
                alt="running"
                className="home-exercise-img"
              />
              <br />
              <span style={{ color: "white" }}>Running</span>
            </Link>
          </div>

          <div
            className="home-exercise-content primaryCard"
            style={{ textAlign: "center" }}
          >
            <Link to={"/exercise"} style={{textDecoration:"none"}}>
              <img
                src={pushupImage}
                alt="pushup"
                className="home-exercise-img"
              />
              <br />
              <span style={{ color: "white" }}>Exercise</span>
            </Link>
          </div>
        </div>

        <Slider {...settings} style={{ marginTop: "15%" }}>
          <div>
            <img src={background} className="home-img" alt="c11" />
          </div>
          <div>
            <img src={pushupimg} className="home-img" alt="22" />
          </div>
          <div>
            <img src={homeimg1} className="home-img" alt="33" />
          </div>
          <div>
            <img src={homeimg2} className="home-img" alt="44" />
          </div>
        </Slider>

        <Link to="/challengemain">
          <button
            className="btn primaryButton-outset"
            style={{
              width: "90%",
              height: "50px",
              marginTop: "10%",
              marginLeft: "5%",
              marginRight: "5%",
            }}
          >
            <span style={{ color: "white" }}>My Challenge</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
