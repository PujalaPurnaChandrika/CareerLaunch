
package com.careerlaunch.careerlaunch_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerlaunch.careerlaunch_backend.entity.User;
import com.careerlaunch.careerlaunch_backend.repository.UserRepository;
import com.careerlaunch.careerlaunch_backend.service.JobApplicationService;

import java.util.List;
import com.careerlaunch.careerlaunch_backend.dto.ApplicationResponse;
import com.careerlaunch.careerlaunch_backend.entity.JobApplication;
import com.careerlaunch.careerlaunch_backend.dto.RecruiterApplicationResponse;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    private final JobApplicationService applicationService;
    private final UserRepository userRepository;

    public JobApplicationController(JobApplicationService applicationService, UserRepository userRepository) {
        this.applicationService = applicationService;
        this.userRepository = userRepository;
    }

    @PostMapping("/{jobId}/apply")
    public ResponseEntity<String> applyForJob( @PathVariable Long jobId, @AuthenticationPrincipal Jwt jwt) {

            try {
		        String email = jwt.getSubject();
		        User user = userRepository.findByEmail(email);
		
		        if (user == null) {
		            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
		        }
		
		        applicationService.applyForJob(user.getId(), jobId);
		        return ResponseEntity.status(HttpStatus.CREATED).body("Job application submitted successfully!");
		
		        } catch (RuntimeException e) {
		            return ResponseEntity.badRequest().body(e.getMessage());
		        }
		    }
    
    @GetMapping("/my-applications")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(@AuthenticationPrincipal Jwt jwt) {

        String email = jwt.getSubject();
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (!user.getRole().equals("JOB_SEEKER")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<JobApplication> applications = applicationService.getApplicationsByUser(user.getId());

        List<ApplicationResponse> response = applications.stream()
                .map(application -> new ApplicationResponse(
                        application.getId(),
                        application.getJob().getId(),
                        application.getJob().getTitle(),
                        application.getJob().getCompany(),
                        application.getJob().getLocation(),
                        application.getStatus(),
                        application.getAppliedDate()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/recruiter-applications")
    public ResponseEntity<List<RecruiterApplicationResponse>> getRecruiterApplications( @AuthenticationPrincipal Jwt jwt) {

        String email = jwt.getSubject();
        User recruiter = userRepository.findByEmail(email);

        if (recruiter == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (!recruiter.getRole().equals("RECRUITER")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<JobApplication> applications =  applicationService.getApplicationsByRecruiter(recruiter.getId());

        List<RecruiterApplicationResponse> response = applications.stream()
                .map(application -> new RecruiterApplicationResponse(
                        application.getId(),
                        application.getJob().getId(),
                        application.getJob().getTitle(),
                        application.getUser().getFullName(),
                        application.getUser().getEmail(),
                        application.getStatus(),
                        application.getAppliedDate()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }
    
    @PatchMapping("/{applicationId}/status")
    public ResponseEntity<String> updateApplicationStatus( @PathVariable Long applicationId, @RequestParam String status, @AuthenticationPrincipal Jwt jwt) {

        String email = jwt.getSubject();
        User recruiter = userRepository.findByEmail(email);

        if (recruiter == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Recruiter not found");
        }

        if (!recruiter.getRole().equals("RECRUITER")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only recruiters can update application status");
        }

        try {
            applicationService.updateApplicationStatus(applicationId, recruiter.getId(), status.toUpperCase());
            return ResponseEntity.ok( "Application status updated to " + status);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
