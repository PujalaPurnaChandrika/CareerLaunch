import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyApplications } from '../services/api'
import '../styles/MyApplications.css'

const MyApplications = () => {
    const navigate = useNavigate()

    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [filter, setFilter] = useState("ALL")

    async function getMyApplicationsList() {
        try {
            let det = await getMyApplications()
            setApplications(det)
        }
        catch (error) {
            console.log("Error fetching applications:", error)
            setError("Unable to load your applications.")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMyApplicationsList()
    }, [])

    const totalApplications = applications.length

    const pendingApplications = applications.filter(
        app => app.status === "PENDING"
    ).length

    const acceptedApplications = applications.filter(
        app => app.status === "ACCEPTED"
    ).length

    const rejectedApplications = applications.filter(
        app => app.status === "REJECTED"
    ).length

    if (loading) {
        return <div className="applications-message">Loading your applications...</div>
    }

    if (error) {
        return <div className="applications-message error-message">{error}</div>
    }

    const filteredApplications = applications.filter((app) => {
         if (filter === "ALL") return true
         return app.status === filter
    })

    return (
        <div className="my-applications">

            <div className="applications-header">
                <div>
                    <h1>My Applications</h1>
                    <p>Track your job applications and stay updated on your career journey.</p>
                </div>

                <button className="back-button" onClick={() => navigate('/job-seeker-dashboard')} >
                    ← Back to Dashboard
                </button>
            </div>

            <div className="application-filters">
                <button className={filter === "ALL" ? "active" : ""} onClick={() => setFilter("ALL")} >
                    All
                </button>

                <button className={filter === "PENDING" ? "active" : ""} onClick={() => setFilter("PENDING")} >
                    Pending
                </button>

                <button className={filter === "ACCEPTED" ? "active" : ""} onClick={() => setFilter("ACCEPTED")} >
                    Accepted
                </button>

                <button className={filter === "REJECTED" ? "active" : ""} onClick={() => setFilter("REJECTED")} >
                    Rejected
                </button>
            </div>

            <div className="application-stats">

                <div className="stat-card total-stat">
                    <span>Total Applications</span>
                    <h2>{totalApplications}</h2>
                </div>

                <div className="stat-card pending-stat">
                    <span>Pending</span>
                    <h2>{pendingApplications}</h2>
                </div>

                <div className="stat-card accepted-stat">
                    <span>Accepted</span>
                    <h2>{acceptedApplications}</h2>
                </div>

                <div className="stat-card rejected-stat">
                    <span>Rejected</span>
                    <h2>{rejectedApplications}</h2>
                </div>

            </div>

            <div className="applications-content">

                <div className="applications-section-header">
                    <h2>Application History</h2>
                    <span>{totalApplications} Applications</span>
                </div>

                {applications.length === 0 ? (

                    <div className="empty-applications">
                        <h3>No applications yet!</h3>
                        <p>Start exploring opportunities and apply for jobs that match your skills.</p>
                    </div>

                ) : (

                    <div className="application-list">

                        {filteredApplications.map((app) => (

                            <div className="application-card" key={app.applicationId}>
                                <div className="application-card-top">
                                    <div className="company-icon">
                                        {app.company?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="application-job-info">
                                        <h3>{app.jobTitle}</h3>
                                        <p>{app.company}</p>
                                    </div>
                                    <span className={`status-badge ${app.status?.toLowerCase()}`}>
                                        {app.status}
                                    </span>
                                </div>

                                <div className="application-details">
                                    <div>
                                        <span className="detail-label">Location</span>
                                        <p>{app.location}</p>
                                    </div>
                                    <div>
                                        <span className="detail-label">Applied Date</span>
                                        <p>{new Date(app.appliedDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <span className="detail-label">Application ID</span>
                                        <p>#{app.applicationId}</p>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    )
}

export default MyApplications
