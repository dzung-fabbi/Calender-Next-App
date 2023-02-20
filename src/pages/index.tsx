import type { ReactElement } from 'react'
import { useState } from 'react'

import { Header, TitlePage } from '@/components/common'
import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { CalendarPreview, CalendarSwitch } from '@/modules/home'

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
