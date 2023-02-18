import type { ReactNode } from 'react'

import { Footer, Header, Sidebar } from '@/components/common'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}

const Main = (props: IMainProps) => (
  <div className="w-full">
    {props.meta}

    <div className="flex w-full mx-auto">
      <Sidebar />
      <div className="px-[1.875rem] w-full">
        <Header />
        <div className="w-full">{props.children}</div>
        <Footer />
      </div>
    </div>
  </div>
)

export { Main }
