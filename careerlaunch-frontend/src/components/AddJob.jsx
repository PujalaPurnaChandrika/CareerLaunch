import React, { useState } from 'react'
import { addJob } from '../services/api'
const AddJob = ({onJobAdded}) => {
  const [job, setJob] = useState({title: '', company: '', location: '', description: '', requiredSkills: '', experienceLevel: 'Fresher'})
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const {name, value} = e.target
    setJob({
       ...job, [name]: value
    })
  }

  async function handleSubmit(e) {
      e.preventDefault() 
      setMessage('')
      setError('')

      if(!job.title.trim() || !job.company.trim() || !job.location.trim() || !job.description.trim() || !job.requiredSkills.trim())
      {
          setError('Please fill in all fields. ')
          return
      }

      const skills = job.requiredSkills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill !== '')

      const uniqueSkills = [...new Set(skills.map(skill => skill.toLowerCase()))]

      if (uniqueSkills.length !== skills.length) 
      {
          setError('Please remove duplicate skills.')
          return
      }

      const jobData = {
          ...job,
          title: job.title.trim(),
          company: job.company.trim(),
          location: job.location.trim(),
          description: job.description.trim(),
          requiredSkills: skills
      }

      if(jobData.requiredSkills.length === 0) 
      {
        setError('Please enter atleast one Required Skill.')
        return
      }

      try{
        setLoading(true)
        await addJob(jobData)
        setMessage('Job added successfully!')
        setJob({
          title: '',
          company: '',
          location: '',
          description: '',
          requiredSkills: '',
          experienceLevel: 'Fresher'
        })

        if(onJobAdded) {
          await onJobAdded()
        }

      } catch(err) {
      
      console.log("ADD JOB ERROR:", err)
      console.log("SERVER RESPONSE:", err.response?.data)
      setError(
          err.response?.data?.message ||
          err.message ||
          'Unable to add job. Please try again.'
       )
      } finally {
          setLoading(false)
      }

  }
  
return (
  <section className="add-job-section">
    <h2>Post a New Job</h2>

    {message && (
      <p className="form-message success">{message}</p>
    )}

    {error && (
      <p className="form-message error">{error}</p>
    )}

    <form className="add-job-form" onSubmit={handleSubmit}>

      <div className="form-group">
        <label>Job Title</label>
        <input type="text" name="title" value={job.title} onChange={handleChange} placeholder="e.g. Java Full Stack Developer" required />
      </div>

      <div className="form-group">
        <label>Company Name</label>
        <input type="text" name="company" value={job.company} onChange={handleChange} placeholder="Enter Company Name" required />
      </div>

      <div className="form-group">
        <label>Location</label>
        <input type="text" name="location" value={job.location} onChange={handleChange} placeholder="e.g. Hyderabad" required />
      </div>

      <div className="form-group">
        <label>Experience Level</label>
        <select name="experienceLevel" value={job.experienceLevel} onChange={handleChange} required >
          <option value="Fresher">Fresher</option>
          <option value="Entry Level">Entry Level</option>
          <option value="Experienced">Experienced</option>
        </select>
        
      </div>

      <div className="form-group full-width">
        <label>Job Description</label>
        <textarea name="description" value={job.description} onChange={handleChange} placeholder="Describe the job opportunity" rows="4" required />
      </div>

      <div className="form-group full-width">
        <label>Required Skills</label>
        <input type="text" name="requiredSkills" value={job.requiredSkills} onChange={handleChange} placeholder="Java, SQL, Spring Boot, React" required />
        <small>Separate skills using commas.</small>
      </div>

      <button type="submit" className="submit-job-button" disabled={loading}> {loading ? "Adding Job..." : "Add Job"} </button>

    </form>
  </section>
)
}

export default AddJob