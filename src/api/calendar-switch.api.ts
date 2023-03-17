import type { ResultResponse } from '@/models'

import axiosClient from './axios-client'

const getDateByTietKhi = {
  async getInfo(tietkhi: string) {
    const url = `/api/tiet-khi?tiet_khi=${tietkhi}`
    const res = await axiosClient.get<ResultResponse<any>>(url)
    return res.data
  },
}

export default getDateByTietKhi
