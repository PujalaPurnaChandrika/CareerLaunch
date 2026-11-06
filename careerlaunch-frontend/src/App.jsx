import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import FetchJobs from './components/FetchJobs'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import JobSeekerDashboard from './pages/JobSeekerDashboard'
import RecruiterDashboard from './pages/RecruiterDashboard'
import ManageApplications from './pages/ManageApplications'
import MyApplications from './components/MyApplications'


const App = () => {
  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<FetchJobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job-seeker-dashboard" element={<JobSeekerDashboard />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/applications" element={<ManageApplications />} />
          <Route path="/my-applications" element={<MyApplications />} />
       </Routes>
    </BrowserRouter>
  )
}

export default App