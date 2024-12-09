package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
@RequiredArgsConstructor
public class MonthPlanController {

    private final MonthPlanService monthPlanService;

    @GetMapping("/{id}")
    public MonthPlan getMonthPlan(@AuthenticationPrincipal OAuth2User user, @PathVariable String id) {
        return monthPlanService.getMonthPlan(user.getName(), id);
    }

    @GetMapping
    public List<MonthPlan> getAllMonthPlans(@AuthenticationPrincipal OAuth2User user) {
        return monthPlanService.getAllMonthPlans(user.getName());
    }

    @PostMapping
    public MonthPlan createMonthPlan(@AuthenticationPrincipal OAuth2User user, @RequestBody MonthPlanDTO monthPlanDTO) {
        return monthPlanService.createMonthPlan(user.getName(), monthPlanDTO);
    }

    @PutMapping
    public MonthPlan editMonthPlan(@AuthenticationPrincipal OAuth2User user, @RequestBody MonthPlan editedMonthPlan){
        return monthPlanService.editMonthPlan(user.getName(), editedMonthPlan);
    }

    @DeleteMapping("/{id}")
    public String deleteMonthPlan(@AuthenticationPrincipal OAuth2User user, @PathVariable String id){
        return monthPlanService.deleteMonthPlan(user.getName(), id);
    }
}
