

const calculateSuccessFailure = (exerciseData,runningData,challengeData,isExerciseChallenge,idx) => {
    let successCount = 0;
    let failureCount = 0;
     
    if (isExerciseChallenge) {
      // 운동 챌린지의 경우
      // 챌린지 기간 동안의 전체 일수 계산
    const exerciseStartDate = new Date(exerciseData[idx].start_date);
    const exerciseEndDate = new Date(exerciseData[idx].end_date);
    // 두 날짜의 차이를 밀리초로 계산
    const difference = exerciseEndDate - exerciseStartDate;
    const exerciseTotalDay = difference / (1000 * 60 * 60 * 24)+1;
    const today = new Date();
      successCount = exerciseData[idx].exerciseDays.filter(day => day.successStatus === 1).length;
      failureCount = exerciseTotalDay - successCount;
    } else {
      // 러닝 챌린지의 경우 (여기서는 단순화를 위해 successCount와 failureCount를 계산하는 로직이 필요합니다.)
      // 예를 들어, dailySuccess가 true인 날짜의 수를 성공 횟수로 가정할 수 있습니다.
      // 이 예시에서는 dailySuccess 배열이 없으므로, 대신 startDate와 endDate를 기반으로 계산합니다.
    const runningStartDate = new Date(runningData[idx].startDate);
    const runningEndDate = new Date(runningData[idx].endDate);
    // 두 날짜의 차이를 밀리초로 계산
    const difference = runningEndDate - runningStartDate;
    const runningTotalDay = difference / (1000 * 60 * 60 * 24)+1;
    const today = new Date();
    //successCount = runningData[idx].dailySuccess.filter(day => day.successStatus === 1).length;
    failureCount = runningTotalDay - successCount;
    }
  
    return { successCount, failureCount};
  };
  export default calculateSuccessFailure;
  