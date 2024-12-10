package org.example.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashMap;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@SpringBootTest
@AutoConfigureMockMvc
class MonthPlanControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private MonthPlanRepo repo;

    @BeforeEach
    void setUp() {
        MonthPlan testMonthPlan = new MonthPlan("123", "000",
                "2024-12", 3000.00,
                2000.00, new HashMap<>(), List.of());
        repo.save(testMonthPlan);
    }

    @Test
    void getMonthPlan_shouldReturn200AndMonthPlan_whenCalledByItsIdAndItsCreator() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/budget/123")
                        .with(oauth2Login().attributes(attributes -> {
            attributes.put("sub", "000");
        })))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {"id": "123", "user": "000", "yearMonth":
                                                "2024-12", "totalBudget": 3000.00,
                                               "totalLeftover": 2000.00, "categoryPlans": {},"transactions": []}
                                """
                ));

    }

    @Test
    void getMonthPlan_shouldReturn403_whenCalledByOtherUser() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/budget/123")
                        .with(oauth2Login().attributes(attributes -> {
                            attributes.put("sub", "111");
                        })))
                .andExpect(status().isForbidden());
    }

    @Test
    void getMonthPlan_shouldReturn404_whenCalledWithNonExistentId() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/budget/nonexistent-id")
                        .with(oauth2Login().attributes(attributes -> {
                            attributes.put("sub", "000");
                        })))
                .andExpect(status().isNotFound());
    }

    @Test
    void getAllMonthPlans_shouldReturn200AndAllMonthPlansOfUser_whenCalledByHim() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/budget/all")
                        .with(oauth2Login().attributes(attributes -> {
                            attributes.put("sub", "000");
                        })))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                               [{"id": "123", "user": "000", "yearMonth":
                                                "2024-12", "totalBudget": 3000.00,
                                               "totalLeftover": 2000.00, "categoryPlans": {},"transactions": []}]
                               """
                ));
    }

    @Test
    void createMonthPlan() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/budget")
                        .with(oauth2Login().attributes(attributes -> {
                            attributes.put("sub", "000");
                        }))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                               {"yearMonth":
                                                "2024-12", "totalBudget": 3000.00,
                                               "totalLeftover": 2000.00, "categoryPlans": {},"transactions": []}
                               """)
                )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                               {"yearMonth":
                                                "2024-12", "totalBudget": 3000.00,
                                               "totalLeftover": 2000.00, "categoryPlans": {},"transactions": []}
                               """
                ))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    void editMonthPlan_shouldReturn200AndEditedMonthPlan_whenCalledWithEditedMonthPlanAndByTheCreator() throws Exception {
        mvc.perform(MockMvcRequestBuilders.put("/api/budget")
                        .with(oauth2Login().attributes(attributes -> {
                            attributes.put("sub", "000");
                        }))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                               {"id": "123", "user": "000", "yearMonth":
                                                "2024-12", "totalBudget": 3000.00,
                                               "totalLeftover": 2000.00, "categoryPlans": {},"transactions": []}
                               """)
                )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                               {"id": "123", "user": "000", "yearMonth":
                                                "2024-12", "totalBudget": 3000.00,
                                               "totalLeftover": 2000.00, "categoryPlans": {},"transactions": []}
                               """
                ))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    void editMonthPlan_shouldReturn403_whenCalledByOtherUser() throws Exception {
        mvc.perform(MockMvcRequestBuilders.put("/api/budget")
                        .with(oauth2Login().attributes(attributes -> {
                            attributes.put("sub", "111");
                        }))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                               {"id": "123", "user": "000", "yearMonth":
                                                "2024-12", "totalBudget": 3000.00,
                                               "totalLeftover": 2000.00, "categoryPlans": {},"transactions": []}
                               """)
                )
                .andExpect(status().isForbidden());
    }

    @Test
    void editMonthPlan_shouldReturn404_whenCalledWithNonExistentId() throws Exception {
        mvc.perform(MockMvcRequestBuilders.put("/api/budget")
                .with(oauth2Login().attributes(attributes -> {
                    attributes.put("sub", "000");
                }))
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                               {"id": "nonexistent-id", "user": "000", "yearMonth":
                                                "2024-12", "totalBudget": 3000.00,
                                               "totalLeftover": 2000.00, "categoryPlans": {},"transactions": []}
                               """)
        ).andExpect(status().isNotFound());
    }


    @Test
    void deleteMonthPlan_shouldReturn200AndConfirmationMessage_whenCalledByCreatorAndWithExistentId() throws Exception {
        mvc.perform(MockMvcRequestBuilders.delete("/api/budget/123")
                        .with(oauth2Login().attributes(attributes -> {
                            attributes.put("sub", "000");
                        })))
                .andExpect(status().isOk())
                .andExpect(content().string("Month plan successfully deleted."));
    }

    @Test
    void deleteMonthPlan_shouldReturn403_whenCalledByOtherUser() throws Exception {
        mvc.perform(MockMvcRequestBuilders.delete("/api/budget/123")
                        .with(oauth2Login().attributes(attributes -> {
                            attributes.put("sub", "111");
                        })))
                .andExpect(status().isForbidden());
    }

    @Test
    void deleteMonthPlan_shouldReturn404_whenCalledWithNonExistentId() throws Exception {
        mvc.perform(MockMvcRequestBuilders.delete("/api/budget/nonexistent-id")
                        .with(oauth2Login().attributes(attributes -> {
                            attributes.put("sub", "000");
                        })))
                .andExpect(status().isNotFound());
    }
}