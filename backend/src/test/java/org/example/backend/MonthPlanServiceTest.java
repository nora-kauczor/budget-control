package org.example.backend;

import org.example.backend.exception.IdNotFoundException;
import org.example.backend.exception.MonthPlanAlreadyExistsException;
import org.example.backend.exception.UserIsNotAuthorizedException;
import org.junit.jupiter.api.Test;


import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MonthPlanServiceTest {

    private final MonthPlanRepo mockedRepo = mock(MonthPlanRepo.class);
    private final MonthPlanService monthPlanService = new MonthPlanService(mockedRepo);

    @Test
    void getMonthPlanOfUser_shouldReturnMonthPLan_whenCalledByItsIdAndItsCreator() throws UserIsNotAuthorizedException, IdNotFoundException {
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, List.of(), List.of());
        when(mockedRepo.findById("123")).thenReturn(Optional.of(testMonthPlan));
        assertEquals(testMonthPlan, monthPlanService.getMonthPlan("000", "123"));
    }

    @Test
    void getMonthPlan_shouldThrowUserIsNotAuthorizedException_whenCalledByOtherUser() {
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, List.of(), List.of());
        when(mockedRepo.findById("123")).thenReturn(Optional.of(testMonthPlan));
        assertThrows(UserIsNotAuthorizedException.class, () -> monthPlanService.getMonthPlan("111", "123"));
    }

    @Test
    void getMonthPlan_shouldThrowIdNotFoundException_whenCalledWithNonExistentId() {
        assertThrows(IdNotFoundException.class, () -> monthPlanService.getMonthPlan("000", "non existent id"));
    }

    @Test
    public void getCurrentMonthPlan_shouldReturnCurrentMonthPlanOfUser_ifMonthPlanExists() {
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, List.of(), List.of());
        when(mockedRepo.existsByYearMonthAndUser("000",
                "2024-12")).thenReturn(true);
        when(mockedRepo.findByYearMonthAndUser("000",
                "2024-12")).thenReturn(testMonthPlan);
        assertEquals(testMonthPlan, monthPlanService.getCurrentMonthPlan("000"));
    }

    @Test
    void getAllMonthPlansOfUser() {
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, List.of(), List.of());
        when(mockedRepo.findByUser("000")).thenReturn(List.of(testMonthPlan));
        assertEquals(List.of(testMonthPlan), monthPlanService.getAllMonthPlans("000"));
    }

    @Test
    void createMonthPlan_shouldReturnMonthPlan_whenCalledWithMonthPlanDTO() throws MonthPlanAlreadyExistsException {
        MonthPlanDTO testDTO = new MonthPlanDTO("2024-12", 3000.00,
                List.of(), List.of());
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, List.of(), List.of());
        when(mockedRepo.existsByYearMonthAndUser("2024-12", "000")).thenReturn(false);
        when(mockedRepo.save(any(MonthPlan.class))).thenReturn(testMonthPlan);
        assertEquals(testMonthPlan, monthPlanService.createMonthPlan("000", testDTO));
    }

    @Test
    void createMonthPlan_shouldThrowMonthPlanAlreadyExistsException_whenCalledWithMonthPlanDTO_IfMonthPlanAlreadyExists() {
        MonthPlanDTO testDTO = new MonthPlanDTO("2024-12", 3000.00,
                List.of(), List.of());
        when(mockedRepo.existsByYearMonthAndUser("2024-12", "000")).thenReturn(true);
        assertThrows(MonthPlanAlreadyExistsException.class, () -> monthPlanService.createMonthPlan("000", testDTO));
    }

    @Test
    void editMonthPlan_shouldReturnUpdatedMonthPlan_whenCalledByWithEditedMonthPlanWhereACategoryBudgetWasEdited() throws UserIsNotAuthorizedException, IdNotFoundException {
        CategoryPlan oldCategoryPlan = new CategoryPlan("leisure", 100.00, 0.00);
        List<CategoryPlan> oldCategoryPlans = List.of(oldCategoryPlan);
        MonthPlan oldMonthPlan = new MonthPlan("123", "000",
                "2024-12", 100.00,
                100.00, oldCategoryPlans, List.of());
        CategoryPlan editedCategoryPlan = new CategoryPlan("leisure", 150.00, 0.00);
        List<CategoryPlan> editedCategoryPlans = List.of(editedCategoryPlan);
        MonthPlan editedMonthPlan = new MonthPlan("123", "000",
                "2024-12", 100.00,
                100.00, editedCategoryPlans, List.of());

        MonthPlan updatedMonthPlan = new MonthPlan("123", "000",
                "2024-12", 150.00,
                150.00, editedCategoryPlans, List.of());
        when(mockedRepo.findById("123")).thenReturn(Optional.of(oldMonthPlan));
        when(mockedRepo.save(any(MonthPlan.class))).thenReturn(updatedMonthPlan);
        assertEquals(updatedMonthPlan, monthPlanService.editMonthPlan("000", editedMonthPlan));
    }

    @Test
    void editMonthPlan_shouldReturnUpdatedMonthPlan_whenCalledByWithEditedMonthPlanWhereATransactionWasAdded() throws UserIsNotAuthorizedException, IdNotFoundException {
        CategoryPlan oldCategoryPlan = new CategoryPlan("leisure", 100.00, 0.00);
        List<CategoryPlan> oldCategoryPlans = List.of(oldCategoryPlan);
        MonthPlan oldMonthPlan = new MonthPlan("123", "000",
                "2024-12", 100.00,
                100.00, oldCategoryPlans, List.of());
        Transaction newTransaction = new Transaction("transaction-id", "timestamp", "000",
                -23.00, "night out", "leisure");
        List<Transaction> editedTransactions = List.of(newTransaction);
        MonthPlan editedMonthPlan = new MonthPlan("123", "000",
                "2024-12", 100.00,
                100.00, oldCategoryPlans, editedTransactions);
        CategoryPlan updatedCategoryPlan = new CategoryPlan("leisure", 100.00, 77.00);
        List<CategoryPlan> updatedCategoryPlans = List.of(updatedCategoryPlan);
        MonthPlan updatedMonthPlan = new MonthPlan("123", "000",
                "2024-12", 100.00,
                77.00, updatedCategoryPlans, editedTransactions);
        when(mockedRepo.findById("123")).thenReturn(Optional.of(oldMonthPlan));
        when(mockedRepo.save(any(MonthPlan.class))).thenReturn(updatedMonthPlan);
        assertEquals(updatedMonthPlan, monthPlanService.editMonthPlan("000", editedMonthPlan));
    }


    @Test
    void editMonthPlan_shouldThrowUserIsNotAuthorizedException_whenCalledByOtherUser() {
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, List.of(), List.of());
        when(mockedRepo.findById("123")).thenReturn(Optional.of(testMonthPlan));
        assertThrows(UserIsNotAuthorizedException.class, () -> monthPlanService.getMonthPlan("111", "123"));
    }

    @Test
    void editMonthPlan_shouldThrowIdNotFoundException_whenCalledWithObjectWithNonExistentId() {
        MonthPlan testMonthPlan = new MonthPlan("id unknown to repo", "000",
                "2024-12", 3000.00,
                2000.00, List.of(), List.of());
        assertThrows(IdNotFoundException.class, () -> monthPlanService.editMonthPlan("000", testMonthPlan));
    }


    @Test
    void deleteMonthPlan() throws UserIsNotAuthorizedException, IdNotFoundException {
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, List.of(), List.of());
        String deletionMessage = "Month plan successfully deleted.";
        when(mockedRepo.findById("123")).thenReturn(Optional.of(testMonthPlan));
        assertEquals(deletionMessage, monthPlanService.deleteMonthPlan("000", "123"));
    }

    @Test
    void deleteMonthPlan_shouldThrowUserIsNotAuthorizedException_whenCalledByOtherUser() {
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, List.of(), List.of());
        when(mockedRepo.findById("123")).thenReturn(Optional.of(testMonthPlan));
        assertThrows(UserIsNotAuthorizedException.class, () -> monthPlanService.getMonthPlan("111", "123"));
    }

    @Test
    void deleteMonthPlan_shouldThrowIdNotFoundException_whenCalledWithNonExistentId() {
        assertThrows(IdNotFoundException.class, () -> monthPlanService.deleteMonthPlan("000", "non existent id"));
    }
}