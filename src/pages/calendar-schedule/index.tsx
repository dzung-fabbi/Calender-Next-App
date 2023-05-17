import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import calendarSchedule from '@/api/calendar-schedule.api'
import { Button } from '@/components/button'
import { TitlePage } from '@/components/common'
import { ModalContact } from '@/components/modal'
import { useToggle } from '@/hooks'
import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { BoxSelectDate, BoxSelectInfo } from '@/modules/canlendar-schedule'
import AppointmentDate from '@/modules/canlendar-schedule/AppointmentDate'
import { useStore } from '@/store/useStore'
import { MESSAGES } from '@/utils/constant'

const CalendarSchedule: NextPageWithLayout = () => {
  const setMessageInfo = useStore((state) => state.setMessageInfo)
  const currentDate = useStore((state) => state.currentDate)
  const day = currentDate.format('DD')
  const month = currentDate.format('MM')
  const year = currentDate.format('YYYY')
  const [isOpenModal, toogleModal] = useToggle(false)
  const [goodDays, setGoodDays] = useState<any>([])
  const [work, setWork] = useState<any>('')
  const [tab, setTab] = useState<number>(1)

  return (
    <>
      <nav className="gap-x-5 flex">
        <div
          className={twMerge(
            'font-medium text-default p-2.5 cursor-pointer transition-all',
            `${tab === 1 && 'text-primary border-b border-primary'}`
          )}
          onClick={() => setTab(1)}
        >
          Sắp đặt lịch
        </div>
        <div
          className={twMerge(
            'font-medium text-default p-2.5 cursor-pointer transition-all',
            `${tab === 2 && 'text-primary border-b border-primary'}`
          )}
          onClick={() => setTab(2)}
        >
          Hẹn lịch
        </div>
      </nav>
      {tab === 1 ? (
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
                  setMessageInfo({ type: 'success', message: MESSAGES.SUCCESS })
                })
                .catch((err) => {
                  setMessageInfo({
                    type: 'error',
                    message: err.response.data.email[0],
                  })
                })
            }}
          />
        </>
      ) : (
        <AppointmentDate />
      )}
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
