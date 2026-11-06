package com.careerlaunch.careerlaunch_backend.exception;


public class JobNotFoundException extends RuntimeException {

    public JobNotFoundException(String message) {
        super(message);
    }
}
