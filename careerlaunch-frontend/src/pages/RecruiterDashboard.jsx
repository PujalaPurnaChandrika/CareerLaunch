import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/RecruiterDashboard.css'
import Sidebar from '../components/Sidebar'

const RecruiterDashboard = () => {

    return (
    <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
            <div className="recruiter-dashboard">

            <header className="dashboard-header">
                <h1>Recruiter Dashboard</h1>
                <p>Manage your job opportunities and applicants.</p>
            </header>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h2>Post a Job</h2>
                    <p>Create and publish new job opportunities.</p>
                    <Link to="/jobs">Post Job</Link>
                </div>

                <div className="dashboard-card">
                    <h2>Manage Applications</h2>
                    <p>View applicants and update their application status.</p>
                    <Link to="/recruiter/applications"> View Applications</Link>
                </div>

            </div>

        </div>
        </main>
    </div>
)
}

export default RecruiterDashboard