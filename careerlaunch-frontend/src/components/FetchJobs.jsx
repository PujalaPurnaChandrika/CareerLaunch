import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchJobs } from '../services/api'
import JobDetails from './JobDetails'
import AddJob from './AddJob'
import '../styles/Jobs.css'

const FetchJobs = () => {
    const navigate = useNavigate()

    const [jobs, setJobs] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    async function getJobs() {
        try {
            let det = await fetchJobs()
            setJobs(det)
            console.log(det)
        } catch (error) {
            console.log("Error fetching jobs:", error)
        }
    }

    useEffect(() => {
        getJobs()
    }, [])

    const role = localStorage.getItem("role")

    const filteredJobs = jobs.filter((job) => {

        return (
            job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

return (
        <div className="jobs-page">

            <header className="jobs-header">
                <div className="jobs-header-content">
                    <h1>{role === "RECRUITER" ? "Career Opportunities" : "Explore Opportunities"}</h1>
                    <p> {role === "RECRUITER" ? "Post and manage job opportunities." : "Discover roles that match your career interests."} </p>
                </div>

                <button className="jobs-back-button" onClick={() => {
                        if (role === "RECRUITER") {
                            navigate("/recruiter-dashboard")
                        } else if (role === "JOB_SEEKER") {
                            navigate("/job-seeker-dashboard")
                        } else {
                            navigate("/")
                        }
                }}>
                     {role ? "← Back to Dashboard" : "← Back to Home"}
                </button>
            </header>

            {role === "RECRUITER" && (
                <AddJob onJobAdded={getJobs} />
            )}

            <div className="job-search">
                <input type="text" placeholder="Search by job title, company or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                {searchTerm && (
                    <button onClick={() => setSearchTerm("")}> Clear </button>
                )}

            </div>

            {filteredJobs.length === 0 && searchTerm ? (

                <div className="empty-message">
                    No matching jobs found. Try another search.
                </div>

            ) : (

                <JobDetails details={filteredJobs} onJobChanged={getJobs} />

            )}

        </div>
    )
}

export default FetchJobs
