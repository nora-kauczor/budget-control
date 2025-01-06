package org.example.backend;

import java.util.List;


public record MonthPlan(
        String id,
        String user,
        String yearMonth,
        double totalBudget,
        double totalLeftover,
        List<CategoryPlan> categoryPlans,
        List<Transaction> transactions
) {
}



