
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyApplications } from '../services/api'
import '../styles/JobSeekerDashboard.css'
import Sidebar from '../components/Sidebar'

const JobSeekerDashboard = () => {

    const navigate = useNavigate()
    const email = localStorage.getItem('email')
    const [applications, setApplications] = useState([])

    useEffect(() => {
        async function getDashboardData() {
            try {
                let det = await getMyApplications()
                setApplications(det)
            } catch (error) {
                console.log("Unable to load dashboard data:", error)
            }
        }

        getDashboardData()
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

    return (
    <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
             <div className="dashboard">

                    <div className="dashboard-header">
                        <div>
                            <h1>Welcome to CareerLaunch!</h1>
                            <h3>{email}</h3>
                            <p>Track your applications and discover your next opportunity.</p>
                        </div>
                    </div>

                    <div className="dashboard-stats">

                        <div className="dashboard-stat total-stat">
                            <span>Total Applications</span>
                            <h2>{totalApplications}</h2>
                        </div>

                        <div className="dashboard-stat pending-stat">
                            <span>Pending</span>
                            <h2>{pendingApplications}</h2>
                        </div>

                        <div className="dashboard-stat accepted-stat">
                            <span>Accepted</span>
                            <h2>{acceptedApplications}</h2>
                        </div>

                        <div className="dashboard-stat rejected-stat">
                            <span>Rejected</span>
                            <h2>{rejectedApplications}</h2>
                        </div>

                    </div>

                    <div className="dashboard-actions">

                        <div className="dashboard-action-card">
                            <h2>Explore Jobs</h2>
                            <p>Discover opportunities that match your skills and interests.</p>
                            <button onClick={() => navigate('/jobs')}> Browse Jobs </button>
                        </div>
                        <div className="dashboard-action-card">
                            <h2>Track Applications</h2>
                            <p>Check the status of your submitted job applications.</p>
                            <button onClick={() => navigate('/my-applications')}> My Applications </button>
                        </div>

                    </div>

                </div>
        </main>
    </div>

    )
}

export default JobSeekerDashboard
