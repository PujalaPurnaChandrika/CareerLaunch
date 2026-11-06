package com.careerlaunch.careerlaunch_backend.dto;

import java.time.LocalDateTime;

public class ApplicationResponse {

    private Long applicationId;
    private Long jobId;
    private String jobTitle;
    private String company;
    private String location;
    private String status;
    private LocalDateTime appliedDate;

    public ApplicationResponse() {
    }

    public ApplicationResponse(Long applicationId, Long jobId, String jobTitle, String company, String location, String status, LocalDateTime appliedDate) {
        this.applicationId = applicationId;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.company = company;
        this.location = location;
        this.status = status;
        this.appliedDate = appliedDate;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public Long getJobId() {
        return jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getCompany() {
        return company;
    }

    public String getLocation() {
        return location;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }
}
