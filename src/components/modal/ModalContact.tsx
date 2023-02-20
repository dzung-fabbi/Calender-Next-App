import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { IconEmail, IconPhone } from '../icon'
import ModalInformation from './ModalInfo'

export interface ModalContactProps {
  isOpen: boolean
  toggleModal: () => void
  titleModal: string
  onSubmit?: () => void
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
      <p className="mt-5 text-[#2F3A4C] text-sm text-center px-2">
        Nhập Email hoặc số điện thoại của bạn, hệ thống sẽ nhắc nhở bạn khi đến
        ngày.
      </p>
      <div className="flex justify-center mt-5">
        <div
          className="inline-flex shadow rounded-primary bg-gray-bgBtn"
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
        <div className="absolute -translate-y-1/2 left-3 top-1/2">
          {mode === MODE.EMAIL ? <IconEmail /> : <IconPhone />}
        </div>
        <input
          type="text"
          id="contact"
          className="pl-11 p-3 mt-3 w-full leading-[22px] border border-[#EAECEA] outline-none text-sm focus:ring-2 focus:border-transparent focus:ring-primary placeholder:text-[#A6B1BE] rounded-lg block"
          placeholder={
            mode === MODE.EMAIL ? LABEL_INPUT.email : LABEL_INPUT.phone
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        ></input>
      </div>

      <div className="flex items-center justify-end mt-5 gap-x-4">
        <button
          className="px-6 transition-all hover:text-primary-swarthy text-primary"
          onClick={toggleModal}
        >
          Quay lại
        </button>
        <button
          className="h-[3.5rem] btn btn-primary w-[145px]"
          onClick={onSubmit}
        >
          Gửi
        </button>
      </div>
    </ModalInformation>
  )
}
