package com.careerlaunch.careerlaunch_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.careerlaunch.careerlaunch_backend.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long>{
      
}
