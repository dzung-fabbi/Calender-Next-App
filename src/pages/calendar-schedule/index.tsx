import { TitlePage } from '@/components/common'
import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { BoxSelectDate, BoxSelectInfo } from '@/modules/canlendar-schedule'

const CalendarSchedule: NextPageWithLayout = () => {
  return (
    <div>
      <TitlePage>Nhập khoảng thời gian</TitlePage>
      <div className="flex flex-col gap-y-9">
        <BoxSelectInfo />
        <BoxSelectDate />
      </div>
    </div>
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
