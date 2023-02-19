import type { ReactNode } from 'react'
import Modal from 'react-modal'

import { IconXMark } from '../icon'

interface ModalInfoProps {
  isOpen: boolean
  toggleModal: () => void
  titleModal: string
  children: ReactNode
}

export default function ModalInformation(props: ModalInfoProps) {
  const { isOpen = false, toggleModal, children, titleModal } = props

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-all"
      ariaHideApp={false}
      className="w-4/5 max-w-md bg-white rounded-[16px] p-4 outline-none relative max-h-[90vh] overflow-y-auto shadow-sdprimary"
      contentLabel="Example Modal"
    >
      <div
        className="absolute flex items-center justify-center transition-all rounded-full cursor-pointer w-7 h-7 top-4 right-5 hover:bg-gray-300"
        onClick={toggleModal}
        data-cy="btnClose"
      >
        <IconXMark />
      </div>
      <h2 className="text-xl font-semibold">{titleModal}</h2>
      <div className="mt-4">{children}</div>
    </Modal>
  )
}
