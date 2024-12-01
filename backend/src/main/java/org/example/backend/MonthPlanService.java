package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@RequiredArgsConstructor
@Service
public class MonthPlanService {

    private final MonthPlanRepo monthPlanRepo;

    public MonthPlan getMonthPlanOfUser(String id) {
        return monthPlanRepo.findById(id).orElseThrow();
    }

    public List<MonthPlan> getAllMonthPlansOfUser() {
        return monthPlanRepo.findAll();
    }

    public MonthPlan createMonthPlan(MonthPlanDTO monthPlanDTO) {
        MonthPlan newMonthPlan = new MonthPlan(null, null,
                monthPlanDTO.yearMonth(), monthPlanDTO.totalBudget(),
                monthPlanDTO.totalLeftover(), monthPlanDTO.categoryPlanMap(),
                monthPlanDTO.transactions());
        return monthPlanRepo.save(newMonthPlan);
    }

    public MonthPlan editMonthPlan(MonthPlan editedMonthPlan){
        System.out.println(editedMonthPlan);
        return monthPlanRepo.save(editedMonthPlan);
    }

    public String deleteMonthPlan(String id){
        monthPlanRepo.deleteById(id);
        return "Month plan successfully deleted.";
    }

}
