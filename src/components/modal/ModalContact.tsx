import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '../button'
import { IconEmail, IconPhone } from '../icon'
import ModalInformation from './ModalInfo'

export interface ModalContactProps {
  isOpen: boolean
  toggleModal: () => void
  titleModal: string
  onSubmit?: (data: any) => void
}
const MODE = {
  EMAIL: 'email',
  PHONE: 'phone',
}
const LABEL_INPUT = {
  email: 'Nhập email',
  phone: 'Nhập số điện thoại',
}
export default function ModalContact({
  isOpen,
  toggleModal,
  titleModal,
  onSubmit,
}: ModalContactProps) {
  const [mode, setMode] = useState(MODE.EMAIL)
  const [input, setInput] = useState('')
  return (
    <ModalInformation
      isOpen={isOpen}
      toggleModal={toggleModal}
      titleModal={titleModal}
    >
      <div className="flex justify-center">
        <img src="/images/confirm_info.png" alt="Contact" />
      </div>
      <p className="mt-5 px-2 text-center text-sm text-[#2F3A4C]">
        Nhập Email hoặc số điện thoại của bạn, hệ thống sẽ nhắc nhở bạn khi đến
        ngày.
      </p>
      <div className="mt-5 flex justify-center">
        <div
          className="inline-flex rounded-primary bg-gray-bgBtn shadow"
          role="group"
        >
          <button
            type="button"
            className={twMerge(
              'px-7 py-3 leading-[18px] rounded-primary focus:z-10 focus:ring-2 focus:ring-primary-swarthy transition-all',
              mode === MODE.EMAIL && 'text-white bg-primary'
            )}
            onClick={() => setMode(MODE.EMAIL)}
          >
            Email
          </button>
          <button
            type="button"
            className={twMerge(
              'px-5 py-3 leading-[18px] rounded-primary focus:z-10 focus:ring-2 focus:ring-primary-swarthy transition-all',
              mode === MODE.PHONE && 'text-white bg-primary'
            )}
            onClick={() => setMode(MODE.PHONE)}
          >
            Số điện thoại
          </button>
        </div>
      </div>
      <div className="relative transition-all">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {mode === MODE.EMAIL ? <IconEmail /> : <IconPhone />}
        </div>
        <input
          type="text"
          id="contact"
          className="mt-3 block w-full rounded-lg border border-[#EAECEA] p-3 pl-11 text-sm leading-[22px] outline-none placeholder:text-[#A6B1BE] focus:border-transparent focus:ring-2 focus:ring-primary"
          placeholder={
            mode === MODE.EMAIL ? LABEL_INPUT.email : LABEL_INPUT.phone
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        ></input>
      </div>

      <div className="mt-5 flex items-center justify-end gap-x-4">
        <button
          className="px-6 text-primary transition-all hover:text-primary-swarthy"
          onClick={toggleModal}
        >
          Quay lại
        </button>
        <Button
          primary
          onClick={() => {
            if (onSubmit) {
              let object: any = {
                email: input,
              }
              if (mode === MODE.PHONE) {
                object = {
                  phone: input,
                }
              }
              onSubmit(object)
            }
          }}
          className="h-[3.5rem]"
        >
          Gửi
        </Button>
      </div>
    </ModalInformation>
  )
}
