package com.careerlaunch.careerlaunch_backend.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Job {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	private String company;
	private String location;
	
	@Column(length = 2000)
    private String description;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "job_required_skills",joinColumns = @JoinColumn(name = "job_id"))
	@Column(name = "skill")
	private List<String> requiredSkills = new ArrayList<>();
	 
	private String experienceLevel;
	
	@ManyToOne
	@JoinColumn(name = "recruiter_id")
	private User recruiter;
	
	public User getRecruiter() {
		return recruiter;
	}

	public void setRecruiter(User recruiter) {
		this.recruiter = recruiter;
	}

	public Job() {
		
	}
	
	public Job(Long id, String title, String company, String location, String description, List<String> requiredSkills,
			String experienceLevel) {
	
		this.id = id;
		this.title = title;
		this.company = company;
		this.location = location;
		this.description = description;

		if (requiredSkills != null) {
            this.requiredSkills = new ArrayList<>(requiredSkills);
        }
		
		this.experienceLevel = experienceLevel;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getRequiredSkills() {
        return requiredSkills;
    }

	public void setRequiredSkills(List<String> requiredSkills) {
        this.requiredSkills = requiredSkills == null
                ? new ArrayList<>()
                : new ArrayList<>(requiredSkills);
    }

	public String getExperienceLevel() {
		return experienceLevel;
	}

	public void setExperienceLevel(String experienceLevel) {
		this.experienceLevel = experienceLevel;
	}
	
	
}
