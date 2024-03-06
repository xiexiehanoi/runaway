package com.runaway.project.profile.service;


import com.runaway.project.exercise.entity.ExerciseEntity;
import com.runaway.project.exercise.respository.ExerciseRepository;
import com.runaway.project.running.entity.RunningEntity;
import com.runaway.project.running.repository.RunningRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final RunningRepository runningRepository;
    private final ExerciseRepository exerciseRepository;

    public List<RunningEntity> findByUserId(Long userId) {
        return runningRepository.findByUserId(userId);


    }

    public RunningEntity getRunningEntity(Long runIdx) {
        Optional<RunningEntity> optionalRunningEntity = runningRepository.findById(runIdx);
        if (optionalRunningEntity.isPresent()) {
            return optionalRunningEntity.get();
        } else {
            throw new EntityNotFoundException("User not found for id: " + runIdx);
        }

    }

    public List<Map<String, Object>> getMonthlyExerciseData(Long userId) {


        List<RunningEntity> runningRecords = runningRepository.findByUserCurrentMonth(userId);
        List<ExerciseEntity> exerciseRecords = exerciseRepository.findByUserCurrentMonth(userId);

        double totalDistance = 0;
        int totalSeconds = 0;
        int totalCalorie = 0;
        int totalCount = runningRecords.size(); // 러닝 기록의 수
        for (RunningEntity record : runningRecords) {
            totalDistance += record.getDistance();
            totalCalorie += record.getCalorie();
            // 러닝 시간 문자열을 분과 초로 분리
            String[] parts = record.getRunningTime().split(":");
            int minutes = Integer.parseInt(parts[0]);
            int seconds = Integer.parseInt(parts[1]);

            // 분과 초를 초로 변환하여 총 시간에 더함
            totalSeconds += (minutes * 60) + seconds;

        }

        BigDecimal bd = new BigDecimal(totalDistance);
        bd = bd.setScale(3, RoundingMode.HALF_UP); // 소수점 세 자리까지 반올림
        totalDistance = bd.doubleValue();

        Map<String, Object> runningData = new HashMap<>();

        // 평균 페이스 계산
        if (totalDistance > 0) { // 거리가 0보다 클 때만 계산
            int averagePaceSecondsPerKm = (int) (totalSeconds / totalDistance);
            int averagePaceMinutes = averagePaceSecondsPerKm / 60;
            int averagePaceSeconds = averagePaceSecondsPerKm % 60;

            // 평균 페이스를 '00'00" 형식으로 포매팅
            String averagePace = String.format("%02d'%02d\"", averagePaceMinutes, averagePaceSeconds); // 큰따옴표를 문자열의 끝에 추가
            runningData.put("averagePace", averagePace);
        } else {
            runningData.put("averagePace", "00'00\""); // 데이터가 없을 경우, 큰따옴표를 직접 추가
        }

        runningData.put("totalDistance", totalDistance);
        runningData.put("totalSeconds",totalSeconds);
        runningData.put("totalCalorie",totalCalorie);
        runningData.put("totalCount", totalCount);

        // 각 운동 타입에 대한 데이터를 저장할 변수들
        int totalSquatCount = 0;
        int totalSitUpCount = 0;
        int totalPushUpCount = 0;
        double totalSquatCalorie = 0.0;
        double totalSitUpCalorie = 0.0;
        double totalPushUpCalorie = 0.0;
        int squatDays=0;
        int situpDays=0;
        int pushupDays=0;
        // 여기에 다른 운동 데이터에 대한 계산 로직 추가
        for (ExerciseEntity record : exerciseRecords) {
            // 각 운동 타입에 따라 분리하여 데이터 계산
            switch (record.getExerciseType()) {
                case "squat":
                    totalSquatCount += record.getExerciseCount();
                    totalSquatCalorie += record.getCalorie();
                    squatDays +=1;
                    break;
                case "situp":
                    totalSitUpCount += record.getExerciseCount();
                    totalSitUpCalorie += record.getCalorie();
                    situpDays +=1;
                    break;
                case "pushup":
                    totalPushUpCount += record.getExerciseCount();
                    totalPushUpCalorie += record.getCalorie();
                    pushupDays +=1;
                    break;
                default:
                    // 다른 운동 타입에 대한 처리가 필요한 경우 여기에 추가
                    break;
            }
        }

        BigDecimal squatbd = new BigDecimal(totalSquatCalorie);
        squatbd = squatbd.setScale(1, RoundingMode.HALF_UP);
        totalSquatCalorie = squatbd.doubleValue();

        BigDecimal situpbd = new BigDecimal(totalSitUpCalorie);
        situpbd = situpbd.setScale(1, RoundingMode.HALF_UP);
        totalSitUpCalorie = situpbd.doubleValue();

        BigDecimal pushupbd = new BigDecimal(totalPushUpCalorie);
        pushupbd = pushupbd.setScale(1, RoundingMode.HALF_UP);
        totalPushUpCalorie = pushupbd.doubleValue();

        Map<String, Object> squatData = new HashMap<>();
        Map<String, Object> situpData = new HashMap<>();
        Map<String, Object> pushupData = new HashMap<>();

        squatData.put("totalSquatCount", totalSquatCount);
        squatData.put("totalSquatCalorie", totalSquatCalorie);
        squatData.put("squatDays", squatDays);
        situpData.put("totalSitUpCount", totalSitUpCount);
        situpData.put("totalSitUpCalorie", totalSitUpCalorie);
        situpData.put("situpDays", situpDays);
        pushupData.put("totalPushUpCount", totalPushUpCount);
        pushupData.put("totalPushUpCalorie", totalPushUpCalorie);
        pushupData.put("pushupDays", pushupDays);


        List<Map<String, Object>> combinedChallenges = new ArrayList<>();
        combinedChallenges.add(runningData);
        combinedChallenges.add(squatData);
        combinedChallenges.add(situpData);
        combinedChallenges.add(pushupData);


        return combinedChallenges;
    }

    public Map<String, Object> getStartDate(Long userid) {
        LocalDate runningStartDate = runningRepository.findStartDateByUserId(userid);
        LocalDate squatStartDate = exerciseRepository.findStartDateByUserIdAndType(userid, "squat");
        LocalDate situpStartDate = exerciseRepository.findStartDateByUserIdAndType(userid, "situp");
        LocalDate pushupStartDate = exerciseRepository.findStartDateByUserIdAndType(userid, "pushup");


        // runningStartDate가 null인 경우 현재 날짜 할당
        if (runningStartDate == null) {
            runningStartDate = LocalDate.now();
        }

        // squatStartDate가 null인 경우 현재 날짜 할당
        if (squatStartDate == null) {
            squatStartDate = LocalDate.now();
        }

        // situpStartDate가 null인 경우 현재 날짜 할당
        if (situpStartDate == null) {
            situpStartDate = LocalDate.now();
        }

        // pushupStartDate가 null인 경우 현재 날짜 할당
        if (pushupStartDate == null) {
            pushupStartDate = LocalDate.now();
        }


        Map<String, Object> result = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        data.put("runningStartDate", runningStartDate);
        data.put("squatStartDate", squatStartDate);
        data.put("situpStartDate", situpStartDate);
        data.put("pushupStartDate", pushupStartDate);

        return  data;

    }



    public List<RunningEntity> getRunningRecords(Long userId, String period, String detail) {
        switch (period) {
            case "weekly":
                return getWeeklyRunningRecords(userId, detail);
            case "monthly":
                return getMonthlyRunningRecords(userId, detail);
            case "yearly":
                return getYearlyRunningRecords(userId, detail);
            default:
                // 처리할 수 없는 period 값이 주어진 경우 빈 리스트 반환
                return runningRepository.findByUserId(userId);
        }
    }

    private List<RunningEntity> getWeeklyRunningRecords(Long userId, String startDateStr) {
        LocalDate startDate = LocalDate.parse(startDateStr, DateTimeFormatter.ISO_DATE);

        return runningRepository.findByUserIdAndDateBetween(
                userId,
                startDate,
                startDate.plusWeeks(1).minusDays(1));
    }

    private List<RunningEntity> getMonthlyRunningRecords(Long userId, String yearMonthStr) {
        YearMonth yearMonth = YearMonth.parse(yearMonthStr, DateTimeFormatter.ofPattern("yyyy-MM"));
        LocalDate startOfMonth = yearMonth.atDay(1);
        LocalDate endOfMonth = yearMonth.atEndOfMonth();
        return runningRepository.findByUserIdAndDateBetween(userId, startOfMonth, endOfMonth);
    }

    private List<RunningEntity> getYearlyRunningRecords(Long userId, String yearStr) {
        int year = Integer.parseInt(yearStr);
        LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate endOfYear = LocalDate.of(year, 12, 31);
        return runningRepository.findByUserIdAndDateBetween(userId, startOfYear, endOfYear);
    }

    public List<ExerciseEntity> getExerciseRecords(Long userId, String period, String detail, String exerciseType) {
        switch (period) {
            case "weekly":
                return getWeeklyRecords(userId, detail, exerciseType);
            case "monthly":
                return getMonthlyRecords(userId, detail, exerciseType);
            case "yearly":
                return getYearlyRecords(userId, detail, exerciseType);
            default:
                // 처리할 수 없는 period 값이 주어진 경우 빈 리스트 반환
                return exerciseRepository.findByUserId(userId, exerciseType);
        }
    }

    private List<ExerciseEntity> getWeeklyRecords(Long userId, String startDateStr, String exerciseType) {
        LocalDate startDate = LocalDate.parse(startDateStr, DateTimeFormatter.ISO_DATE);

        return exerciseRepository.findByUserIdAndDateBetween(
                userId,
                startDate,
                startDate.plusWeeks(1).minusDays(1),
                exerciseType);
    }

    private List<ExerciseEntity> getMonthlyRecords(Long userId, String yearMonthStr, String exerciseType) {
        YearMonth yearMonth = YearMonth.parse(yearMonthStr, DateTimeFormatter.ofPattern("yyyy-MM"));
        LocalDate startOfMonth = yearMonth.atDay(1);
        LocalDate endOfMonth = yearMonth.atEndOfMonth();
        return exerciseRepository.findByUserIdAndDateBetween(userId, startOfMonth, endOfMonth ,exerciseType);
    }

    private List<ExerciseEntity> getYearlyRecords(Long userId, String yearStr, String exerciseType) {
        int year = Integer.parseInt(yearStr);
        LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate endOfYear = LocalDate.of(year, 12, 31);
        return exerciseRepository.findByUserIdAndDateBetween(userId, startOfYear, endOfYear, exerciseType);
    }
}

