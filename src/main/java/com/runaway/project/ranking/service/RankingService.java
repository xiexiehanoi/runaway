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
        Map<Long, Integer> previousRanks = new HashMap<>();
        int rank = 1;

        // Step 1: Update the ranking for all users first
        for (User user : users) {
            if (user.getPoint() <= 0) continue;

            Rank lastRank = rankRepository.findByUserId(user.getId()).orElse(new Rank());
            lastRank.setUserId(user.getId());
            lastRank.setPreviousRank(lastRank.getRanking());
            lastRank.setRanking(rank);
            lastRank.setDateTime(LocalDateTime.now());

            rankRepository.save(lastRank);

            previousRanks.put(user.getId(), lastRank.getPreviousRank());
            rank++;
        }

        // Step 2: Create RankingDto objects based on the updated ranking information
        for (User user : users) {
            if (user.getPoint() <= 0) continue;

            Rank updatedRank = rankRepository.findByUserId(user.getId()).orElseThrow();
            int previousRankValue = previousRanks.getOrDefault(user.getId(), 0);
            int change = updatedRank.getRanking() - previousRankValue;

            RankingDto rankingDto = new RankingDto(
                    user.getId(),
                    user.getNickname(),
                    user.getPoint(),
                    updatedRank.getRanking(),
                    previousRankValue,
                    change
            );
            rankingDtoList.add(rankingDto);
        }

        return rankingDtoList;
    }
}
