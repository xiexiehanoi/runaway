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
import java.util.List;

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
        int rank = 1;

        for (User user : users) {
            if (user.getPoint() <= 0) {
                continue;
            }

            Rank lastRank = rankRepository.findByUserId(user.getId()).orElse(null);
//            System.out.println("lasRank: "+ lastRank);
            Integer lastRankValue = lastRank != null ? lastRank.getRanking() : null;

            LocalDateTime scheduledTime = LocalDateTime.now().withHour(6).withMinute(0).withSecond(0);
            LocalDateTime currentTime = LocalDateTime.now();

            if (currentTime.isAfter(scheduledTime)) {
                // 스케줄 실행 시간 이후에만 랭킹을 갱신
                if (lastRankValue != null && lastRankValue != rank) {
                    Rank rankEntity = lastRank != null ? lastRank : new Rank();
                    rankEntity.setUserId(user.getId());
                    rankEntity.setRanking(rank);
                    rankEntity.setDateTime(LocalDateTime.now());
                    rankEntity.setPreviousRank(lastRankValue);

                    rankRepository.save(rankEntity);
                }
            }

            int change = rank - lastRankValue;
//            System.out.println("change:"+change);

            RankingDto rankingDto = new RankingDto(user.getId(), user.getNickname(), user.getPoint(), rank, lastRankValue, change);
            rankingDtoList.add(rankingDto);

            rank++;
        }

        return rankingDtoList;
    }
}
