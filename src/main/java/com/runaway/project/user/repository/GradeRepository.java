package com.runaway.project.user.repository;

import com.runaway.project.user.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    Grade findByLevel(String level);

    Optional<Grade> findByMinPointLessThanEqualAndMaxPointGreaterThanEqual(int minPoint, int maxPoint);
}
