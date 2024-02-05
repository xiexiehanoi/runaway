import React from 'react';

const ExerciseChallengeRowItem = (props) => {
    const {row,idx}=props;

    return (
        <tr>
            <td>
                <h5>번호:{idx}</h5>
                <h5>챌린지명:{row.name}</h5>
                <h5>목표횟수:{row.count}</h5>
                <h5>기한:{row.end}</h5>
            </td>
        
        
        </tr>
    );
};

export default ExerciseChallengeRowItem;