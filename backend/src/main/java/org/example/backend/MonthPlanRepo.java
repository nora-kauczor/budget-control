package org.example.backend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MonthPlanRepo extends MongoRepository<MonthPlan, String> {
}
