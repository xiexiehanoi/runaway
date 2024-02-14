package com.runaway.project.ranking.service;

import com.runaway.project.ranking.dto.RankingDto;
import com.runaway.project.user.entity.User;
import com.runaway.project.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankingService {
    private final UserRepository userRepository;

    @Autowired
    public RankingService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<RankingDto> getRankingList() {
        return userRepository.findAllByOrderByPointDesc();
    }
}
