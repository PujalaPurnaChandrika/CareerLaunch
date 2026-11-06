import axios from 'axios'

const url = "http://localhost:8080/api"

const api = axios.create({
    baseURL: url
})

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

async function fetchJobs() {
    let det = await api.get("/jobs")
    return det.data
}

async function applyForJob(jobId) {
    let det = await api.post(`/applications/${jobId}/apply`)
    return det.data
}

async function addJob(job) {
    let det = await api.post("/jobs", job)
    return det.data
}

async function updateJob(jobId, job) {
    let det = await api.put(`/jobs/${jobId}`, job)
    return det.data
}

async function deleteJob(jobId) {
    let det = await api.delete(`/jobs/${jobId}`)
    return det.data
}

async function registerUser(user) {
    let det = await api.post("/users/register", user)
    return det.data
}

async function loginUser(user) {
    let det = await axios.post(`${url}/users/login`, user)
    return det.data
}

async function getRecruiterApplications() {
    let det = await api.get("/applications/recruiter-applications")
    return det.data
}

async function updateApplicationStatus(applicationId, status) {
    let det = await api.patch( `/applications/${applicationId}/status?status=${status}` )
    return det.data
}

async function getMyApplications() {
    let det = await api.get("/applications/my-applications")
    return det.data
}

export { fetchJobs, addJob, updateJob, deleteJob, registerUser,
         loginUser,getRecruiterApplications, updateApplicationStatus,
          applyForJob, getMyApplications }
