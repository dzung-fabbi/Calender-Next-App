import type { ReactNode } from 'react'
import { useEffect } from 'react'

import { BoxCalenderRight, Header, Sidebar } from '@/components/common'
import { useWindowSize } from '@/hooks'
import { useStore } from '@/store/useStore'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}

const Main = (props: IMainProps) => {
  const windowSize = useWindowSize()
  const { isMobile, updateIsMobile } = useStore((state) => ({
    isMobile: state.isMobile,
    updateIsMobile: state.setIsMobile,
  }))
  useEffect(() => {
    if (windowSize.width) {
      if (windowSize.width < 640) {
        updateIsMobile(true)
      } else {
        updateIsMobile(false)
      }
    }
  }, [windowSize])

  return (
    <div className="w-full">
      {props.meta}

      <div className="flex w-full mx-auto xs:flex-wrap md:flex-nowrap">
        {!isMobile && <Sidebar />}
        <div className="flex flex-wrap xl:flex-nowrap grow">
          <div className="p-4 pt-0 xl:p-30px xl:pt-0 grow">
            <Header />
            <BoxCalenderRight className="xl:hidden" />
            <div className="mt-6 xl:mb-20">{props.children}</div>
          </div>
          <BoxCalenderRight className="xs:hidden xl:block" />
        </div>
      </div>
    </div>
  )
}

export { Main }
