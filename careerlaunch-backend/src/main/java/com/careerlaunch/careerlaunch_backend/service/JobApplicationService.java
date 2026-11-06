
package com.careerlaunch.careerlaunch_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.careerlaunch.careerlaunch_backend.entity.Job;
import com.careerlaunch.careerlaunch_backend.entity.JobApplication;
import com.careerlaunch.careerlaunch_backend.entity.User;
import com.careerlaunch.careerlaunch_backend.repository.JobApplicationRepository;
import com.careerlaunch.careerlaunch_backend.repository.JobRepository;
import com.careerlaunch.careerlaunch_backend.repository.UserRepository;

@Service
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobApplicationService( JobApplicationRepository applicationRepository, JobRepository jobRepository, UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    public JobApplication applyForJob(Long userId, Long jobId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));

        if (!user.getRole().equals("JOB_SEEKER")) {
            throw new RuntimeException("Only Job Seekers can apply for jobs");
        }

        if (applicationRepository.existsByUserIdAndJobId(userId, jobId)) {
            throw new RuntimeException("You have already applied for this job");
        }

        JobApplication application = new JobApplication();

        application.setUser(user);
        application.setJob(job);
        application.setAppliedDate(LocalDateTime.now());
        application.setStatus("PENDING");

        return applicationRepository.save(application);
    }

    public List<JobApplication> getApplicationsByUser(Long userId) {
        return applicationRepository.findByUserId(userId);
    }
    
    public List<JobApplication> getApplicationsByRecruiter(Long recruiterId) {
        return applicationRepository.findByJobRecruiterId(recruiterId);
    }
    
    public JobApplication updateApplicationStatus(
            Long applicationId, Long recruiterId, String status) {

        if (!status.equals("ACCEPTED") && !status.equals("REJECTED")) {
            throw new RuntimeException("Invalid application status");
        }

        JobApplication application = applicationRepository
                .findByIdAndJobRecruiterId(applicationId, recruiterId)
                .orElseThrow(() ->
                        new RuntimeException( "Application not found or you are not authorized"));

        application.setStatus(status);

        return applicationRepository.save(application);
    }
}
