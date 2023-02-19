import type { ReactNode } from 'react'

export interface TitlePageProps {
  children: ReactNode
}

export default function TitlePage({ children }: TitlePageProps) {
  return (
    <h2 className="mb-25px font-semibold text-center text-[26px]">
      {children}
    </h2>
  )
}
