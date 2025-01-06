package org.example.backend;

import java.util.List;

public record MonthPlanDTO(
        String yearMonth,
        double totalBudget,
        List<CategoryPlanDTO> categoryPlanDTOs

) {
}

