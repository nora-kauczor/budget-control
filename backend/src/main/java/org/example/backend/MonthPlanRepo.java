package org.example.backend;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MonthPlanRepo extends MongoRepository<MonthPlan, String> {
    List<MonthPlan> findByUser(String user);

    MonthPlan findByYearMonthAndUser(String user, String yearMonth);

    boolean existsByYearMonthAndUser(String user, String currentYearMonth);
}
