import axios from "axios";
import React, { useEffect, useState } from "react";

const Ranking = () => {
    const [users, setUsers] = useState([]);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchRanking = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/ranking/list`)
      .then(response => response.data);
      console.log("data: "+data)
      setUsers(data);
    };
    fetchRanking();
  }, [BACKEND_URL]);

  return (
    <div id="leaderboard">
      <table>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td className="number">{index + 1}</td>
            <td className="name">{user.userNickname}</td>
            <td className="points">{user.userPoints}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default Ranking;