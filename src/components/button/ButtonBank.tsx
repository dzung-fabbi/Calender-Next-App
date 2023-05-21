import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ButtonBankProps {
  children: ReactNode
  className?: string
}

export default function ButtonBank({ children, className }: ButtonBankProps) {
  return (
    <div
      className={twMerge(
        'p-1 bg-white border border-blue-700 rounded-xl max-w-[180px] flex justify-between items-center',
        className
      )}
    >
      <p>{children}</p>
    </div>
  )
}
