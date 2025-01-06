package org.example.backend;

import java.util.List;

public record MonthPlanDTO(
        String yearMonth,
        // TODO remove:
        double totalBudget,
        List<CategoryPlanDTO> categoryPlanDTOs

) {
}

