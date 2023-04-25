import type { ReactElement } from 'react'

import { TitlePage } from '@/components/common'
import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import {
  CalendarPreview,
  CalendarSwitch,
  ThanSat,
  ThanSatForMonth,
} from '@/modules/home'
import { useStore } from '@/store/useStore'
import { MODE_TAB_HEADER } from '@/utils/constant'

const Home: NextPageWithLayout = () => {
  const tabHeader = useStore((state) => state.tabHeader)

  if (tabHeader === MODE_TAB_HEADER.THAN_SAT)
    return (
      <>
        <TitlePage>Phương vị cát hung năm</TitlePage>
        <ThanSat />
      </>
    )

  if (tabHeader === MODE_TAB_HEADER.THAN_SAT_MONTH)
    return (
      <>
        <TitlePage>Phương vị cát hung tháng</TitlePage>
        <ThanSatForMonth />
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
        className="hidden object-cover w-full mb-5 rounded-2xl md:block"
        src="/images/banner.png"
        alt=""
      />
      <CalendarPreview />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Main
      meta={
        <Meta title="Thiên văn lịch pháp" description="Thiên văn lịch pháp" />
      }
    >
      {page}
    </Main>
  )
}

export default Home
