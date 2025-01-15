package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.example.backend.exception.IdNotFoundException;
import org.example.backend.exception.MonthPlanAlreadyExistsException;
import org.example.backend.exception.UserIsNotAuthorizedException;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class MonthPlanService {

    private final MonthPlanRepo monthPlanRepo;

    public MonthPlan getMonthPlan(String user, String id) throws UserIsNotAuthorizedException, IdNotFoundException {
        MonthPlan monthPlan = monthPlanRepo.findById(id).orElseThrow(() -> new IdNotFoundException("Id not found."));
        if (monthPlan.user().equals(user)) {
            return monthPlan;
        } else {
            throw new UserIsNotAuthorizedException("User is not authorized.");
        }
    }

    public MonthPlan getCurrentMonthPlan(String user) {
        String currentYearMonth = YearMonth.now().toString();
        if (monthPlanRepo.existsByYearMonthAndUser(currentYearMonth, user)) {
            return monthPlanRepo.findByYearMonthAndUser(currentYearMonth, user);
        }
        else {
            throw  new NoSuchElementException();
        }
    }

    public List<MonthPlan> getAllMonthPlans(String user) {
        return monthPlanRepo.findByUser(user);
    }


    public MonthPlan createMonthPlan(String user, MonthPlanDTO monthPlanDTO) throws MonthPlanAlreadyExistsException {
        System.out.println("PRINT: "+monthPlanDTO.categoryPlanDTOs());
        boolean monthPlanAlreadyExists = monthPlanRepo.existsByYearMonthAndUser(monthPlanDTO.yearMonth(), user);
        if (monthPlanAlreadyExists) {
            throw new MonthPlanAlreadyExistsException("Cannot create month plan because month plan for this month already exists.");
        }
        List<CategoryPlan> categoryPlans = new ArrayList<>();
        if (monthPlanDTO.categoryPlanDTOs() != null) {
            for (int i = 0; i < monthPlanDTO.categoryPlanDTOs().size(); i++) {
                CategoryPlanDTO categoryPlanDTO = monthPlanDTO.categoryPlanDTOs().get(i);
                CategoryPlan categoryPlan = new CategoryPlan(categoryPlanDTO.category(), categoryPlanDTO.categoryBudget(), categoryPlanDTO.categoryBudget());
                categoryPlans.add(categoryPlan);
            }
        }
        assert monthPlanDTO.categoryPlanDTOs() != null;
        double totalBudget = monthPlanDTO.categoryPlanDTOs().stream()
                .mapToDouble(CategoryPlanDTO::categoryBudget)
                .sum();
        MonthPlan newMonthPlan = new MonthPlan(null, user,
                monthPlanDTO.yearMonth(), totalBudget,
                totalBudget, categoryPlans,
                new ArrayList<>());
        return monthPlanRepo.save(newMonthPlan);
    }

    public MonthPlan editMonthPlan(String user, MonthPlan editedMonthPlan) throws UserIsNotAuthorizedException, IdNotFoundException {
        MonthPlan oldMonthPlan = monthPlanRepo.findById(editedMonthPlan.id()).orElseThrow(() -> new IdNotFoundException("Id not found."));
        String authorOfMonthPlan = oldMonthPlan.user();
        if (!authorOfMonthPlan.equals(user)) {
            throw new UserIsNotAuthorizedException("User is not authorized.");
        }
        double updatedTotalBudget = editedMonthPlan.categoryPlans().stream()
                .mapToDouble(CategoryPlan::categoryBudget).sum();
        List<CategoryPlan> updatedCategoryPlans = new ArrayList<>();
        for (int i = 0; i < editedMonthPlan.categoryPlans().size(); i++) {
            String category = editedMonthPlan.categoryPlans().get(i).category();
            double budget = editedMonthPlan.categoryPlans().get(i).categoryBudget();
            double amountSpent = getAmountSpent(editedMonthPlan, category);
            double leftover = budget - amountSpent;
            CategoryPlan categoryPlan = new CategoryPlan(category, budget, leftover);
            updatedCategoryPlans.add(categoryPlan);
        }
        double updatedTotalLeftover = updatedCategoryPlans.stream()
                .mapToDouble(CategoryPlan::categoryLeftover)
                .sum();
        MonthPlan updatedMonthPlan = new MonthPlan(editedMonthPlan.id(), editedMonthPlan.user(),
                editedMonthPlan.yearMonth(), updatedTotalBudget, updatedTotalLeftover,
                updatedCategoryPlans, editedMonthPlan.transactions());
        return monthPlanRepo.save(updatedMonthPlan);
    }

    public double getAmountSpent(MonthPlan monthPlan, String category) {
        return monthPlan.transactions().stream()
                .filter(transaction -> transaction.category().equals(category))
                .mapToDouble(Transaction::amount)
                .sum();
    }


    public String deleteMonthPlan(String user, String id) throws UserIsNotAuthorizedException, IdNotFoundException {
        String authorOfMonthPlan = monthPlanRepo.findById(id).orElseThrow(() -> new IdNotFoundException("Id not found.")).user();
        if (authorOfMonthPlan.equals(user)) {
            monthPlanRepo.deleteById(id);
            return "Month plan successfully deleted.";
        } else {
            throw new UserIsNotAuthorizedException("User is not authorized.");
        }
    }

}
