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
    <main id="challengemain">
      <div class="header-inscreen">
        <span style={{ marginLeft: "8%" }}>Ranking</span>
      </div>  
      <span className='CommonContainer'>
        <div class="primaryCard"
              style={{ width: '85%', height: '72%', margin: " auto",marginTop:'15%',marginBottom:'15%' }}>
          <div className="leaderboard">
            <div className="headranking">
                <h1>Ranking</h1>
            </div>
            <div className="bodyranking">
                         
                {rankingList.map((row, idx) => (
                    <RankingRowItem key={idx} row={row} idx={idx}/>
                ))}
            
            </div>
          </div>  
        </div>
      </span>  
    </main>
  );
};

export default Ranking;
