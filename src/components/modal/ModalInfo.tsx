import type { ReactNode } from 'react'
import Modal from 'react-modal'

import { IconXMark } from '../icon'

interface ModalInfoProps {
  isOpen: boolean
  toggleModal: () => void
  titleModal?: string
  children: ReactNode
}

export default function ModalInformation(props: ModalInfoProps) {
  const { isOpen = false, toggleModal, children, titleModal = '' } = props

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-all"
      ariaHideApp={false}
      className="relative -top-20 max-h-[90vh] w-4/5 max-w-md overflow-y-auto rounded-[16px] bg-white p-4 shadow-sdprimary outline-none"
      contentLabel="Example Modal"
    >
      <div
        className="absolute flex items-center justify-center transition-all rounded-full cursor-pointer top-4 right-5 h-7 w-7 hover:bg-gray-300"
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
