import { TitlePage } from '@/components/common'
import { IconEmail } from '@/components/icon'
import { ModalInformation } from '@/components/modal'
import { useToggle } from '@/hooks'
import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { BoxSelectDate, BoxSelectInfo } from '@/modules/canlendar-schedule'

const CalendarSchedule: NextPageWithLayout = () => {
  const [isOpenModal, toogleModal] = useToggle(false)
  return (
    <>
      <TitlePage>Nhập khoảng thời gian</TitlePage>
      <div className="flex flex-col gap-y-9">
        <BoxSelectInfo />
        <BoxSelectDate />
      </div>
      <div className="flex justify-center">
        <button
          className="mt-5 w-[145px] btn btn-primary"
          onClick={toogleModal}
        >
          Đặt lịch
        </button>
      </div>

      <ModalInformation
        isOpen={isOpenModal}
        toggleModal={toogleModal}
        titleModal="Xác nhận đặt ngày"
      >
        <div className="flex justify-center">
          <img src="/images/confirm_info.png" alt="Contact" />
        </div>
        <p className="mt-5 text-[#2F3A4C] text-sm text-center px-2">
          Nhập Email hoặc số điện thoại của bạn, hệ thống sẽ nhắc nhở bạn khi
          đến ngày.
        </p>
        <div className="flex justify-center mt-5">
          <div
            className="inline-flex rounded-primary shadow bg-[#F6F3F3]"
            role="group"
          >
            <button
              type="button"
              className="py-3 leading-none px-7 text-white bg-primary rounded-primary focus:z-10 focus:ring-2 focus:ring-[#FC3227]"
            >
              Email
            </button>
            <button
              type="button"
              className="px-5 py-3 leading-[18px] rounded-primary focus:z-10 focus:ring-2 focus:ring-[#FC3227]"
            >
              Số điện thoại
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -translate-y-1/2 left-3 top-1/2">
            <IconEmail />
          </div>
          <input
            type="text"
            id="email"
            className="pl-11 p-3 mt-3 w-full leading-[22px] border border-[#EAECEA] outline-none text-sm focus:ring-2 focus:ring-primary placeholder:text-[#A6B1BE] rounded-lg block"
            placeholder="Nhập email"
            required
          ></input>
        </div>

        <div className="flex items-center justify-end mt-5 gap-x-4">
          <button
            className="px-6 transition-all hover:text-red-600 text-primary"
            onClick={toogleModal}
          >
            Quay lại
          </button>
          <button className="h-[3.5rem] btn btn-primary w-[145px]">Gửi</button>
        </div>
      </ModalInformation>
    </>
  )
}

CalendarSchedule.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Main
      meta={
        <Meta
          title="Sắp đặt lịch làm việc"
          description="Sắp đặt lịch làm việc"
        />
      }
    >
      {page}
    </Main>
  )
}

export default CalendarSchedule
