package org.example.backend;

public record CategoryPlan(
        String category,
        double categoryBudget,
        double categoryLeftover
        ){}
