import type { ReactElement } from 'react'

import { CalendarPreview } from '@/components/common'
import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <p className="text-xl font-bold">Lịch tháng 12</p>
      <CalendarPreview />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Main meta={<Meta title="Home" description="Home" />}>{page}</Main>
}

export default Home
