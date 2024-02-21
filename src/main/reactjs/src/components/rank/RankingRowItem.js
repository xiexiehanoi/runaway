import React from 'react';

const RankingRowItem = (props) => {
    const {row, idx} = props;

    return (
        <tr key={row.id}>
             <td className="number">
        {idx + 1 === 1 ? (
            <img className="gold-medal" src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true" alt="gold medal"/>
        ) : (
            idx + 1
        )}
            </td>
            <td className="name">{row.nickname}</td>
            <td className="points">{row.point}</td>
        </tr>
    );
};

export default RankingRowItem;