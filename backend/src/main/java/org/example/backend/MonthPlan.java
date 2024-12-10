package org.example.backend;

import java.util.List;
import java.util.Map;

public record MonthPlan(
        String id,
        String user,
        String yearMonth,
        double totalBudget,
        double totalLeftover,
        Map<String, CategoryPlan> categoryPlans,
        List<Transaction> transactions
) {
}



