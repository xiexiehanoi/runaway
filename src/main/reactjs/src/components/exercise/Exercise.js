import React from "react";
import { Link } from "react-router-dom";
import codepen from "./codepen.css";

const exercise = () => {
  return (
    <div>
      <h1 className="exercise-H1">Choose Your Exercise</h1>
      <div class="container">
        <div class="product">
          <div class="effect-1"></div>
          <div class="effect-2"></div>
          <div class="content">
            <div class="exercise"></div>
          </div>
          <span class="title">
            Squat
          </span>
        </div>
        <div class="product">
          <div class="effect-1"></div>
          <div class="effect-2"></div>
          <div class="content">
            <div class="sleep"></div>
          </div>
          <span class="title">
            Situp
          </span>
        </div>
        <div class="product">
          <div class="effect-1"></div>
          <div class="effect-2"></div>
          <div class="content">
            <div class="meditation"></div>
          </div>
          <span class="title">
            Pushup
          </span>
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
