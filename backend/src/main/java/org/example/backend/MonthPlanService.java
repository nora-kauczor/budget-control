package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@RequiredArgsConstructor
@Service
public class MonthPlanService {

    private final MonthPlanRepo monthPlanRepo;

    public MonthPlan getMonthPlan(String user, String id) {
        MonthPlan monthPlan = monthPlanRepo.findById(id).orElseThrow();
        if (monthPlan.user().equals(user)) {return monthPlan;}
        return null;
    }

    public List<MonthPlan> getAllMonthPlans(String user) {
        return monthPlanRepo.findByUser(user);
    }

    public MonthPlan createMonthPlan(String user, MonthPlanDTO monthPlanDTO) {
        MonthPlan newMonthPlan = new MonthPlan(null, user,
                monthPlanDTO.yearMonth(), monthPlanDTO.totalBudget(),
                monthPlanDTO.totalLeftover(), monthPlanDTO.categoryPlanMap(),
                monthPlanDTO.transactions());
        return monthPlanRepo.save(newMonthPlan);
    }

    public MonthPlan editMonthPlan(String user, MonthPlan editedMonthPlan){
        String authorOfMonthPlan= monthPlanRepo.findById(editedMonthPlan.id()).orElseThrow().user();
        if (authorOfMonthPlan.equals(user))
        {
            return monthPlanRepo.save(editedMonthPlan);
        };
        return null;
    }

    public String deleteMonthPlan(String user, String id){
        String authorOfMonthPlan = monthPlanRepo.findById(id).orElseThrow().user();
        if (authorOfMonthPlan.equals(user))
        {
            monthPlanRepo.deleteById(id);
            return "Month plan successfully deleted.";
        };
        return "Couldn't delete month plan";
    }

}
