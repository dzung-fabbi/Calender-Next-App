import * as React from 'react'
import { twMerge } from 'tailwind-merge'

interface TabProps {
  tabActive: number
}
const LIST_TAB = [
  {
    label: 'Ngày dương',
    tabValue: 1,
  },
  {
    label: 'Ngày âm',
    tabValue: 2,
  },
  {
    label: 'Tiết khí',
    tabValue: 3,
  },
  {
    label: 'Can chi',
    tabValue: 4,
  },
]
export default function TabPrimary({ tabActive }: TabProps) {
  return (
    <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-secondary">
      <ul className="flex flex-wrap gap-4">
        {LIST_TAB.map(({ label, tabValue }) => {
          return (
            <li key={tabValue}>
              <a
                href="#"
                className={twMerge(
                  'inline-block p-2 font-semibold transition-all border-b-2 border-transparent rounded-t-lg hover:text-default hover:border-default',
                  tabValue === tabActive && 'text-default border-default'
                )}
              >
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
