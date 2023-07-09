/* eslint-disable no-underscore-dangle */
import axios from 'axios'
import Cookies from 'js-cookie'
import { signOut } from 'next-auth/react'

import type { ConvertTokenOutput } from '@/models'
import { REFRESH_TOKEN_GRANT_TYPE } from '@/utils/constant'

const BASE_URL = `${process.env.BASE_URL}`
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const refreshAccessToken = async (refresh_token: string) => {
  const url = `/auth/token`
  const DJANGO_AUTH_CLIENT_ID = `${process.env.DJANGO_AUTH_CLIENT_ID}`
  const DJANGO_AUTH_CLIENT_SECRET = `${process.env.DJANGO_AUTH_CLIENT_SECRET}`

  const data = {
    grant_type: REFRESH_TOKEN_GRANT_TYPE,
    client_id: DJANGO_AUTH_CLIENT_ID,
    client_secret: DJANGO_AUTH_CLIENT_SECRET,
    refresh_token,
  }
  const res = await axiosClient.post<ConvertTokenOutput>(url, data)
  return res.data
}

// Interceptors
axiosClient.interceptors.request.use((config) => {
  // Do something before request is sent
  const accessToken = Cookies.get('access_token')
  if (accessToken) {
    if (config.url === '/auth/token') {
      return config
    }
    // eslint-disable-next-line no-param-reassign
    if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalConfig = error.config
    // Access Token was expired

    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true
      const refreshToken = Cookies.get('refresh_token')
      try {
        const res = await refreshAccessToken(refreshToken || '')
        Cookies.set('access_token', res.access_token, {
          expires: res.expires_in,
        })
        Cookies.set('refresh_token', res.refresh_token)

        originalConfig.headers = {
          Authorization: `Bearer ${res.access_token}`,
        }
        // eslint-disable-next-line @typescript-eslint/return-await
        return axiosClient(originalConfig)
      } catch (_error) {
        signOut().then(() => {
          Cookies.remove('access_token')
          Cookies.remove('refresh_token')
        })
        return Promise.reject(_error)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosClient
