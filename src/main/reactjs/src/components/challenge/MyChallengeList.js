import React from 'react';

const MyChallengeList = ({row,idx}) => {
    const isExerciseChallenge = row.hasOwnProperty('exerciseChallengeDto');
    const challengeData = isExerciseChallenge
      ? row.exerciseChallengeDto
      : row.runningChallenge;
    return (
        <tr>
      <td>
         {idx+1}
      </td>
      <td>
        {isExerciseChallenge
          ? `운동 종류: ${challengeData?.exercise_type}`
          : `거리: ${challengeData?.distance}km`}
      </td>
      <td>
        {isExerciseChallenge
          ? `목표: ${challengeData?.target_count}회, ${challengeData?.target_date}일`
          : `목표: ${challengeData?.target_date}일`}
      </td>
    </tr>
    );
};

export default MyChallengeList;