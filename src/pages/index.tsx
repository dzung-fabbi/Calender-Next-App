import type { ReactElement } from 'react'

import { TitlePage } from '@/components/common'
import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { CalendarPreview, CalendarSwitch, ThanSat } from '@/modules/home'
import { useStore } from '@/store/useStore'
import { MODE_TAB_HEADER } from '@/utils/constant'

const Home: NextPageWithLayout = () => {
  const tabHeader = useStore((state) => state.tabHeader)

  if (tabHeader === MODE_TAB_HEADER.THAN_SAT)
    return (
      <>
        <TitlePage>Phương vị cát hung</TitlePage>
        <ThanSat />
      </>
    )

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
        className="mb-5 hidden w-full rounded-2xl object-cover md:block"
        src="/images/banner.png"
        alt=""
      />
      <CalendarPreview />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Main meta={<Meta title="Home" description="Home" />}>{page}</Main>
}

export default Home
