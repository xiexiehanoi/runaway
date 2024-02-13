package com.runaway.project.ranking.controller;

import com.runaway.project.ranking.dto.RankingDto;
import com.runaway.project.ranking.service.RankingService;
import com.runaway.project.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ranking")
@CrossOrigin(origins = "https://localhost")
public class RankingController {
    private final RankingService rankingService;

    @Autowired
    public RankingController(RankingService rankingService){
        this.rankingService=rankingService;
    }

    @GetMapping("/list")
    public List<RankingDto> getRankingList(){
        return rankingService.getRankingList();
    }

}
