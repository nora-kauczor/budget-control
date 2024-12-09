package org.example.backend;

import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MonthPlanServiceTest {

    private final MonthPlanRepo mockedRepo = mock(MonthPlanRepo.class);
    private final MonthPlanService monthPlanService = new MonthPlanService(mockedRepo);

    @Test
    void getMonthPlanOfUser() {
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, new HashMap<>(), List.of());
        when(mockedRepo.findById("123")).thenReturn(Optional.of(testMonthPlan));
        assertEquals(testMonthPlan, monthPlanService.getMonthPlan("000", "123"));
    }

    @Test
    void getAllMonthPlansOfUser() {
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, new HashMap<>(), List.of());
        when(mockedRepo.findByUser("000")).thenReturn(List.of(testMonthPlan));
        assertEquals(List.of(testMonthPlan), monthPlanService.getAllMonthPlans("000"));
    }

    @Test
    void createMonthPlan() {
        MonthPlanDTO testDTO = new MonthPlanDTO("2024-12", 3000.00,
                2000.00, new HashMap<>(), List.of());
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, new HashMap<>(), List.of());
        when(mockedRepo.save(any(MonthPlan.class))).thenReturn(testMonthPlan);
        assertEquals(testMonthPlan, monthPlanService.createMonthPlan("000", testDTO));
    }

    @Test
    void editMonthPlan() {
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, new HashMap<>(), List.of());
        when(mockedRepo.findById("123")).thenReturn(Optional.of(testMonthPlan));
        when(mockedRepo.save(testMonthPlan)).thenReturn(testMonthPlan);
        assertEquals(testMonthPlan, monthPlanService.editMonthPlan("000", testMonthPlan));
    }

    @Test
    void deleteMonthPlan() {
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, new HashMap<>(), List.of());
        String deletionMessage = "Month plan successfully deleted.";
        when(mockedRepo.findById("123")).thenReturn(Optional.of(testMonthPlan));
        assertEquals(deletionMessage, monthPlanService.deleteMonthPlan("000","123"));
    }
}