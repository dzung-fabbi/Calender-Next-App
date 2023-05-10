import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = `${process.env.BASE_URL}`
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptors
axiosClient.interceptors.request.use((config) => {
  // Do something before request is sent
  const accessToken = Cookies.get('access_token')
  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const { config, data, status } = error.response
    // if (config.url === '/users' && status === 400) {
    //   const listError = data.username || []
    //   const mesError = listError[0]
    //   throw new Error(mesError)
    // }
    // if (config.url === '/login/' && status === 401) {
    //   const mesError = data.detail
    //   throw new Error(mesError)
    // }
    return Promise.reject(error)
  }
)

export default axiosClient
