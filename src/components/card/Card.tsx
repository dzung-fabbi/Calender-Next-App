import type { ReactNode } from 'react'

export interface ICardProps {
  children: ReactNode
}

export default function Card({ children }: ICardProps) {
  return (
    <div className="bg-white rounded-30px shadow py-8 px-2.5 text-center">
      {children}
    </div>
  )
}
