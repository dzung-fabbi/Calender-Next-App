import type { MouseEventHandler, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonRegisteMemberProps = {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  primary?: boolean
} & React.ComponentProps<'button'>

export default function ButtonRegisteMember({
  children,
  type = 'button',
  className,
  onClick,
  primary,
  ...props
}: ButtonRegisteMemberProps) {
  return (
    <button
      type={type}
      {...props}
      onClick={onClick}
      className={twMerge(
        'btn-register-member rounded-btn px-6 pr-14 py-4 relative disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 active:scale-95 text-sm font-medium min-w-[6.875rem] bg-secondary shadow',
        primary && 'bg-primary hover:bg-primary-swarthy text-white relative',
        className
      )}
    >
      {children}
      <div className="icon-wrapper absolute flex items-center justify-center w-10 h-10 transition-all duration-300 -translate-y-1/2 bg-white right-2 top-1/2 rounded-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="transition-transform duration-300 text-primary"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill="currentColor"
            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
          ></path>
        </svg>
      </div>
    </button>
  )
}
