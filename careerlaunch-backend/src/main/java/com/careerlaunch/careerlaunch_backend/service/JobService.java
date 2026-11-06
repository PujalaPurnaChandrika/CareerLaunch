package com.careerlaunch.careerlaunch_backend.service;

import java.util.List;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.careerlaunch.careerlaunch_backend.entity.Job;
import com.careerlaunch.careerlaunch_backend.exception.JobNotFoundException;
import com.careerlaunch.careerlaunch_backend.repository.JobRepository;
import com.careerlaunch.careerlaunch_backend.entity.User;

@Service
public class JobService {
   private final JobRepository jobRepository;

   public JobService(JobRepository jobRepository) {
	  this.jobRepository = jobRepository;
   }
   
   public List<Job> getAllJobs(){
	   return jobRepository.findAll();
   }
   
   public Job getJobById(Long id) {
	   return jobRepository.findById(id).orElseThrow(() ->
       new JobNotFoundException("Job not found with ID: " + id));
   }
   
   public Job createJob(Job job, User recruiter) {
	    job.setRecruiter(recruiter);
	    return jobRepository.save(job);
	}
   
   public Job updateJob(Long id, Job updatedJob, User recruiter) {

	    Job existingJob = getJobById(id);
	    if (existingJob.getRecruiter() == null || !existingJob.getRecruiter().getId().equals(recruiter.getId())) {

	    	    throw new AccessDeniedException("You are not authorized to update this job");
	    }

	    existingJob.setTitle(updatedJob.getTitle());
	    existingJob.setCompany(updatedJob.getCompany());
	    existingJob.setLocation(updatedJob.getLocation());
	    existingJob.setDescription(updatedJob.getDescription());
	    existingJob.setRequiredSkills(updatedJob.getRequiredSkills());
	    existingJob.setExperienceLevel(updatedJob.getExperienceLevel());

	    return jobRepository.save(existingJob);
	}
   
   public void deleteJob(Long id, User recruiter) {

	    Job existingJob = getJobById(id);

	    if (existingJob.getRecruiter() == null || !existingJob.getRecruiter().getId().equals(recruiter.getId())) {
	    	    throw new AccessDeniedException("You are not authorized to delete this job" );
	    }

	    jobRepository.delete(existingJob);
	}
}
