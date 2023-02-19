import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface BadgePrimaryProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function BadgePrimary({
  children,
  className,
  onClick,
}: BadgePrimaryProps) {
  return (
    <div
      className={twMerge(
        'rounded-primary min-h-[60px] w-[150px] hover:brightness-90 transition-all cursor-pointer flex justify-center items-center text-default font-medium bg-[#F6F3F3]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
