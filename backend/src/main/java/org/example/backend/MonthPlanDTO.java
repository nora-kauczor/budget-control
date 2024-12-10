package org.example.backend;

import java.util.List;

public record MonthPlanDTO(
        String yearMonth,
        double totalBudget,
        double totalLeftover,
        List<CategoryPlan> categoryPlans,
        List<Transaction> transactions
) {
}

