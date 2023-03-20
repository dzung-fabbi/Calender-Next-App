import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface BadgePrimaryProps {
  children: ReactNode
  className?: string
  isActive?: boolean
  onClick?: () => void
}

export default function BadgePrimary({
  children,
  className,
  isActive = false,
  onClick,
}: BadgePrimaryProps) {
  return (
    <div
      className={twMerge(
        'rounded-primary min-h-[3.75rem] min-w-[9.375rem] hover:brightness-90 transition-all cursor-pointer flex justify-center items-center text-default font-medium bg-gray-bgBtn',
        isActive && 'bg-green-btn text-white',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
