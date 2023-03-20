import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export type InputProps = {
  containerClass?: string
  error?: string
  label: string
} & React.ComponentProps<'input'>

export default function Input({
  name,
  children,
  type = 'text',
  containerClass,
  onChange = () => {},
  className,
  error,
  label,
  ...rest
}: InputProps) {
  return (
    <div className={twMerge('relative', containerClass && `${containerClass}`)}>
      <span className="absolute top-[5px] left-[10px] text-sm text-gray-label-input">
        {label}
      </span>
      <input
        {...rest}
        type={type}
        id={`${name}-id`}
        name={name}
        onChange={onChange}
        className={clsx(className, 'input placeholder:italic', {
          'input-error': error,
          'pr-10': Boolean(children),
        })}
      />
      {children && (
        <div className="absolute right-[.75rem] top-[46%]">{children}</div>
      )}
      {error && (
        <span className="label-text text-error absolute top-full">{error}</span>
      )}
    </div>
  )
}
