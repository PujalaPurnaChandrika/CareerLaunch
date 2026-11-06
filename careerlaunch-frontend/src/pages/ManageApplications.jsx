import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRecruiterApplications, updateApplicationStatus} from '../services/api'
import '../styles/ManageApplications.css'

const ManageApplications = () => {

    const navigate = useNavigate()

    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [updatingId, setUpdatingId] = useState(null)

    async function getApplications() {
        try {
            setLoading(true)
            setError("")
            let det = await getRecruiterApplications()
            setApplications(det)

        } catch (error) {
            console.log(error)
            setError("Unable to load applications. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getApplications()
    }, [])

    async function changeStatus(applicationId, status) {
        try {
            setUpdatingId(applicationId)
            await updateApplicationStatus(applicationId, status)
            await getApplications()
        } catch (error) {
            console.log(error)
            alert("Unable to update application status.")
        } finally {
            setUpdatingId(null)
        }
    }
    
return (
    <div className="manage-applications">

        <header className="applications-header">
            <div>
                <h1>Manage Applications</h1>
                <p>Review applicants and manage your job applications.</p>
            </div>

            <button className="back-button" onClick={() => navigate('/recruiter-dashboard')}>
                ← Back to Dashboard
            </button>
        </header>

        {!loading && !error && (
            <div className="application-summary">

                <div className="summary-card total">
                    <h3>Total Applications</h3>
                    <h2>{applications.length}</h2>
                </div>

                <div className="summary-card pending">
                    <h3>Pending</h3>
                    <h2>{applications.filter(a => a.status === "PENDING").length}</h2>
                </div>

                <div className="summary-card accepted">
                    <h3>Accepted</h3>
                    <h2>{applications.filter(a => a.status === "ACCEPTED").length}</h2>
                </div>

                <div className="summary-card rejected">
                    <h3>Rejected</h3>
                    <h2>{applications.filter(a => a.status === "REJECTED").length}</h2>
                </div>

            </div>
        )}

        {loading && <p className="loading-message">Loading applications...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && applications.length === 0 && (
            <div className="empty-applications">
                <h2>No Applications Yet</h2>
                <p>Applications received for your job postings will appear here.</p>
            </div>
        )}

        {!loading && !error && applications.length > 0 && (
            <>
                <h2 className="applications-section-title"> Applicant Details </h2>
                <div className="applications-list">

                    {applications.map((application) => (

                        <div className="application-card" key={application.applicationId}>

                            <div className="applicant-info">

                                <div className="applicant-heading">
                                    <div className="applicant-avatar">
                                        {application.applicantName?.charAt(0).toUpperCase()}
                                    </div>

                                    <div>
                                        <h2>{application.applicantName}</h2>
                                        <p className="applicant-email"> {application.applicantEmail} </p>
                                    </div>
                                </div>

                                <div className="applicant-details">
                                    <p><strong>Applied For:</strong> {application.jobTitle}</p>
                                    <p><strong>Application ID:</strong> #{application.applicationId}</p>
                                    <p>
                                        <strong>Applied Date:</strong>{" "}
                                        {application.appliedDate
                                            ? new Date(application.appliedDate).toLocaleDateString()
                                            : "Not available"}
                                    </p>
                                </div>

                                <div className="status-row">
                                    <strong>Status:</strong>
                                    <span className={`status ${application.status?.toLowerCase()}`}>
                                        {application.status}
                                    </span>
                                </div>

                            </div>

                            <div className="application-actions">

                                {application.status === "PENDING" ? (
                                    <>
                                        <button
                                            className="accept-btn"
                                            disabled={updatingId === application.applicationId}
                                            onClick={() => changeStatus(application.applicationId, "ACCEPTED")}
                                        >
                                            {updatingId === application.applicationId ? "Updating..." : "✓ Accept"}
                                        </button>

                                        <button
                                            className="reject-btn"
                                            disabled={updatingId === application.applicationId}
                                            onClick={() => changeStatus(application.applicationId, "REJECTED")}
                                        >
                                            Reject
                                        </button>
                                    </>
                                ) : (
                                    <p className="completed-status">
                                        Application Reviewed
                                    </p>
                                )}

                            </div>

                        </div>

                    ))}

                </div>
            </>
        )}

    </div>
)

}

export default ManageApplications
