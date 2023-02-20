import type { ReactElement } from 'react'
import { useState } from 'react'

import { CalendarPreview, Header, TitlePage } from '@/components/common'
import { IconChevronRight, IconClock, IconDown } from '@/components/icon'
import { Input } from '@/components/input'
import TabPrimary from '@/components/tab/TabPrimary'
import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'

const CalendarSwitch = () => {
  return (
    <div className="relative flex flex-wrap w-full gap-5">
      <div className="flex flex-col flex-1 px-5 pt-2.5 pb-8  border shadow border-primary rounded-primary gap-y-4">
        <TabPrimary tabActive={1} />
        <span className="text-sm font-medium text-gray-primary">
          Lựa chọn ngày dương
        </span>
        <div className="flex gap-2.5">
          <Input
            label="Chọn giờ"
            value={'10:00 AM'}
            containerClass="grow"
            className="w-full min-w-[150px]"
          >
            <IconClock />
          </Input>
          <Input label="Ngày" value={'12'} className="w-[88px] xl:w-24">
            <IconDown />
          </Input>
          <Input label="Tháng" value={'02'} className="w-[88px] xl:w-24">
            <IconDown />
          </Input>
          <Input label="Năm" value={'2013'} className="w-[100px] xl:w-28">
            <IconDown />
          </Input>
        </div>
      </div>
      <div className="flex flex-col flex-1 px-5 pt-2.5 pb-8 gap-y-4 border border-transparent shadow rounded-primary">
        <TabPrimary tabActive={2} />
        <span className="text-sm font-medium text-gray-primary">Ngày âm</span>
        <div className="flex gap-2.5">
          <Input
            label="Giờ"
            value={'10:00 AM'}
            containerClass="grow"
            className="w-full min-w-[150px] bg-[#FFF6F6] border-transparent"
          ></Input>
          <Input
            label="Ngày"
            value={'12'}
            className="w-[88px] xl:w-24 bg-[#FFF6F6] border-transparent"
          ></Input>
          <Input
            label="Tháng"
            value={'02'}
            className="w-[88px] xl:w-24 bg-[#FFF6F6] border-transparent"
          ></Input>
          <Input
            label="Năm"
            value={'2013'}
            className="w-[100px] xl:w-28 bg-[#FFF6F6] border-transparent"
          ></Input>
        </div>
      </div>

      <div className="absolute flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white border-2 cursor-pointer hover:opacity-90 top-1/2 left-1/2 rounded-primary border-primary/[43] ring-2 ring-primary/[0.32]">
        <IconChevronRight />
      </div>
    </div>
  )
}
const MODE = {
  PREVIEW: 1,
  CALENDAR_CHANGE: 2,
}
const Home: NextPageWithLayout = () => {
  const [tab, setTab] = useState(MODE.PREVIEW)
  return (
    <div>
      <Header status={tab} onChangeStatus={(value: number) => setTab(value)} />
      {tab === MODE.PREVIEW && (
        <div className="mt-6">
          <img
            className="object-cover w-full mb-5 rounded-2xl"
            src="/images/banner.png"
            alt=""
          />
          <p className="text-xl font-bold">Lịch tháng 12</p>
          <CalendarPreview />
        </div>
      )}

      {tab === MODE.CALENDAR_CHANGE && (
        <div className="mt-6">
          <TitlePage>Chuyển đổi lịch</TitlePage>
          <CalendarSwitch />
        </div>
      )}
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Main meta={<Meta title="Home" description="Home" />}>{page}</Main>
}

export default Home
