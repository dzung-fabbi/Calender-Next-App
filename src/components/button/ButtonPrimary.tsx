import type { MouseEventHandler, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  primary?: boolean
} & React.ComponentProps<'button'>

export default function Button({
  children,
  type = 'button',
  className,
  primary,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      onClick={props.onClick}
      className={twMerge(
        'rounded-btn px-6 py-3 transition-all duration-200 active:scale-95 text-sm font-medium min-w-[6.875rem] bg-secondary shadow',
        primary && 'bg-primary hover:bg-primary-swarthy text-white',
        className
      )}
    >
      {children}
    </button>
  )
}
