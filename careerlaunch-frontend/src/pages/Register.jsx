import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../services/api'
import '../styles/Register.css'

const Register = () => {

const [fullName, setFullName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [role, setRole] = useState('JOB_SEEKER')
const [message, setMessage] = useState('')

const handleRegister = async(e) => {
    e.preventDefault()

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword)
    {
        setMessage('Please fill in all fields.')
        return
    }

    if (fullName.trim().length < 3) {
        setMessage('Full name must contain at least 3 characters.')
        return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email.trim())) {
        setMessage('Please enter a valid email address.')
        return
    }

    if (password.length < 6) {
        setMessage('Password must contain at least 6 characters.')
        return
    }

    if (password.trim().length === 0) {
        setMessage('Password cannot contain only spaces.')
        return
    }

    if (password !== confirmPassword) {
        setMessage('Passwords do not match.')
        return
    }

    try {
        const user = {
            fullName: fullName,
            email: email,
            password: password,
            role: role
        }

        const response = await registerUser(user)

        setMessage(response)
        setFullName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setRole('JOB_SEEKER')

    } catch (error) {
         const errorMessage = error.response?.data

         setMessage(typeof errorMessage === 'string' ? errorMessage : 'Registration failed. Please try again.' )
    }
}
  return (
    <div className="register-page">

        <div className="register-card">

            <Link to="/" className="register-logo"> CareerLaunch </Link>
            <h1>Create Your Account</h1>
            <p className="register-subtitle"> Start your journey towards your dream career. </p>

            <form onSubmit={handleRegister}>

                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password</label>
                <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                <label>Confirm Password</label>
                <input type="password" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <label>Register As</label>
                <select  value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="JOB_SEEKER">Job Seeker</option>
                    <option value="RECRUITER">Recruiter</option>
                </select>

                <button type="submit"> Create Account </button>

            </form>

            {message && (
                <p className="register-message">
                    {message}
                </p>
            )}

            <p className="register-footer">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>

            <Link to="/" className="register-back-home"> ← Back to Home </Link>

        </div>

    </div>
  )
}

export default Register