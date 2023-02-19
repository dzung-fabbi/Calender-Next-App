import type { ReactNode } from 'react'

import { BoxCalenderRight, Header, Sidebar } from '@/components/common'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}

const Main = (props: IMainProps) => (
  <div className="w-full">
    {props.meta}

    <div className="flex w-full mx-auto gap-x-4 xl:gap-x-30px">
      <Sidebar />
      <div className="grow">
        <Header />
        <div className="w-full mt-6">{props.children}</div>
      </div>
      <BoxCalenderRight />
    </div>
  </div>
)

export { Main }
