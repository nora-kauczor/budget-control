package org.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler({UserIsNotAuthorizedException.class})
    public String handleUserIsNotAuthorizedException(UserIsNotAuthorizedException userIsNotAuthorizedException){
        return "User is not authorized for the requested method and object(s).";
    }

}
