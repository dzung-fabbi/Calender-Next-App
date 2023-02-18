import clsx from 'clsx'
import type { ReactNode } from 'react'

interface LabelProps {
  htmlFor?: string
  children: ReactNode
  className?: string
}

export default function Label({ htmlFor, className, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        className,
        'text-default inline-block self-start text-sm font-normal cursor-pointer'
      )}
    >
      {children}
    </label>
  )
}
