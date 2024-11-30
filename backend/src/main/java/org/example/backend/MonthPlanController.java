package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
@RequiredArgsConstructor
public class MonthPlanController {

    private final MonthPlanService monthPlanService;

    @GetMapping("/{id}")
    public MonthPlan getMonthPlanOfUser(@PathVariable String id) {
        return monthPlanService.getMonthPlanOfUser(id);
    }

    @GetMapping
    public List<MonthPlan> getAllMonthPlansOfUser() {
        return monthPlanService.getAllMonthPlansOfUser();
    }

    @PostMapping
    public MonthPlan createMonthPlan(MonthPlanDTO monthPlanDTO) {
        return monthPlanService.createMonthPlan(monthPlanDTO);
    }

    @PutMapping
    public MonthPlan editMonthPlan(MonthPlan editedMonthPlan){
        return monthPlanService.editMonthPlan(editedMonthPlan);
    }

    @DeleteMapping("/{id}")
    public String deleteMonthPlan(@PathVariable String id){
        return monthPlanService.deleteMonthPlan(id);
    }
}
