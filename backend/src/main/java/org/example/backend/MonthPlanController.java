package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
@RequiredArgsConstructor
public class MonthPlanController {

    private final MonthPlanService monthPlanService;

    public MonthPlan getMonthPlanOfUser(String id) {
        return monthPlanService.getMonthPlanOfUser(id);
    }

    public List<MonthPlan> getAllMonthPlansOfUser() {
        return monthPlanService.getAllMonthPlansOfUser();
    }

    public MonthPlan createMonthPlan(MonthPlanDTO monthPlanDTO) {
        return monthPlanService.createMonthPlan(monthPlanDTO);
    }

    public MonthPlan editMonthPlan(MonthPlan editedMonthPlan){
        return monthPlanService.editMonthPlan(editedMonthPlan);
    }

    public String deleteMonthPlan(String id){
        return monthPlanService.deleteMonthPlan(id);
    }
}
