import type { Category, ResultResponse } from '@/models'

import axiosClient from './axios-client'

const categoryApi = {
  async getAll({ page = 1 }: { page: number }) {
    const url = '/category'
    const res = await axiosClient.get<ResultResponse<Category[]>>(url, {
      params: {
        page,
      },
    })
    return res.data
  },
  async getById(id: string) {
    const url = `/category/${id}/`
    const res = await axiosClient.get<ResultResponse<Category>>(url)
    return res.data
  },
}

export default categoryApi
