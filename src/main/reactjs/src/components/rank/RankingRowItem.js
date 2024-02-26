import React from 'react';

const RankingRowItem = (props) => {
    const {row, idx} = props;

    return (
        <li key={row.id} >
        
            <mark>{idx + 1 === 1 ? (
            <img className="gold-medal" src="https://d125fmws0bore1.cloudfront.net/assets/pages/leaderboard/medal-gold-c49052bfa07f36621f16dbe77f7fc36cbafd72ff088ea970256ff998be05687b.svg" alt="gold medal"
            style={{ width: '20%', height: 'auto' }}/>
        ) : 
         idx + 1 ===2 ? (
            <img className="silver-medal" src="https://d125fmws0bore1.cloudfront.net/assets/pages/leaderboard/medal-silver-d099c5dd916c167c3ba4716c8968a819f317daaef1901c8e8bae6c6932852faa.svg" alt="silver medal"
            style={{ width: '20%', height: 'auto' }}/>
         ) :
         idx + 1 ===3 ? (
            <img className="bronze-medal" src="https://d125fmws0bore1.cloudfront.net/assets/pages/leaderboard/medal-bronze-d0f15d413800257442c8d4b2d5239cfe28c9fd9594f863ab1fad5258f8d1d5eb.svg" alt="bronze medal"
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
