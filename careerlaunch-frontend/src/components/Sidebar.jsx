import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/Sidebar.css'

const Sidebar = () => {
    const navigate = useNavigate()
    const role = localStorage.getItem('role')

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('email')
        navigate('/login')
    }

    const seekerLinks = [
        { name: 'Dashboard', path: '/job-seeker-dashboard', icon: '▦' },
        { name: 'Explore Jobs', path: '/jobs', icon: '💼' },
        { name: 'My Applications', path: '/my-applications', icon: '📄' }
    ]

    const recruiterLinks = [
        { name: 'Dashboard', path: '/recruiter-dashboard', icon: '▦' },
        { name: 'Post / Manage Jobs', path: '/jobs', icon: '💼' },
        { name: 'Manage Applications', path: '/recruiter/applications', icon: '📋' }
    ]

    const links = role === 'RECRUITER' ? recruiterLinks : seekerLinks

    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                CareerLaunch
            </div>

            <div className="sidebar-role">
                {role === 'RECRUITER' ? 'Recruiter' : 'Job Seeker'}
            </div>

            <nav className="sidebar-nav">
                {links.map((link) => (
                    <NavLink key={link.path} to={link.path}
                        className={({ isActive }) =>
                            isActive ? 'sidebar-link active' : 'sidebar-link'
                        }
                    >
                        <span className="sidebar-icon">{link.icon}</span>
                        <span>{link.name}</span>
                    </NavLink>
                ))}
            </nav>

            <button className="sidebar-logout" onClick={handleLogout}>
                <span className="sidebar-icon">↪</span>
                Logout
            </button>

        </aside>
    )
}

export default Sidebar
