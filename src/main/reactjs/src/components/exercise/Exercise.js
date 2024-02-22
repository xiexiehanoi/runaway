import React from "react";
import { Link } from "react-router-dom";
import codepen from "./codepen.css";

const exercise = () => {
  return (
    <div className="exercise-container">
      <div class="container">
        <div class="product1">
          <div class="effect-1"></div>
          <div class="effect-2"></div>
          <div class="content">
            <div class="exercise"></div>
          </div>
          <span class="title1">Squat</span>
        </div>
        <div class="product2">
          <div class="effect-1"></div>
          <div class="effect-2"></div>
          <div class="content">
            <div class="sleep"></div>
          </div>
          <span class="title2">Situp</span>
        </div>
        <div class="product3">
          <div class="effect-1"></div>
          <div class="effect-2"></div>
          <div class="content">
            <div class="meditation"></div>
          </div>
          <span class="title3">Push</span>
        </div>
      </div>

      {/* <p>
        <Link to={"/situp"}>situp</Link>
      </p>
      <p>
        <Link to={"/pushup"}>pushup</Link>
      </p> */}
    </div>
  );
};

export default exercise;
