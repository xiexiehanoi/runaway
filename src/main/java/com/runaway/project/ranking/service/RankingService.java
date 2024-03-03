package com.runaway.project.ranking.service;

import com.runaway.project.ranking.dto.RankingDto;
import com.runaway.project.ranking.entity.Rank;
import com.runaway.project.ranking.repository.RankRepository;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RankingService {
    private final UserRepository userRepository;
    private final RankRepository rankRepository;

    @Autowired
    public RankingService(UserRepository userRepository, RankRepository rankRepository) {
        this.userRepository = userRepository;
        this.rankRepository = rankRepository;
    }


    @Scheduled(cron = "0 0 6 * * *")
    @Transactional
    public List<RankingDto> getRankingList() {
        List<User> users = userRepository.findAllByOrderByPointDesc();
        List<RankingDto> rankingDtoList = new ArrayList<>();
        Map<Long, Integer> previousRanks = new HashMap<>(); // 이전 랭킹을 저장할 맵 추가
        int rank = 1;

        for (User user : users) {
            if (user.getPoint() <= 0) {
                continue;
            }

            Rank lastRank = rankRepository.findByUserId(user.getId()).orElse(null);
            Integer lastRankValue = lastRank != null ? lastRank.getRanking() : 0;

            // 이전 랭킹을 맵에 저장
            previousRanks.put(user.getId(), lastRankValue);

            // 현재 랭킹을 갱신하기 위한 조건 확인
            LocalDateTime scheduledTime = LocalDateTime.now().withHour(6).withMinute(0).withSecond(0);
            LocalDateTime currentTime = LocalDateTime.now();

            if (currentTime.isAfter(scheduledTime)) {
                if (lastRankValue != null && lastRankValue != rank) {
                    // 이전 랭킹과 현재 랭킹이 다르면 랭킹을 갱신
                    lastRank = lastRank != null ? lastRank : new Rank();
                    lastRank.setUserId(user.getId());
                    lastRank.setRanking(rank);
                    lastRank.setDateTime(LocalDateTime.now());
                    lastRank.setPreviousRank(lastRankValue);
                    rankRepository.save(lastRank);
                }
            }

            int change = rank - lastRankValue;

            RankingDto rankingDto = new RankingDto(user.getId(), user.getNickname(), user.getPoint(), rank, lastRankValue, change);
            rankingDtoList.add(rankingDto);

            rank++;
        }

        // 변경된 랭킹에 영향을 받는 사용자들의 처리 추가
        for (User user : users) {
            Integer lastRankValue = previousRanks.get(user.getId());
            if (lastRankValue == null || lastRankValue == 0) {
                // 새로운 사용자 또는 이전 랭킹이 0인 사용자는 처리할 필요 없음
                continue;
            }

            // 변경된 랭킹에 영향을 받는 사용자의 처리 로직 추가
            int currentRank = rankRepository.findByUserId(user.getId()).map(Rank::getRanking).orElse(0);
            int change = currentRank - lastRankValue;

            if (change != 0) {
                // 변경된 인원들에 한해서 처리하는 로직 추가
                int startRank;
                int endRank;
                if (change > 0) {
                    // 올라간 인원들에 한해서 처리
                    startRank = lastRankValue + 1;
                    endRank = rank - 1;
                } else {
                    // 내려간 인원들에 한해서 처리
                    startRank = rank;
                    endRank = lastRankValue - 1;
                }

                List<Rank> affectedRanks = rankRepository.findAllByRankingBetween(startRank, endRank);

                for (Rank affectedRank : affectedRanks) {
                    // 영향을 받는 사용자들의 랭킹을 변경하고 저장
                    affectedRank.setRanking(affectedRank.getRanking() + change);
                    rankRepository.save(affectedRank);
                }
            }

        }

        return rankingDtoList;
    }
}
