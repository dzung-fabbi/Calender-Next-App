import { useState } from 'react'

import calendarSchedule from '@/api/calendar-schedule.api'
import { Button } from '@/components/button'
import { TitlePage } from '@/components/common'
import { ModalContact } from '@/components/modal'
import { useToggle } from '@/hooks'
import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { BoxSelectDate, BoxSelectInfo } from '@/modules/canlendar-schedule'
import { useStore } from '@/store/useStore'

const CalendarSchedule: NextPageWithLayout = () => {
  const currentDate = useStore((state) => state.currentDate)
  const day = currentDate.format('DD')
  const month = currentDate.format('MM')
  const year = currentDate.format('YYYY')
  const [isOpenModal, toogleModal] = useToggle(false)
  const [goodDays, setGoodDays] = useState<any>([])
  const [work, setWork] = useState<any>('')

  return (
    <>
      <TitlePage>Nhập khoảng thời gian</TitlePage>
      <div className="flex flex-col gap-y-9">
        <BoxSelectInfo setGoodDays={setGoodDays} setWork={setWork} />
        <BoxSelectDate goodDays={goodDays} />
      </div>
      {goodDays.length > 0 && (
        <div className="mt-5 flex justify-center">
          <Button onClick={toogleModal} className="w-[145px]" primary>
            Đặt lịch
          </Button>
        </div>
      )}

      <ModalContact
        isOpen={isOpenModal}
        toggleModal={toogleModal}
        titleModal="Xác nhận đặt ngày"
        onSubmit={(data: any) => {
          const body = {
            ...data,
            work,
            date: `${year}-${month}-${day}`,
          }
          calendarSchedule
            .bookCalendar(body)
            .then(() => {
              toogleModal(false)
            })
            .catch(() => {})
        }}
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
