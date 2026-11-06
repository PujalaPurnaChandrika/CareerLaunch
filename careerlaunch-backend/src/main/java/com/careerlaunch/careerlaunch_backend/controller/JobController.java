package com.careerlaunch.careerlaunch_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerlaunch.careerlaunch_backend.entity.Job;
import com.careerlaunch.careerlaunch_backend.service.JobService;
import com.careerlaunch.careerlaunch_backend.entity.User;
import com.careerlaunch.careerlaunch_backend.repository.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
	
   private final JobService jobService;
   private final UserRepository userRepository;

   public JobController(JobService jobService, UserRepository userRepository) {
	  this.jobService = jobService;
	  this.userRepository = userRepository;
   }
   
   @GetMapping
   public ResponseEntity<List<Job>> getAllJobs() {
	   return ResponseEntity.ok(jobService.getAllJobs());
   }
   
   @GetMapping("/{id}")
   public ResponseEntity<Job> getJobById(@PathVariable long id){
	   return ResponseEntity.ok(jobService.getJobById(id));
   }
   
   @PostMapping
   public ResponseEntity<Job> createJob(@RequestBody Job job, @AuthenticationPrincipal Jwt jwt) {

       String email = jwt.getSubject();
       User recruiter = userRepository.findByEmail(email);

       if (recruiter == null) {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
       }

       Job savedJob = jobService.createJob(job, recruiter);
       return ResponseEntity.status(HttpStatus.CREATED).body(savedJob);
   }
   
   @PutMapping("/{id}")
   public ResponseEntity<Job> updateJob( @PathVariable long id, @RequestBody Job job, @AuthenticationPrincipal Jwt jwt) {

       String email = jwt.getSubject();
       User recruiter = userRepository.findByEmail(email);

       if (recruiter == null) {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
       }

       return ResponseEntity.ok(jobService.updateJob(id, job, recruiter));
   }
   
   @DeleteMapping("/{id}")
   public ResponseEntity<Void> deleteJob(@PathVariable long id, @AuthenticationPrincipal Jwt jwt) {

       String email = jwt.getSubject();
       User recruiter = userRepository.findByEmail(email);

       if (recruiter == null) {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
       }

       jobService.deleteJob(id, recruiter);
       return ResponseEntity.noContent().build();
   }
}
