import { TitlePage } from '@/components/common'
import ModalContact from '@/components/modal/ModalContact'
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
      <div className="flex justify-center mt-5 ">
        <button className="w-[145px] btn btn-primary" onClick={toogleModal}>
          Đặt lịch
        </button>
      </div>

      <ModalContact
        isOpen={isOpenModal}
        toggleModal={toogleModal}
        titleModal="Xác nhận đặt ngày"
        onSubmit={() => {}}
      />
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
