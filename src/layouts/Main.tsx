import { Alert, Snackbar } from '@mui/material'
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
  const {
    isMobile,
    updateIsMobile,
    openSnackbar,
    setOpenSnackbar,
    messageInfo,
  } = useStore((state) => ({
    isMobile: state.isMobile,
    updateIsMobile: state.setIsMobile,
    openSnackbar: state.openSnackbar,
    setOpenSnackbar: state.setOpenSnackbar,
    messageInfo: state.messageInfo,
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

  const handleClose = () => {
    setOpenSnackbar(false)
  }

  return (
    <main className="w-full">
      {props.meta}

      <div className="mx-auto flex w-full xs:flex-wrap md:flex-nowrap">
        {!isMobile && <Sidebar />}
        <div className="flex grow flex-row flex-wrap xl:flex-nowrap">
          <div className="div-content grow p-4 pt-0 xl:p-30px xl:pt-0">
            <Header />
            <BoxCalenderRight className="xl:hidden" />
            <div className="mt-6 xl:mb-20">{props.children}</div>
          </div>
          <BoxCalenderRight className="xs:hidden xl:block" />
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={messageInfo.type}
          sx={{ width: '100%' }}
        >
          {messageInfo.message}
        </Alert>
      </Snackbar>
    </main>
  )
}

export { Main }
