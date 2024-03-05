import React from 'react';
import goldMedal from "../../image/1st 1.png";
import silverMedal from "../../image/2nd 1.png";
import bronzeMedal from "../../image/3rd 1.png";
import upArrow from "../../image/up-arrow.png";
import downArrow from "../../image/down-arrow.png";

const RankingRowItem = (props) => {
    const {row, idx} = props;
    console.log(row);

    console.log("row:"+row.rankChange)
    return (
        <li key={row.id} className='ranking-list-body' style={{ position: 'relative' }}>
        {/* Position medal image at top left corner */}
        {idx + 1 === 1 && (
            <img
                className="medal"
                src={goldMedal}
                alt="gold medal"
                style={{ width: '12%', height: 'auto', position: 'absolute', top: -10, left: -15 }}
            />
        )}
        {idx + 1 === 2 && (
            <img
                className="medal"
                src={silverMedal}
                alt="silver medal"
                style={{ width: '12%', height: 'auto', position: 'absolute', top: -10, left: -15 }}
            />
        )}
        {idx + 1 === 3 && (
            <img
                className="medal"
                src={bronzeMedal}
                alt="bronze medal"
                style={{ width: '12%', height: 'auto', position: 'absolute', top: -10, left: -15 }}
            />
        )}
        <mark>
            {idx + 1}위 {row.nickname} ({row.point} 점)
        </mark>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
    {row.rankChange !== 0 ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {row.rankChange > 0 ? (
                <img src={downArrow} alt="down arrow" style={{ width: '20px', height: 'auto' }} />
            ) : (
                <img src={upArrow} alt="up arrow" style={{ width: '20px', height: 'auto' }} />
            )}
              <span style={{color: "white"}}>{Math.abs(row.rankChange)}</span>
        </div>
    ) : (
        <span>-</span>
    )}
</div>

        </li>

    );
  };

export default RankingRowItem;
