import axios from "axios";
import React, { useEffect, useState } from "react";
import RankingRowItem from "./RankingRowItem";
import "../../CSS/Ranking.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Ranking = () => {
  const [rankingList, setRankingList] = useState([]);

  useEffect(() => {
    const fetchRankingList = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/ranking/list`);
            setRankingList(response.data);
        } catch (error) {
            console.error("Error fetching ranking list:", error);
        }
    };

    fetchRankingList();
}, []);

  return (
    <div id="challenge-main">
      <div className="header-in-screen">
        <span style={{ marginLeft: "8%" }}>Ranking</span>
      </div>
      <div className='CommonContainer'>
        <div className="primaryCard"
              style={{ width: '85%', height: '72%', margin: "8% auto" }}>
          <div className="leader-board">
            <div className="head-ranking" style={{marginBottom:"16px"}}>
                <h1>Ranking</h1>
            </div>
            <div className="body-ranking">
                <div>
                  {rankingList.map((row, idx) => (
                      <RankingRowItem key={idx} row={row} idx={idx}/>
                  ))}
                </div>        
            
            </div>
          </div>  
        </div>
      </div>  
    </div>
  );
};

export default Ranking;
