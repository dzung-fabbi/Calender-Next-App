import type { ReactElement } from 'react'

import { TitlePage } from '@/components/common'
import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { CalendarPreview, CalendarSwitch } from '@/modules/home'
import { useStore } from '@/store/useStore'
import { MODE_TAB_HEADER } from '@/utils/constant'

const Home: NextPageWithLayout = () => {
  const tabHeader = useStore((state) => state.tabHeader)

  if (tabHeader === MODE_TAB_HEADER.CALENDAR_CHANGE)
    return (
      <>
        <TitlePage>Chuyển đổi lịch</TitlePage>
        <CalendarSwitch />
      </>
    )
  return (
    <>
      <img
        className="object-cover w-full mb-5 rounded-2xl"
        src="/images/banner.png"
        alt=""
      />
      <p className="text-xl font-bold">Lịch tháng 12</p>
      <CalendarPreview />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Main meta={<Meta title="Home" description="Home" />}>{page}</Main>
}

export default Home
