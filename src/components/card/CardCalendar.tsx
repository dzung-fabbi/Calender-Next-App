import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ICardProps {
  children: ReactNode
  className?: string
}

export default function CardCalendar({ children, className = '' }: ICardProps) {
  return (
    <div
      className={twMerge(
        'bg-white rounded-30px shadow py-8 px-2.5 sm:px-4 md:px-6 xl:px-2.5 text-center',
        className
      )}
    >
      {children}
    </div>
  )
}
