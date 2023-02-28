import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { StateCreator } from 'zustand'

import type { MyState } from './useStore'

export interface ICommonSlice {
  tabHeader: number
  setTabHeader: (value: number) => void
  currentDate: Dayjs
  setCurrentDate: (value: Dayjs) => void
}
export const createCommonSlice: StateCreator<MyState, [], [], ICommonSlice> = (
  set
) => ({
  tabHeader: 1,
  currentDate: dayjs(),
  setTabHeader: (value: number) =>
    set((state) => ({ ...state, tabHeader: value })),
  setCurrentDate: (value: Dayjs) =>
    set((state) => ({ ...state, currentDate: value })),
})
