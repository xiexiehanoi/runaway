
const calculateSuccessFailure = (row, exerciseData) => {
  const isExerciseChallenge = row.hasOwnProperty("exerciseChallengeDto");
  let successCount = 0;
  let failureCount = 0;
  let pendingCount = 0;

  if(isExerciseChallenge){
    successCount = row.exerciseDays.filter(day => day.successStatus === 2).length;
    failureCount = row.exerciseDays.filter(day => day.successStatus === 1).length;
    pendingCount = row.exerciseDays.filter(day => day.successStatus === 0).length;
  }else{
    successCount = row.runningDays.filter(day => day.successStatus === 2).length;
    failureCount = row.runningDays.filter(day => day.successStatus === 1).length;
    pendingCount = row.runningDays.filter(day => day.successStatus === 0).length;

  }
  return { ...exerciseData, successCount, failureCount, pendingCount };
};
  export default calculateSuccessFailure;
  