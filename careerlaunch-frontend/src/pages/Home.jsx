import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

const Home = () => {
  return (
    <div className="home-page">

        <nav className="home-navbar">
            <Link to="/" className="home-logo"> Career<span>Launch</span></Link>
            <div className="home-nav-links">
                 <a href="#features">Features</a>
                 <a href="#about">About</a>
                 <Link to="/login" className="nav-login">Login</Link>
                 <Link to="/register" className="nav-register">Get Started</Link>
            </div>
        </nav>

        <section className="home-hero">
            <div className="hero-content">
                <span className="hero-badge">YOUR CAREER JOURNEY STARTS HERE </span>
                <h1>Your Future. <br /> Your Skills.<br />
                    <span>Your Opportunity.</span>
                </h1>
                <p>Discover opportunities that match your skills, understand what employers expect, and take the next step toward your dream career.</p>

                <div className="hero-buttons">
                    <Link to="/jobs" className="primary-button"> Explore Jobs <span>→</span></Link>
                    <Link to="/register" className="secondary-button"> Create Account </Link>
                </div>

                <div className="hero-trust">
                    <div>
                        <strong>Discover</strong>
                        <span>Career opportunities</span>
                    </div>

                    <div>
                        <strong>Develop</strong>
                        <span>In-demand skills</span>
                    </div>

                    <div>
                        <strong>Achieve</strong>
                        <span>Your career goals</span>
                    </div>
                </div>
            </div>

            <div className="hero-visual">
                <div className="visual-glow"></div>
                <div className="career-card">
                    <div className="card-top">
                    <div>
                        <span className="card-label"> CAREER OPPORTUNITY</span>
                        <h3>Your next chapter</h3>
                    </div>
                        <span className="card-icon">✦</span>
                </div>
                <div className="visual-job">
                  <div className="visual-job-icon">JD</div>
                     <div>
                        <strong>Java Developer</strong>
                        <p>Build. Learn. Grow.</p>
                     </div>
                        <span className="visual-dot"></span>
                     </div>

                     <div className="visual-job">
                         <div className="visual-job-icon purple">UI</div>
                         <div>
                            <strong>Frontend Developer</strong>
                            <p>Create digital experiences</p>
                         </div>
                         <span className="visual-dot"></span>
                     </div>

                     <div className="visual-job">
                        <div className="visual-job-icon green">DB</div>
                        <div>
                            <strong>SQL Developer</strong>
                            <p>Turn data into insights</p>
                        </div>
                        <span className="visual-dot"></span>
                     </div>

                     <div className="visual-footer">
                        <span>✦</span>
                         Every opportunity begins with a step.
                     </div>
                 </div>

                 <div className="floating-note note-one">
                    <span>↗</span>
                     Keep growing
                 </div>

                 <div className="floating-note note-two">
                    <span>✓</span>
                    Skills matter
                </div>
            </div>

            </section>

            <section className="features-section" id="features">
                <div className="features-heading">
                    <span>BUILT FOR YOUR NEXT STEP</span>
                    <h2>More than a job search.</h2>
                    <p>A place to discover opportunities and prepare yourself for the world of work. </p>
                </div>

                <div className="features-grid">
                    <article className="feature-card">
                        <div className="feature-icon blue-icon">⌕</div>
                        <h3>Discover Opportunities</h3>
                        <p>Explore job openings and find roles that match your career interests. </p>
                    </article>

                    <article className="feature-card">
                        <div className="feature-icon purple-icon">✧</div>
                        <h3>Understand Your Skills</h3>
                        <p>Compare your skills with job requirements and identify areas to improve. </p>
                    </article>

                    <article className="feature-card">
                        <div className="feature-icon green-icon">↗</div>
                        <h3>Track Your Progress</h3>
                        <p> Keep your career journey organized as you explore and apply for opportunities. </p>
                    </article>
                </div>
            </section>

            <section className="home-cta" id="about">
                <span>YOUR NEXT CHAPTER STARTS NOW</span>
                <h2>Ready to move your career forward?</h2>
                <p>Create an account and begin exploring your opportunities.</p>

                <Link to="/register" className="primary-button">  Get Started <span>→</span> </Link>
            </section>

            <footer className="home-footer">
                <Link to="/" className="home-logo"> Career<span>Launch</span> </Link>

                <p>Helping you take the next step in your career.</p>
                <span>© 2026 CareerLaunch</span>
            </footer>

        </div>
  )
}

export default Home