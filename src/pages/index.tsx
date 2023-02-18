import type { ReactElement } from 'react'

import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'

const Home = () => {
  return (
    <div className="mt-5">
      <p>Home</p>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Main meta={<Meta title="Home" description="Home" />}>{page}</Main>
}

export default Home
