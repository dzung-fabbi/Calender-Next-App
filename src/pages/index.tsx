import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

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
  const router = useRouter()
  const tabHeader = useStore((state) => state.tabHeader)
  const onChangeTab = useStore((state) => state.setTabHeader)
  const handleChangeTabHeader = (newTab: number) => {
    onChangeTab(newTab)
    if (router.pathname !== '/') router.push('/')
  }

  const renderTab = () => {
    return (
      <nav className="flex gap-2 md:hidden">
        <div
          className={twMerge(
            'font-medium text-default p-2.5 cursor-pointer transition-all',
            `${
              router.pathname === '/' &&
              tabHeader === 3 &&
              'text-primary border-b border-primary'
            }`
          )}
          onClick={() => handleChangeTabHeader(3)}
        >
          Theo năm
        </div>
        <div
          className={twMerge(
            'font-medium text-default p-2.5 cursor-pointer transition-all',
            `${
              router.pathname === '/' &&
              tabHeader === 4 &&
              'text-primary border-b border-primary'
            }`
          )}
          onClick={() => handleChangeTabHeader(4)}
        >
          Theo tháng
        </div>
      </nav>
    )
  }

  if (tabHeader === MODE_TAB_HEADER.THAN_SAT)
    return (
      <>
        {renderTab()}
        <TitlePage>Phương vị cát hung năm</TitlePage>
        <ThanSat />
      </>
    )

  if (tabHeader === MODE_TAB_HEADER.THAN_SAT_MONTH)
    return (
      <>
        {renderTab()}
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
