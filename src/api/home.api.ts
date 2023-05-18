import type {
  ConvertTokenOutput,
  ResultResponse,
  ThanSatFormValue,
} from '@/models'
import {
  BACKEND_FACEBOOK,
  BACKEND_GOOGLE_OAUTH2,
  CONVERT_TOKEN_GRANT_TYPE,
  TYPE_GOOGLE,
} from '@/utils/constant'

import axiosClient from './axios-client'

const homeApi = {
  async getInfo(
    month: number,
    lunarDay: string,
    lunarDate: string,
    tietkhi: string
  ) {
    const url = `/api/home?month=${month}&lunar_day=${lunarDay}&lunar_date=${lunarDate}&tiet_khi=${tietkhi}`
    const res = await axiosClient.get<ResultResponse<any>>(url)
    return res.data
  },
  async getThanSatInfo(year: string) {
    const url = `/api/than-sat?year=${year}`
    const res = await axiosClient.get<ThanSatFormValue>(url)
    return res.data
  },
  async getCalendar(params: any) {
    const url = `/api/calendar?data=${JSON.stringify(params)}`
    const res = await axiosClient.get<ResultResponse<any>>(url)
    return res.data
  },
  async convertTokenSocial(token: string, type: string) {
    const url = `/auth/convert-token`

    const DJANGO_AUTH_CLIENT_ID = `${process.env.DJANGO_AUTH_CLIENT_ID}`
    const DJANGO_AUTH_CLIENT_SECRET = `${process.env.DJANGO_AUTH_CLIENT_SECRET}`
    const data = {
      grant_type: CONVERT_TOKEN_GRANT_TYPE,
      client_id: DJANGO_AUTH_CLIENT_ID,
      client_secret: DJANGO_AUTH_CLIENT_SECRET,
      backend: type === TYPE_GOOGLE ? BACKEND_GOOGLE_OAUTH2 : BACKEND_FACEBOOK,
      token,
    }

    const res = await axiosClient.post<ConvertTokenOutput>(url, data)
    return res.data
  },
  async getConfig() {
    const url = `/api/get-config`
    const res = await axiosClient.get<ResultResponse<any>>(url)
    return res.data
  },
}

export default homeApi
