package org.example.backend;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MonthPlanRepo extends MongoRepository<MonthPlan, String> {
    List<MonthPlan> findByUser(String user);

    MonthPlan findByYearMonthAndUser(String yearMonth, String user);

    boolean existsByYearMonthAndUser(String yearMonth, String user);

}
