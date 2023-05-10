import type { AlertColor } from '@mui/material'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { StateCreator } from 'zustand'

import type { MyState } from './useStore'

type MessageProp = {
  type: AlertColor | undefined
  message: string
}

export interface ICommonSlice {
  tabHeader: number
  setTabHeader: (value: number) => void
  currentDate: Dayjs
  setCurrentDate: (value: Dayjs) => void
  isMobile: boolean
  setIsMobile: (value: boolean) => void
  openSnackbar: boolean
  setOpenSnackbar: (value: boolean) => void
  messageInfo: MessageProp
  setMessageInfo: (value: MessageProp) => void
}
export const createCommonSlice: StateCreator<MyState, [], [], ICommonSlice> = (
  set
) => ({
  tabHeader: 1,
  currentDate: dayjs(),
  isMobile: false,
  openSnackbar: false,
  messageInfo: { type: undefined, message: '' },
  setTabHeader: (value: number) =>
    set((state) => ({ ...state, tabHeader: value })),
  setCurrentDate: (value: Dayjs) =>
    set((state) => ({ ...state, currentDate: value })),
  setIsMobile: (value: boolean) =>
    set((state) => ({ ...state, isMobile: value })),
  setOpenSnackbar: (value: boolean) =>
    set((state) => ({ ...state, openSnackbar: value })),
  setMessageInfo: (value: MessageProp) =>
    set((state) => ({ ...state, messageInfo: value, openSnackbar: true })),
})
