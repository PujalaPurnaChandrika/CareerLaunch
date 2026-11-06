
package com.careerlaunch.careerlaunch_backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.careerlaunch.careerlaunch_backend.entity.JobApplication;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByUserId(Long userId);
    List<JobApplication> findByJobId(Long jobId);
    
    boolean existsByUserIdAndJobId(Long userId, Long jobId);  
    List<JobApplication> findByJobRecruiterId(Long recruiterId); 
    Optional<JobApplication> findByIdAndJobRecruiterId(
            Long applicationId, Long recruiterId);
}
