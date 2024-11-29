package org.example.backend;

import java.time.YearMonth;
import java.util.List;
import java.util.Map;

public record MonthPlanDTO(
        YearMonth yearMonth,
        double totalBudget,
        double totalLeftover,
        Map<String, CategoryPlan> categoryPlanMap,
        List<Transaction> transactions
) {
}

