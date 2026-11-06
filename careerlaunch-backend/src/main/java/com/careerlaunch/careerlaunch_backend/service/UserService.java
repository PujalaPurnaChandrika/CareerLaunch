package com.careerlaunch.careerlaunch_backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.careerlaunch.careerlaunch_backend.entity.User;
import com.careerlaunch.careerlaunch_backend.repository.UserRepository;
import com.careerlaunch.careerlaunch_backend.dto.LoginRequest;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
         this.userRepository = userRepository;
         this.passwordEncoder = passwordEncoder;
         this.jwtService = jwtService;
    }

	public User registerUser(User user) {

	    if (userRepository.existsByEmail(user.getEmail())) {
	        throw new RuntimeException("Email is already registered");
	    }
	    if (user.getRole() == null ||(!user.getRole().equals("JOB_SEEKER") && !user.getRole().equals("RECRUITER"))) {
	        throw new RuntimeException("Invalid user role");
	    }
	    user.setPassword(passwordEncoder.encode(user.getPassword()));
	    return userRepository.save(user);
	}
	
	public String loginUser(LoginRequest loginRequest) {

	    User user = userRepository.findByEmail(loginRequest.getEmail());
	    if (user == null) {
	        throw new RuntimeException("Email is not registered");
	    }
	    if (!passwordEncoder.matches(
	            loginRequest.getPassword(), user.getPassword())) {
	        throw new RuntimeException("Invalid password");
	    }
	    String token = jwtService.generateToken(user.getEmail(), user.getRole());
	    return token;
	}
}
