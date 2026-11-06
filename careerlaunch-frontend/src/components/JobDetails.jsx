import React, { useEffect, useState } from 'react'
import { applyForJob, getMyApplications, updateJob, deleteJob} from '../services/api'

const JobDetails = (props) => {

    const role = localStorage.getItem("role")
    const email = localStorage.getItem("email")

    const [appliedJobIds, setAppliedJobIds] = useState([])
    const [successMessage, setSuccessMessage] = useState("")
    const [applyingId, setApplyingId] = useState(null)

    const [editingJobId, setEditingJobId] = useState(null)
    const [editForm, setEditForm] = useState({})
    const [saving, setSaving] = useState(false)

    async function getAppliedJobs() {
        try {
            let det = await getMyApplications()
            let ids = det.map((application) => String(application.jobId))
            setAppliedJobIds(ids)

        } catch (error) {
            console.log("Unable to fetch applied jobs:", error)
        }
    }

    useEffect(() => {
        if (role === "JOB_SEEKER") {
            getAppliedJobs()
        }
    }, [])

    async function handleApply(jobId) {
        try {
            setApplyingId(jobId)
            setSuccessMessage("")
            await applyForJob(jobId)
            setAppliedJobIds((previousIds) => [
                ...previousIds,
                String(jobId)
            ])

            setSuccessMessage("Application submitted successfully!")

        } catch (error) {
            let message = error.response?.data || "Unable to apply. Please try again."
            alert(typeof message === "string" ? message : "Unable to apply. Please try again.")
            getAppliedJobs()
        } finally {
            setApplyingId(null)
        }
    }

    function handleEdit(job) {
        setEditingJobId(job.id)
        setEditForm({
            title: job.title || "",
            company: job.company || "",
            location: job.location || "",
            description: job.description || "",
            requiredSkills: job.requiredSkills?.join(', ') || "",
            experienceLevel: job.experienceLevel || ""
        })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setEditForm({
            ...editForm,
            [name]: value
        })
    }

    async function handleUpdate(e) {
        e.preventDefault()
        try {
            setSaving(true)
            const updatedJob = {
                ...editForm,
                requiredSkills: editForm.requiredSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== "")
            }

            await updateJob(editingJobId, updatedJob)
            setEditingJobId(null)
            setSuccessMessage("Job updated successfully!")
             await props.onJobChanged()

        } catch (error) {
            console.log("Error updating job:", error)
            alert("Unable to update job. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(jobId) {

        const confirmDelete = window.confirm( "Are you sure you want to delete this job?" )

        if (!confirmDelete) {
            return
        }

        try {
            await deleteJob(jobId)
            setSuccessMessage("Job deleted successfully!")
            await props.onJobChanged()
        } catch (error) {
            console.log("Error deleting job:", error)
            alert("Unable to delete job. Please try again.")
        }
    }

 return (
        <section className="jobs-section">

            {successMessage && (
                <p className="success-message">
                    ✓ {successMessage}
                </p>
            )}

            {props.details.length === 0 ? (
                <div className="empty-message">
                    No jobs available yet. Check back soon!
                </div>
            ) : (
                <div className="jobs-grid">

                    {props.details.map((job) => {

                        const alreadyApplied = appliedJobIds.includes(String(job.id))
                        const isOwner = role === "RECRUITER" && job.recruiter?.email === email
                        return (
                            <article className="job-card" key={job.id}>
                                {editingJobId === job.id ? (

                                    <form onSubmit={handleUpdate}>
                                        <h3>Edit Job</h3>
                                        <input type="text" name="title" placeholder="Job Title" value={editForm.title} onChange={handleChange} required />
                                        <input type="text" name="company" placeholder="Company" value={editForm.company} onChange={handleChange} required />
                                        <input type="text" name="location" placeholder="Location" value={editForm.location} onChange={handleChange} required />
                                        <textarea name="description" placeholder="Job Description" value={editForm.description} onChange={handleChange} required />
                                        <input type="text" name="requiredSkills" placeholder="Required Skills (comma separated)" value={editForm.requiredSkills} onChange={handleChange}/>
                                        <input type="text" name="experienceLevel" placeholder="Experience Level" value={editForm.experienceLevel} onChange={handleChange} />
                                        <button type="submit" disabled={saving}> {saving ? "Saving..." : "Save Changes"}</button>
                                        <button type="button" onClick={() => setEditingJobId(null)} > Cancel </button>
                                    </form>
                                ) : (
                                    <>

                                        <h3>{job.title}</h3>
                                        <p className="company-name"> {job.company} </p>
                                        <div className="job-meta">
                                            <span className="job-tag"> 📍 {job.location} </span>
                                            <span className="job-tag"> {job.experienceLevel || 'Not specified'}</span>
                                        </div>
                                        <p className="job-description"> {job.description} </p>
                                        <p className="skills-list">
                                            <strong>Required skills:</strong>
                                            {' '}
                                            {job.requiredSkills?.join(', ')}
                                        </p>

                                        {role === "JOB_SEEKER" && (
                                            <button
                                                className={`apply-btn ${alreadyApplied ? "applied-btn" : ""}`}
                                                disabled={alreadyApplied || applyingId === job.id}
                                                onClick={() => handleApply(job.id)}
                                            >
                                                {applyingId === job.id
                                                    ? "Applying..." : alreadyApplied ? "Applied ✓"  : "Apply Now"}
                                            </button>
                                        )}

                                        {isOwner && (
                                            <div className="job-management-actions">
                                                <button onClick={() => handleEdit(job)} > Edit Job </button>
                                                <button onClick={() => handleDelete(job.id)} > Delete Job </button>
                                            </div>
                                        )}

                                    </>

                                )}

                            </article>
                        )
                    })}

                </div>
            )}

        </section>
    )
}

export default JobDetails
