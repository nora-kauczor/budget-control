package org.example.backend.security;

import org.example.backend.MonthPlan;
import org.example.backend.MonthPlanRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserRepo repo;



    @Test
    void getUserId_shouldReturn200AndUserId_whenCalled() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/auth")
                .with(user("12345").roles("USER")))
                .andExpect(status().isOk())
                .andExpect(content().string("12345")
                );
    }

    @Test
    void getUserId_shouldReturnEmptyString_whenCalled_ifUserIsNotLoggedIn() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/auth"))
                .andExpect(status().isOk())
                .andExpect(content().string(""));
    }

    @Test
    void getUserObject_shouldReturn200AndUserObject_whenCalled() throws Exception {
        AppUser testUser = new AppUser("user", "Hans", null, null);
        repo.save(testUser);
        mvc.perform(MockMvcRequestBuilders.get("/api/auth/name")
                        .with(oidcLogin()
                                .userInfoToken(token -> token.claim("login", "Hans"))))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"id":"user","name":"Hans","avatarUrl":null,"authority":null}
                        """));
    }

    @Test
    void getUserName_shouldReturn200AndDummyUserObject_whenCalled_ifUserIsNotLoggedIn() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/auth/name"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"id":"NotFound","name":"","avatarUrl":null,"authority":null}
                        """))
        ;

    }
}