package com.careerlaunch.careerlaunch_backend.dto;

import java.time.LocalDateTime;

public class RecruiterApplicationResponse {

    private Long applicationId;
    private Long jobId;
    private String jobTitle;
    private String applicantName;
    private String applicantEmail;
    private String status;
    private LocalDateTime appliedDate;

    public RecruiterApplicationResponse() {
    }

    public RecruiterApplicationResponse(Long applicationId, Long jobId, String jobTitle, String applicantName, String applicantEmail, String status, LocalDateTime appliedDate) {

        this.applicationId = applicationId;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.applicantName = applicantName;
        this.applicantEmail = applicantEmail;
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

    public String getApplicantName() {
        return applicantName;
    }

    public String getApplicantEmail() {
        return applicantEmail;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }
}