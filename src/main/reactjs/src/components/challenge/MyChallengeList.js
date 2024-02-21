import React from 'react';

const MyChallengeList = ({row,idx}) => {
  const isExerciseChallenge = row.hasOwnProperty('exerciseChallengeDto');
  const challengeData = isExerciseChallenge ? row.exerciseChallengeDto : row.runningChallenge;

  const formatDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return 'N/A';
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  };

  const startDate = formatDate(row.start_date || row.startDate);
  const endDate = formatDate(row.end_date || row.endDate);

  return (
      <tr>
          <td>
              {isExerciseChallenge ? (
                  <>
                      <strong>{challengeData?.exercise_type}</strong><br />
                      <strong>목표 횟수: </strong> {challengeData?.target_count}회<br />
                      <strong>기간: </strong>{startDate}~{endDate}&nbsp;
                      ({challengeData?.target_date}일)
                  </>
              ) : (
                  <>
                      <strong>Running</strong><br />
                      <strong>거리: </strong> {challengeData?.distance}km<br />
                      <strong>기간: </strong> {startDate}~{endDate}&nbsp;
                      ({challengeData?.target_date}일)
                  </>
              )}
          </td>
      </tr>
  );
};
export default MyChallengeList;