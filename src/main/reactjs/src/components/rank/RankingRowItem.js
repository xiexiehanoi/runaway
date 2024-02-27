import React from 'react';
import goldMedal from "../../image/1st 1.png";
import silverMedal from "../../image/2nd 1.png";
import bronzeMedal from "../../image/3rd 1.png";
import upArrow from "../../image/up-arrow.png";
import downArrow from "../../image/down-arrow.png";

const RankingRowItem = (props) => {
    const {row, idx} = props;

    console.log("row:"+row.rankChange)
    return (
        <li key={row.id} className='ranking-list-body'>
            <mark>
                {idx + 1 === 1 ? (
                    <img className="gold-medal" src={goldMedal} alt="gold medal" style={{ width: '20%', height: 'auto' }} />
                ) : idx + 1 === 2 ? (
                    <img className="silver-medal" src={silverMedal} alt="silver medal" style={{ width: '20%', height: 'auto' }} />
                ) : idx + 1 === 3 ? (
                    <img className="bronze-medal" src={bronzeMedal} alt="bronze medal" style={{ width: '20%', height: 'auto' }} />
                ) : (
                            idx + 1
                        )} {row.nickname} ({row.point} 점)
            </mark>
            <div>
                 {row.rankChange !== 0 ? (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {row.rankChange > 0 ? (
                            <img src={downArrow} alt="up arrow" style={{ width: '20px', height: 'auto' }} />
                        ) : (
                                    <img src={upArrow} alt="down arrow" style={{ width: '20px', height: 'auto' }} />
                                )}
                        <span>{Math.abs(row.rankChange)}</span>
                    </div>
                ) : (
                            "-"
                        )}
            </div>
        </li>
    );
};

export default RankingRowItem;
