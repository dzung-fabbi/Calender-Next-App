import type { AlertColor } from '@mui/material'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { StateCreator } from 'zustand'

import type { MyState } from './useStore'

type MessageProp = {
  type: AlertColor | undefined
  message: string
}

type UserInfo = {
  id: number
  username: string
  user_permissions: any
}

export interface ICommonSlice {
  tabHeader: number
  isGetUser: boolean
  setTabHeader: (value: number) => void
  currentDate: Dayjs
  setCurrentDate: (value: Dayjs) => void
  isMobile: boolean
  setIsMobile: (value: boolean) => void
  openSnackbar: boolean
  setOpenSnackbar: (value: boolean) => void
  messageInfo: MessageProp
  setMessageInfo: (value: MessageProp) => void
  userInfo: UserInfo | null
  setUserInfo: (value: UserInfo | null) => void
}
export const createCommonSlice: StateCreator<MyState, [], [], ICommonSlice> = (
  set
) => ({
  userInfo: null,
  isGetUser: false,
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
  setUserInfo: (value: UserInfo | null) =>
    set((state) => ({ ...state, userInfo: value, isGetUser: true })),
})
