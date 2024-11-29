package org.example.backend;

import jdk.jfr.Timestamp;

public

record Transaction (
        String id,
        Timestamp timestamp,
        String user,
        double amount,
        String note,
        String category
)
{}