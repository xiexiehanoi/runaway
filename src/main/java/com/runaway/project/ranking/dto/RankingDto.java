package com.runaway.project.ranking.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RankingDto {
    private long id;
    private String nickname;
    private int point;

    public RankingDto(Long id, String nickname, int point) {
        this.id = id;
        this.nickname = nickname;
        this.point = point;
    }
}
