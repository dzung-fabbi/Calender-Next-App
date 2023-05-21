import clsx from 'clsx'
import * as React from 'react'

type InputProfileProps = {
  name: string
  className?: string
  children?: React.ReactNode
  error?: string
  disabled?: boolean
} & React.ComponentProps<'input'>

export default function InputProfile({
  name,
  children,
  className,
  disabled = false,
  ...props
}: InputProfileProps) {
  return (
    <div className="relative">
      <input
        id={name}
        {...props}
        disabled={disabled}
        className={clsx(
          `${className} w-full text-xl py-4 px-6 outline-none placeholder:italic border-none bg-[#eee] text-primary rounded-2xl shadow-[0_0.4rem_#dfd9d9]`,
          {
            'pr-10': children,
          }
        )}
      />
      {children}
    </div>
  )
}
