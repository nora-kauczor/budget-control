package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.example.backend.exception.IdNotFoundException;
import org.example.backend.exception.UserIsNotAuthorizedException;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class MonthPlanService {

    private final MonthPlanRepo monthPlanRepo;

    public MonthPlan getMonthPlan(String user, String id) throws UserIsNotAuthorizedException, IdNotFoundException {
        MonthPlan monthPlan = monthPlanRepo.findById(id).orElseThrow(()->new IdNotFoundException("Id not found."));
        if (monthPlan.user().equals(user)) {return monthPlan;}
        else {throw new UserIsNotAuthorizedException("User is not authorized.");}
        }

    public MonthPlan getCurrentMonthPlan(String user)  {
        String currentYearMonth = YearMonth.now().toString();
        if (monthPlanRepo.existsByYearMonthAndUser(user,currentYearMonth))
        {return monthPlanRepo.findByYearMonthAndUser(user, currentYearMonth);}
        else {
            throw new NoSuchElementException();
        }
    }

    public List<MonthPlan> getAllMonthPlans(String user) {
        return monthPlanRepo.findByUser(user);
    }

    public MonthPlan createMonthPlan(String user, MonthPlanDTO monthPlanDTO) {
        // TODO check if there already exists a month plan for this month and user
        MonthPlan newMonthPlan = new MonthPlan(null, user,
                monthPlanDTO.yearMonth(), monthPlanDTO.totalBudget(),
                monthPlanDTO.totalLeftover(), monthPlanDTO.categoryPlanMap(),
                monthPlanDTO.transactions());
        return monthPlanRepo.save(newMonthPlan);
    }

    public MonthPlan editMonthPlan(String user, MonthPlan editedMonthPlan) throws UserIsNotAuthorizedException, IdNotFoundException {
        String authorOfMonthPlan= monthPlanRepo.findById(editedMonthPlan.id()).orElseThrow(()->new IdNotFoundException("Id not found.")).user();
        if (authorOfMonthPlan.equals(user))
        {
            return monthPlanRepo.save(editedMonthPlan);
        }
        else {throw new UserIsNotAuthorizedException("User is not authorized.");}
    }

    public String deleteMonthPlan(String user, String id) throws UserIsNotAuthorizedException, IdNotFoundException {
        String authorOfMonthPlan = monthPlanRepo.findById(id).orElseThrow(()->new IdNotFoundException("Id not found.")).user();
        if (authorOfMonthPlan.equals(user))
        {
            monthPlanRepo.deleteById(id);
            return "Month plan successfully deleted.";
        }
        else {throw new UserIsNotAuthorizedException("User is not authorized.");}
    }

}
