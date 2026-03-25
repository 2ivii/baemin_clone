package com.baemin.api.exception;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) { super(message); }
}