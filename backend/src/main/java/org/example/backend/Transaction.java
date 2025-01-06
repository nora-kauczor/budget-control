package org.example.backend;


public

record Transaction (
        String id,
        String timestamp,
        String user,
        double amount,
        String note,
        String category
)
{}