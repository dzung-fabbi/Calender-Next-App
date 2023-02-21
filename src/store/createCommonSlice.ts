import type { StateCreator } from 'zustand'

import type { MyState } from './useStore'

export interface ICommonSlice {
  tabHeader: number
  setTabHeader: (value: number) => void
}
export const createCommonSlice: StateCreator<MyState, [], [], ICommonSlice> = (
  set
) => ({
  tabHeader: 1,
  setTabHeader: (value: number) =>
    set((state) => ({ ...state, tabHeader: value })),
})
