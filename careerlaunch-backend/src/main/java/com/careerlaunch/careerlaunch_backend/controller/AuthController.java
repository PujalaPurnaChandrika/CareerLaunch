package com.careerlaunch.careerlaunch_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerlaunch.careerlaunch_backend.dto.LoginRequest;
import com.careerlaunch.careerlaunch_backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class AuthController {
	private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser( @RequestBody LoginRequest loginRequest) {

        try {
            String token = userService.loginUser(loginRequest);
            return ResponseEntity.ok(token);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
