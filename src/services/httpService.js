import axios from 'axios'

const serverUrl = 'http://localhost:8080'
const http = axios.create({
  baseURL: serverUrl,
})

// Add a request interceptor
http.interceptors.request.use(
  config => {
    // Do something before request is sent
    config.headers = {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    }

    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
http.interceptors.response.use(
  response => {
    // Do something with response data
    return response
  },
  error => {
    // Do something with response error
    if (error.request) {
      const responseCode = error.response.status
      // the token is not valid, redirect to login
      if (responseCode === 401) {
        sessionStorage.removeItem('token')
        window.location.reload()
        return
      }
    }
    return Promise.reject(error)
  },
)

export { http, serverUrl }
