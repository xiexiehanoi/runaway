package com.runaway.project.ranking.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
public class RankingDto {
    private long id;
    private String nickname;
    private int point;
    private int ranking;
    private Integer previousRank;
    private Integer rankChange;

    public RankingDto(Long id, String nickname, int point, int ranking, Integer previousRank, Integer rankChange) {
        this.id = id;
        this.nickname = nickname;
        this.point = point;
        this.ranking = ranking;
        this.previousRank = previousRank;
        this.rankChange = rankChange;
    }
}
