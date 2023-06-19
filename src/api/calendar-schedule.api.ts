import type { ResultResponse } from '@/models'

import axiosClient from './axios-client'

const calendarSchedule = {
  async getDateByWork(
    work: string,
    start_date: string,
    end_date: string,
    can_chi_start: string,
    month_start: number,
    month_end: number
  ) {
    const url = `/api/get-date-good-by-work?work=${work}&start_date=${start_date}&end_date=${end_date}&can_chi_start=${can_chi_start}&month_start=${month_start}&month_end=${month_end}`
    const res = await axiosClient.get<ResultResponse<any>>(url)
    return res.data
  },

  async bookCalendar(body: any) {
    const url = '/api/book-calendar'
    const res = await axiosClient.post<ResultResponse<any>>(url, body)
    return res.data
  },

  async getAppointmentDate() {
    const url = `/api/appointment-date`
    const res = await axiosClient.get<ResultResponse<any>>(url)
    return res.data
  },

  async appointmentDate(body: any) {
    const url = '/api/appointment-date'
    const res = await axiosClient.post<ResultResponse<any>>(url, body)
    return res.data
  },
}

export default calendarSchedule
