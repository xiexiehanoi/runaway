import React, { useState, useEffect, useRef } from "react";
import "../CSS/MainLayout.css";
import "../CSS/MainTabBar.css";
import runawayQR from "../image/runawayQR.png";
import { Link } from "react-router-dom";

const MainLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]);
  const [indicatorOffset, setIndicatorOffset] = useState(0);

  const tabs = [
    {
      title: "Home",
      icon: "dashboardIcon",
      filledIcon: "dashboardIconFilled",
      route:"/running"
    },
    {
      title: "Story",
      icon: "cameraIcon",
      filledIcon: "cameraIconFilled",
    },
    {
      title: "Rank",
      icon: "filesIcon",
      filledIcon: "filesIconFilled",
      route:"/login"
    },
    {
      title: "Profile",
      icon: "userIcon",
      filledIcon: "userIconFilled",
      route: "/my"
    },
  ];

  //반응형을 위해 offset 값을 초기화해주는 작업
  useEffect(() => {
    const updateOffset = () => {
      if (tabRefs.current[activeTab]) {
        const tab = tabRefs.current[activeTab];
        const offset = tab.offsetLeft + tab.offsetWidth / 2;
        setIndicatorOffset(offset);
      }
    };

    window.addEventListener("resize", updateOffset);

    updateOffset();

    return () => window.removeEventListener("resize", updateOffset);
  }, [activeTab]);

  return (
    <>
      <div className="main-container">
        <div id="phone-container">
          <div id="Iphone">
            <div id="Iphone-header">
              <div className="operator-name">18:22</div>
              <div className="operator-5g">5G</div>
              <div className="battery">100</div>
            </div>
          </div>

          <div id="screen">{children}</div>

          <nav className="tabbar">
            <ul>
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  ref={(el) => (tabRefs.current[index] = el)}
                  className={index === activeTab ? "active" : ""}
                  onClick={() => setActiveTab(index)}
                >
                  <Link to={tab.route}>
                    <div>
                      <span>
                        <svg>
                          <use xlinkHref={`#${tab.icon}`} />
                        </svg>
                      </span>
                      <span>
                        <svg>
                          <use xlinkHref={`#${tab.filledIcon}`} />
                        </svg>
                      </span>
                    </div>
                    <strong>{tab.title}</strong>
                  </Link>
                </li>
              ))}
            </ul>
            <em style={{ "--offset": `${indicatorOffset}px` }} />
          </nav>

          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="dashboardIcon"
            >
              <g strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2">
                <path
                  fill="none"
                  strokeMiterlimit="10"
                  d="M6.3,10C6.1,10.6,6,11.3,6,12"
                  strokeLinecap="butt"
                ></path>
                <path
                  fill="none"
                  strokeMiterlimit="10"
                  d="M18,12c0-3.3-2.7-6-6-6 c-0.7,0-1.4,0.1-2,0.3"
                  strokeLinecap="butt"
                ></path>
                <line
                  fill="none"
                  strokeMiterlimit="10"
                  x1="10.6"
                  y1="10.6"
                  x2="7"
                  y2="7"
                ></line>
                <circle
                  fill="none"
                  strokeMiterlimit="10"
                  cx="12"
                  cy="12"
                  r="2"
                ></circle>
                <circle
                  fill="none"
                  strokeMiterlimit="10"
                  cx="12"
                  cy="12"
                  r="11"
                ></circle>
              </g>
            </symbol>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="dashboardIconFilled"
            >
              <path
                stroke="none"
                d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M5,12c0,0.552-0.447,1-1,1 s-1-0.448-1-1c0-1.387,0.325-2.696,0.887-3.871l1.526,1.526C5.15,10.389,5,11.177,5,12z M12,15c-1.654,0-3-1.346-3-3 c0-0.462,0.113-0.894,0.3-1.285L5.086,6.5L6.5,5.086l4.214,4.215C11.106,9.114,11.538,9,12,9c1.654,0,3,1.346,3,3S13.654,15,12,15z M20,13c-0.553,0-1-0.448-1-1c0-3.86-3.141-7-7-7c-0.823,0-1.61,0.15-2.345,0.413L8.13,3.887C9.304,3.324,10.613,3,12,3 c4.963,0,9,4.038,9,9C21,12.552,20.553,13,20,13z"
              ></path>
            </symbol>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="cameraIcon"
            >
              <g strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2">
                <rect
                  x="1"
                  y="5"
                  transform="matrix(-1 -4.489621e-11 4.489621e-11 -1 24 27)"
                  fill="none"
                  strokeMiterlimit="10"
                  width="22"
                  height="17"
                ></rect>
                <line
                  fill="none"
                  strokeMiterlimit="10"
                  x1="4"
                  y1="2"
                  x2="8"
                  y2="2"
                ></line>
                <circle
                  fill="none"
                  strokeMiterlimit="10"
                  cx="15"
                  cy="14"
                  r="4"
                ></circle>
                <circle
                  cx="6"
                  cy="10"
                  r="1"
                  strokeLinejoin="miter"
                  strokeLinecap="square"
                  stroke="none"
                ></circle>
              </g>
            </symbol>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="cameraIconFilled"
            >
              <g stroke="none">
                <rect x="3" y="1" width="6" height="2"></rect>
                <path d="M23,4H1C0.447,4,0,4.448,0,5v17c0,0.552,0.447,1,1,1h22c0.553,0,1-0.448,1-1V5C24,4.448,23.553,4,23,4z M6,11c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C7,10.552,6.552,11,6,11z M15,19c-2.761,0-5-2.239-5-5s2.239-5,5-5 s5,2.239,5,5S17.761,19,15,19z"></path>
              </g>
            </symbol>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="filesIcon"
            >
              <g
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth="2"
                transform="translate(1,0)"
              >
                <line
                  x1="7"
                  y1="7"
                  x2="8"
                  y2="7"
                  fill="none"
                  strokeMiterlimit="10"
                ></line>
                <line
                  x1="12"
                  y1="7"
                  x2="17"
                  y2="7"
                  fill="none"
                  strokeMiterlimit="10"
                ></line>
                <line
                  x1="7"
                  y1="12"
                  x2="8"
                  y2="12"
                  fill="none"
                  strokeMiterlimit="10"
                ></line>
                <line
                  x1="12"
                  y1="12"
                  x2="17"
                  y2="12"
                  fill="none"
                  strokeMiterlimit="10"
                ></line>
                <line
                  x1="7"
                  y1="17"
                  x2="12"
                  y2="17"
                  fill="none"
                  strokeMiterlimit="10"
                ></line>
                <polygon
                  points="16 23 16 17 22 17 16 23"
                  stroke="none"
                  strokeLinecap="butt"
                ></polygon>
                <polyline
                  points="16 23 16 17 22 17"
                  fill="none"
                  strokeMiterlimit="10"
                  strokeLinecap="butt"
                ></polyline>
                <polygon
                  points="16 23 2 23 2 1 22 1 22 17 16 23"
                  fill="none"
                  strokeMiterlimit="10"
                ></polygon>
              </g>
            </symbol>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="filesIconFilled"
            >
              <g transform="translate(1,0)">
                <polygon
                  points="22.414 18 17 18 17 23.414 22.414 18"
                  stroke="none"
                ></polygon>
                <path
                  d="M22,0H2A1,1,0,0,0,1,1V23a1,1,0,0,0,1,1H15V17a1,1,0,0,1,1-1h7V1A1,1,0,0,0,22,0ZM6,6H9V8H6Zm0,5H9v2H6Zm5,7H6V16h5Zm7-5H11V11h7Zm0-5H11V6h7Z"
                  stroke="none"
                ></path>
              </g>
            </symbol>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="userIcon"
            >
              <g strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2">
                <path
                  fill="none"
                  strokeMiterlimit="10"
                  d="M12,12L12,12 c-2.761,0-5-2.239-5-5V6c0-2.761,2.239-5,5-5h0c2.761,0,5,2.239,5,5v1C17,9.761,14.761,12,12,12z"
                ></path>
                <path
                  fill="none"
                  strokeMiterlimit="10"
                  d="M22,20.908 c0-1.8-1.197-3.383-2.934-3.856C17.172,16.535,14.586,16,12,16s-5.172,0.535-7.066,1.052C3.197,17.525,2,19.108,2,20.908V23h20 V20.908z"
                ></path>
              </g>
            </symbol>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="userIconFilled"
            >
              <g stroke="none">
                <path d="M12,13c3.309,0,6-2.691,6-6V6c0-3.309-2.691-6-6-6S6,2.691,6,6v1C6,10.309,8.691,13,12,13z"></path>
                <path d="M19.322,15.981c-4.704-1.303-9.939-1.303-14.644,0C2.513,16.581,1,18.564,1,20.805V24h22 v-3.195C23,18.564,21.487,16.581,19.322,15.981z"></path>
              </g>
            </symbol>
          </svg>
        </div>

        <div id="text">
          <div id="pullmenu-icon"></div>
          <h1>
            Health
            <br />
            Care
          </h1>
          <h2>Runaway</h2>
          <h3>* Enjoy RunAway App!</h3>
          <h3>** Mobile demo By BitCamp</h3>
          <img src={runawayQR} className="QRcode" alt="Runaway QR Code" />
        </div>
      </div>
    </>
  );
};

export default MainLayout;