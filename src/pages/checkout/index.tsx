import HistoryIcon from '@mui/icons-material/History'
import Tooltip from '@mui/material/Tooltip'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'

import homeApi from '@/api/home.api'
import { ButtonBank } from '@/components/button'
import { TextCopy } from '@/components/common'
import { ModalInformation } from '@/components/modal'
import { useToggle } from '@/hooks'
import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'

interface BankInfo {
  account_number: string | null
  account_holder: string | null
  bank: string | null
  branch: string | null
}

const Checkout: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isOpenQR, toggleModalQR] = useToggle(false)
  const [bankInfo, setBankInfo] = useState<BankInfo>({
    account_number: '',
    account_holder: '',
    bank: '',
    branch: '',
  })
  const [bankList, setBankList] = useState([])
  const [code, setCode] = useState<string>('')

  useEffect(() => {
    fetch('https://api.vietqr.io/v2/banks')
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setBankList(json.data)
      })
    homeApi
      .getBankInfo()
      .then((res) => {
        setBankInfo(res.data.bank)
        setCode(res.data.code)
      })
      .catch(() => {})
  }, [])
  const bank =
    bankList.some((el: any) => el.code === bankInfo.bank) &&
    (bankList.find((el: any) => el.code === bankInfo.bank) as any)
  return (
    <section>
      <h3 className="text-4xl font-bold text-primary">
        Hướng dẫn thanh toán để sử dụng VIP
      </h3>
      <div className="grid grid-cols-1 gap-5 mt-8 lg:grid-cols-3 2xl:gap-10 2xl:grid-cols-2">
        <div className="p-6 2xl:p-9 rounded-[20px] bg-[#F6F7FB] lg:col-span-2 2xl:col-span-1">
          <div className="flex items-center">
            <HistoryIcon className="w-8 h-8 text-primary" />
            <h3 className="ml-2 text-2xl font-bold text-primary">
              Vui lòng thanh toán để hoàn tất
            </h3>
          </div>
          <div className="mt-6">
            <h5 className="text-lg">{bank.name}</h5>
            <ButtonBank className="mt-6">
              <img src={bank.logo} alt="Bank" />
            </ButtonBank>
          </div>
          <div className="p-5 mt-6 bg-white rounded-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <h4 className="font-semibold uppercase text-gray-label-checkout">
                  SỐ TIỀN CẦN THANH TOÁN
                </h4>
                <div className="mt-2.5">
                  <TextCopy className="text-2xl font-semibold text-green-700">
                    799,000đ
                  </TextCopy>
                </div>
              </div>
              <div>
                <h4 className="font-semibold uppercase text-gray-label-checkout">
                  NỘI DUNG CHUYỂN KHOẢN
                </h4>
                <div className="mt-2.5">
                  <TextCopy className="text-2xl font-semibold text-primary-swarthy">
                    {code}
                  </TextCopy>
                </div>
              </div>
              <div className="col-span-2">
                <div className="py-2.5 px-4 rounded-md font-semibold bg-[#F0F0F0]">
                  Chuyển đúng số tiền & nội dung giúp đơn hàng được kích hoạt tự
                  động
                </div>
              </div>
            </div>
            <hr className="my-5" />
            <div>
              <h4 className="font-semibold uppercase text-gray-label-checkout">
                Mã QR
              </h4>
              <Tooltip title="Click để xem mã QR">
                <div
                  className="mt-2.5 h-36 flex justify-center cursor-pointer"
                  onClick={toggleModalQR}
                >
                  <img
                    src="https://cafetaichinh.com/wp-content/uploads/2021/06/CAFETAICHINH-QR-PIC.jpg"
                    alt="Ma QR"
                    className="h-full transition-all rounded shadow hover:shadow-lg hover:brightness-95"
                  />
                </div>
              </Tooltip>
            </div>
            <hr className="my-5" />
            <div>
              <h4 className="font-semibold uppercase text-gray-label-checkout">
                SỐ TÀI KHOẢN
              </h4>
              <div className="mt-2.5">
                <TextCopy className="text-lg font-semibold">
                  {bankInfo.account_number}
                </TextCopy>
              </div>
            </div>
            <hr className="my-5" />
            <div>
              <h4 className="font-semibold uppercase text-gray-label-checkout">
                TÊN TÀI KHOẢN
              </h4>
              <div className="mt-2.5">
                <TextCopy className="text-lg font-semibold">
                  {bankInfo.account_holder}
                </TextCopy>
              </div>
            </div>
            <hr className="my-5" />
            <div>
              <h4 className="font-semibold uppercase text-gray-label-checkout">
                CHI NHÁNH
              </h4>
              <div className="mt-2.5">
                <TextCopy className="text-lg font-semibold">
                  {bankInfo.branch}
                </TextCopy>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-[20px] border border-gray-300 h-fit flex flex-col gap-y-3">
          <div className="flex gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-label-checkout">
                Xem lại đơn hàng
              </h4>
              <p className="mt-2.5 text-lg">UQXIDH</p>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-label-checkout">
                Phương thức thanh toán
              </h4>
              <p className="mt-2.5 text-lg">Chuyển khoản</p>
            </div>
          </div>
          <div className="bg-[#F6F7FB] px-4 py-2.5 rounded-md">
            <h4 className="font-semibold text-gray-label-checkout">
              Khách hàng
            </h4>
            <div className="mt-2.5">
              <h3 className="text-2xl font-bold">{session?.user.name}</h3>
              <p className="text-lg">{session?.user.email}</p>
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <div>
              <img
                src={`${router.basePath}/images/mobile_logo.png`}
                className="w-full"
                alt=""
              />
            </div>

            <div>
              <p className="mb-2 text-lg font-bold text-gray-primary">
                Đăng kí thành viên VIP
              </p>

              <div className="relative w-fit">
                <span className="text-gray-label-checkout">799,000đ</span>
                <div className="absolute -translate-y-1/2 w-11 top-1/2 left-full">
                  <img
                    src={`${router.basePath}/images/logo_vip.png`}
                    className="w-full"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="flex rounded-b-[20px] items-center justify-center text-xl text-primary mt-4 bg-[#DEE1F3] py-4 font-bold -mx-6 -mb-6">
            Tổng cộng: 799,000đ
          </p>
        </div>
        <p className="px-4">
          Bạn có thắc mắc ? Liên hệ ngay:{' '}
          <span className="text-primary">0339387373</span>
        </p>
      </div>
      <ModalInformation isOpen={isOpenQR} toggleModal={toggleModalQR}>
        <img
          src="https://cafetaichinh.com/wp-content/uploads/2021/06/CAFETAICHINH-QR-PIC.jpg"
          alt=""
        />
      </ModalInformation>
    </section>
  )
}
Checkout.getLayout = function getLayout(page: ReactElement) {
  return (
    <Main
      meta={
        <Meta
          title="Thông tin chuyển khoản"
          description="Thông tin chuyển khoản"
        />
      }
      isCalendar={false}
    >
      {page}
    </Main>
  )
}

export default Checkout
