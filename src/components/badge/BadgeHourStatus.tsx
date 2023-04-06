import * as React from 'react'
import { twMerge } from 'tailwind-merge'

interface BadgeHourStatusProps {
  children: React.ReactNode
  isBeatifulDay?: boolean
}
export default function BadgeHourStatus({
  children,
  isBeatifulDay = false,
}: BadgeHourStatusProps) {
  return (
    <div
      className={twMerge(
        'rounded-xl transition-all bg-white border-[1.34px] border-[#F0F0F0] min-h-[20px] min-w-[70px] lg:min-h-[20px] lg:min-w-[80px] flex justify-center items-center',
        isBeatifulDay && 'border-[#D8464C] bg-[#FDD5CE]'
      )}
    >
      <span
        className={twMerge(
          'text-sm text-gray-primary lg:text-[14px] lg:font-semibold text-center',
          isBeatifulDay && 'text-[#D63C44]'
        )}
      >
        {children}
      </span>
    </div>
  )
}
