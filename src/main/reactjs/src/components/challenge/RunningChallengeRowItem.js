import React from 'react';

const RunningChallengeRowItem = (props) => {
    const {row,idx}=props;

    return (
        <tr>
            <td>
                <h5>번호:{idx}</h5>
                <h5>챌린지명:{row.name}</h5>
                <h5>목표거리:{row.distance}km</h5>
                <h5>기한:{row.end}일</h5>
            </td>
        
        
        </tr>
    );
};

export default RunningChallengeRowItem;