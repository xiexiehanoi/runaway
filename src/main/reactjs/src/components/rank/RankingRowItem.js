import React from 'react';
import goldmedal from "../../image/1st 1.png";
import silvermedal from "../../image/2nd 1.png";
import bronzemedal from "../../image/3rd 1.png";

const RankingRowItem = (props) => {
    const {row, idx} = props;

    return (
        <li key={row.id} >
        
            <mark>{idx + 1 === 1 ? (
            <img className="gold-medal" src={goldmedal} alt="gold medal"
            style={{ width: '20%', height: 'auto' }}/>
        ) : 
         idx + 1 ===2 ? (
            <img className="silver-medal" src={silvermedal} alt="silver medal"
            style={{ width: '20%', height: 'auto' }}/>
         ) :
         idx + 1 ===3 ? (
            <img className="bronze-medal" src={bronzemedal} alt="bronze medal"
            style={{ width: '20%', height: 'auto' }}/>
         ) :
        
        (
            idx + 1
        )} {row.nickname}</mark>            
            <small>{row.point}</small>
        </li>
    );
};

export default RankingRowItem;
