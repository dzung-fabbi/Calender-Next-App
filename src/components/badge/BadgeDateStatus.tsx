import * as React from 'react'
import { twMerge } from 'tailwind-merge'

interface BadgeDateStatusProps {
  children: React.ReactNode
  isBeatifulDay?: boolean
}
export default function BadgeDateStatus({
  children,
  isBeatifulDay = false,
}: BadgeDateStatusProps) {
  return (
    <div
      className={twMerge(
        'rounded-xl bg-white border-[1.34px] border-[#F0F0F0] min-h-[2.75rem] min-w-[5.625rem] flex justify-center items-center',
        isBeatifulDay &&
          'border-[#D8464C] bg-[#FDD5CE] min-h-[3.125rem] min-w-[9.375rem]'
      )}
    >
      <span
        className={twMerge(
          'text-sm text-gray-primary',
          isBeatifulDay && 'text-lg text-[#D63C44] font-semibold'
        )}
      >
        {children}
      </span>
    </div>
  )
}
