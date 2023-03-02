import type { ResultResponse } from '@/models'

import axiosClient from './axios-client'

const homeApi = {
  async getInfo(month: number, lunarDay: string, lunarDate: string) {
    const url = `/api/home?month=${month}&lunar_day=${lunarDay}&lunar_date=${lunarDate}`
    const res = await axiosClient.get<ResultResponse<any>>(url)
    return res.data
  },
}

export default homeApi
