package org.example.backend;

import java.util.List;

public record MonthPlanDTO(
        String yearMonth,
        List<CategoryPlanDTO> categoryPlanDTOs

) {
}

