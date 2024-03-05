package com.runaway.project.ranking.repository;

import com.runaway.project.ranking.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RankRepository extends JpaRepository<Rank, Integer> {
    Optional<Rank> findByUserId(Long userId);
    List<Rank> findByRankingGreaterThanEqualOrderByDateTimeDesc(int ranking);
    List<Rank> findAllByRankingBetween(int startRank, int endRank);
}
