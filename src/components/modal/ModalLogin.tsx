import { useRouter } from 'next/router'

import { ButtonLogin } from '../button'
import ModalInformation from './ModalInfo'

export interface ModalLoginProps {
  isOpen: boolean
  toggleModal: () => void
  titleModal?: string
  onSubmit?: (type: 'facebook' | 'google') => void
}

export default function ModalLogin({
  isOpen,
  toggleModal,
  titleModal,
  onSubmit,
}: ModalLoginProps) {
  const router = useRouter()
  return (
    <ModalInformation
      isOpen={isOpen}
      toggleModal={toggleModal}
      titleModal={titleModal}
    >
      <div className="h-[500px] relative">
        <div className="flex justify-center">
          <img
            src={`${router.basePath}/apple-touch-icon.png`}
            className="w-20"
            alt="login icon"
          />
        </div>
        <h3 className="text-2xl font-semibold text-center capitalize mt-7">
          Đăng Nhập Tài Khoản của bạn
        </h3>
        <div className="flex flex-col max-w-xs mx-auto mt-10 gap-y-5">
          <ButtonLogin
            className="w-full"
            socialType="google"
            onClick={() => onSubmit?.('google')}
          >
            Tiếp tục với Google
          </ButtonLogin>
          <ButtonLogin
            className="w-full"
            socialType="facebook"
            onClick={() => onSubmit?.('facebook')}
          >
            Tiếp tục với Facebook
          </ButtonLogin>
        </div>
        <div className="absolute bottom-0 w-full">
          <p className="text-center transition-all cursor-pointer hover:text-primary">
            Bạn cần hỗ trợ? <span className="font-semibold">Contact Us</span>
          </p>
        </div>
      </div>
    </ModalInformation>
  )
}
