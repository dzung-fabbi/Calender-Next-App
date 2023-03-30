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
        'rounded-xl transition-all bg-white border-[1.34px] border-[#F0F0F0] min-h-[2.75rem] min-w-[5.625rem] lg:min-h-[3.125rem] lg:min-w-[9.375rem] flex justify-center items-center',
        isBeatifulDay && 'border-[#D8464C] bg-[#FDD5CE]'
      )}
    >
      <span
        className={twMerge(
          'text-sm text-gray-primary lg:text-lg lg:font-semibold text-center',
          isBeatifulDay && 'text-[#D63C44]'
        )}
      >
        {children}
      </span>
    </div>
  )
}
