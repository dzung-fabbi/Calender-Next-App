import type { MouseEventHandler, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { IconFacebookLogin } from '../icon'

type ButtonLoginProps = {
  children: ReactNode
  className?: string
  socialType: 'facebook' | 'google'
  onClick?: MouseEventHandler<HTMLButtonElement>
} & React.ComponentProps<'button'>

export default function ButtonLogin({
  children,
  type = 'button',
  socialType,
  className,
  ...props
}: ButtonLoginProps) {
  return (
    <button
      type={type}
      {...props}
      onClick={props.onClick}
      className={twMerge(
        'relative rounded-full px-6 py-3 border border-gray-200 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 active:scale-95 font-semibold min-w-[6.875rem] hover:brightness-90 shadow',
        socialType === 'facebook' &&
          'bg-[#3C75EF] hover:bg-[#295ed1] text-white',
        className
      )}
    >
      {children}
      <span className="absolute -translate-y-1/2 top-1/2 left-[6px]">
        {socialType === 'facebook' ? (
          <IconFacebookLogin />
        ) : (
          <img src="/images/icon-google.png" alt="Icon google" />
        )}
      </span>
    </button>
  )
}
