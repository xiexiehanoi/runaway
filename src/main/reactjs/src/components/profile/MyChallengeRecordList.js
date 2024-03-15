import React, { useEffect, useState } from "react";
import "./css/MyChallenge.css";
import axios from "axios";
import MyChallengeRecordItem from "./MyChallengeRecordItem.js";
import ScreenHeader from "../../router/ScreenHeader";

const MyChallengeRecordList = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [myChallengeList, setMyChallengeList] = useState([]);


  useEffect(() => {
    const fetchMyChallengeList = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (!token) {
          console.log("Token not found.");
          return;
        }
        const response = await axios.get(
          `${BACKEND_URL}/api/challenge/challengemain/mychallengerecordlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
            },
          }
        );
        setMyChallengeList(response.data);
      } catch (error) {
        console.error("Error fetching exercise list:", error);
      }
    };
    fetchMyChallengeList();
  }, []);

  
  
    

  return (
    <div>
      <div style={{marginBottom:'30px'}}><ScreenHeader title={"Challenge"} /></div>
      <div style={{ display: "flex" ,marginLeft:'160px'}}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "5px", marginRight:'5px'}}>
                        <div style={{ width: "8px", height: "8px", backgroundColor: "rgba(75, 192, 192, 0.6)", marginRight: "5px" }}></div>
                        <span style={{fontSize:'10px'}}>Success</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "5px", marginRight:'5px' }}>
                        <div style={{ width: "8px", height: "8px", backgroundColor: "rgba(255, 99, 132, 0.6)", marginRight: "5px" }}></div>
                        <span style={{fontSize:'10px'}}>Failure</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                        <div style={{ width: "8px", height: "8px", backgroundColor: "rgba(166, 166, 166, 0.6)", marginRight: "5px" }}></div>
                        <span style={{fontSize:'10px'}}>Pending</span>
                    </div>
                </div>
          {myChallengeList.map((rowData, idx) => (
            <MyChallengeRecordItem key={idx} row={rowData} idx={idx} />
          ))}
        </div>
  );
};
export default MyChallengeRecordList;
