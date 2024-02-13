import axios from "axios";
import React, { useEffect, useState } from "react";
import RankingRowItem from "./RankingRowItem";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Ranking = () => {
  const [rankingList, setRankingList] = useState([]);

  useEffect(() => {
    const RankList = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/ranking/list`);
            setRankingList(response.data);
        } catch (error) {
            console.error("Error fetching ranking list:", error);
        }
    };

    RankList();
}, []);

  return (
    <div id="leaderboard">
      <table className="table table-bordered">
        <tbody>
            <td>순위</td>
            <td>닉네임</td>
            <td>포인트</td>
          {rankingList.map((row, idx) => (
              <RankingRowItem key={idx} row={row} idx={idx}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Ranking;