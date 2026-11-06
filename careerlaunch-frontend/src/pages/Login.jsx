
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'
import '../styles/Login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    
    const handleLogin = async (e) => {
        e.preventDefault()

        if (!email.trim() || !password) {
        setMessage('Please enter both email and password.')
        return
    }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailPattern.test(email.trim())) {
            setMessage('Please enter a valid email address.')
            return
        }

        if (password.trim().length === 0) {
            setMessage('Password cannot contain only spaces.')
            return
        }

    try {
        setLoading(true)
        setMessage('')

        let token = await loginUser({
            email: email.trim(),
            password: password
        })

        console.log("Login token received:", token.substring(0, 10))

        localStorage.setItem('token', token)

        let payload = token.split('.')[1]
        let decodedPayload = atob(
            payload.replace(/-/g, '+').replace(/_/g, '/')
        )

        let user = JSON.parse(decodedPayload)

        localStorage.setItem('role', user.role)
        localStorage.setItem('email', user.sub)

        setMessage('Login successful!')

        if (user.role === 'JOB_SEEKER') {
            navigate('/job-seeker-dashboard')
        } 
        else if (user.role === 'RECRUITER') {
            navigate('/recruiter-dashboard')
        }

    } catch (error) {
        console.log(error)
        setMessage(
            error.response?.data || 'Invalid email or password.'
        )
    } finally {
        setLoading(false)
    }
}

    return (
        <div className="login-page">
            <div className="login-card">

                <Link to="/" className="login-logo"> CareerLaunch </Link>
                <h1>Welcome Back!</h1>
                <p className="login-subtitle"> Continue your journey towards your dream career. </p>

                <form onSubmit={handleLogin}>

                    <label>Email Address</label>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" disabled={loading}> {loading ? 'Signing In...' : 'Sign In'} </button>

                </form>

                {message && (
                    <p className="login-message">{message}</p>
                )}

                <p className="login-footer">
                    Don't have an account?{' '}
                    <Link to="/register">Create Account</Link>
                </p>

                <Link to="/" className="back-home"> ← Back to Home </Link>

            </div>
        </div>
    )
}

export default Login
