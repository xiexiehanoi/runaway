import React from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

//사용하는 이미지
import runawayimg from "../image/runaway.png";

import pushupImage from "../image/exercise.png";

import background from "../image/로고사진.png";
import pushupimg from "../image/KakaoTalk_20240304_145319261.png";

import homeimg2 from "../image/3조.png";

//사용하는 css
import "../CSS/Main.css";

//이동
import Slider from "react-slick";
import Swal from "sweetalert2";
import ScreenHeader from "../router/ScreenHeader";

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
          Swal.fire({
            icon: "warning",
            title: '추가 정보 입력이 \n 필요하여 추가 정보 입력 \n 페이지로 이동합니다.',
            confirmButtonText: "OK",
            allowOutsideClick: false,
            customClass: {
              confirmButton: 'sa2-confirm-button-class',
              title: 'sa2-title-class',
              icon: 'sa2-icon-class',
              popup: 'sa2-popup-class',
              container: 'sa2-container-class'
            },
          }).then(result => {
            navi("/signup-add");
          });
        }
      } catch (e) {
        console.error(e);
      }
    })();
  } else {
    console.log("Token not found.");
  }

  return (
    <div >
      <ScreenHeader title={"Runaway"} />
      <div className="startAnimation" style={{ marginTop: '24px' }}>
        <div className="home-exercise-item">
          <div
            className="home-exercise-content primaryCard"
            style={{ textAlign: "center" }}
          >
            <Link to={"/running"} style={{ textDecoration: "none" }}>
              <img
                src={runawayimg}
                alt="running"
                className="home-exercise-img"
              />
              <br />
              {/* <span style={{ color: "white" }}>Running</span> */}
            </Link>
          </div>

          <div
            className="home-exercise-content primaryCard"
            style={{ textAlign: "center" }}
          >
            <Link to={"/exercise"} style={{ textDecoration: "none" }}>
              <img
                src={pushupImage}
                alt="pushup"
                className="home-exercise-img"
                style={{ width: '33%' }}
              />
              <br />
              {/* <span style={{ color: "white" }}>Exercise</span> */}
            </Link>
          </div>
        </div>

        <Slider {...settings} className="home-slider-container">
          <div className="home-img-banner">
            <img src={background} className="home-img" alt="c11" />
          </div>
          <div className="home-img-banner">
            <img src={pushupimg} className="home-img" alt="22" />
          </div>

          <div>
            <img src={homeimg2} className="home-img" alt="44" />
          </div>
        </Slider>

        <Link to="/challengemain">
          <button
            className="btn primaryButton-outset home-challenge-btn"
          >
            <span>My Challenge</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
