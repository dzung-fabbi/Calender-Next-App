import type { ResultResponse } from '@/models'

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
}

export default homeApi
