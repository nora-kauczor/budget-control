package org.example.backend.exception;

public class UserIsNotAuthorizedException extends Exception {
    public UserIsNotAuthorizedException(String message) {
        super(message);
    }
}
