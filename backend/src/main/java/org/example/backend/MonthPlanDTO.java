package org.example.backend;

import java.util.List;
import java.util.Map;

public record MonthPlanDTO(
        String yearMonth,
        double totalBudget,
        double totalLeftover,
        Map<String, CategoryPlan> categoryPlans,
        List<Transaction> transactions
) {
}

