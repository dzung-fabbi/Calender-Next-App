import type { ReactNode } from 'react'

export interface TitlePageProps {
  children: ReactNode
}

export default function TitlePage({ children }: TitlePageProps) {
  return (
    <h2 className="mb-25px text-center text-[26px] font-semibold">
      {children}
    </h2>
  )
}
