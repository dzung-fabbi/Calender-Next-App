import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { StateCreator } from 'zustand'

import type { MyState } from './useStore'

export interface ICommonSlice {
  tabHeader: number
  setTabHeader: (value: number) => void
  currentDate: Dayjs
  setCurrentDate: (value: Dayjs) => void
  isMobile: boolean
  setIsMobile: (value: boolean) => void
}
export const createCommonSlice: StateCreator<MyState, [], [], ICommonSlice> = (
  set
) => ({
  tabHeader: 1,
  currentDate: dayjs(),
  isMobile: false,
  setTabHeader: (value: number) =>
    set((state) => ({ ...state, tabHeader: value })),
  setCurrentDate: (value: Dayjs) =>
    set((state) => ({ ...state, currentDate: value })),
  setIsMobile: (value: boolean) =>
    set((state) => ({ ...state, isMobile: value })),
})
