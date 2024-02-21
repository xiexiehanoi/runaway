import axios from "axios";
import React, { useEffect, useState } from "react";
import RankingRowItem from "./RankingRowItem";
import "../../CSS/Ranking.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Ranking = () => {
  const [rankingList, setRankingList] = useState([]);

  useEffect(() => {
    const RankList = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/ranking/list`);
            setRankingList(response.data);
        } catch (error) {
            console.error("Error fetching ranking list:", error);
        }
    };

    RankList();
}, []);

  return (
    
    <main id="challengemain">
    <div id="header">
              <h1 className="ranking">Ranking</h1>
    </div>  
      <div id="leaderboard">
      <div className="ribbon"></div>
        <table>             
            {rankingList.map((row, idx) => (
                <RankingRowItem key={idx} row={row} idx={idx}/>
            ))}
          
        </table>
        
      </div>
    </main>
    
  );
};
export default Ranking;
