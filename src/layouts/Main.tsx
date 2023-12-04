import { Alert, Snackbar } from '@mui/material'
import Cookies from 'js-cookie'
import { signOut, useSession } from 'next-auth/react'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import homeApi from '@/api/home.api'
import { BoxCalenderRight, Header, Sidebar } from '@/components/common'
import { useStore } from '@/store/useStore'
import { MODE_TAB_HEADER } from '@/utils/constant'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
  isCalendar?: boolean
}

const Main = ({ children, meta, isCalendar = true }: IMainProps) => {
  const { openSnackbar, setOpenSnackbar, messageInfo, setUserInfo, tabHeader } =
    useStore((state) => ({
      openSnackbar: state.openSnackbar,
      setOpenSnackbar: state.setOpenSnackbar,
      messageInfo: state.messageInfo,
      setUserInfo: state.setUserInfo,
      tabHeader: state.tabHeader,
    }))

  const { data: session } = useSession()

  async function convertTokenFunc(token: string, type: string) {
    try {
      const res = await homeApi.convertTokenSocial(token, type)
      if (res) {
        Cookies.set('access_token', res.access_token, {
          expires: res.expires_in,
        })
        Cookies.set('refresh_token', res.refresh_token)
        homeApi
          .getUserInfo()
          .then((data: any) => {
            setUserInfo(data.data)
          })
          .catch(() => {
            setUserInfo(null)
          })
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      signOut().then(() => {
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        setUserInfo(null)
      })
    }
  }
  useEffect(() => {
    const token = Cookies.get('access_token')
    if (session && session.account.access_token && !token) {
      const { account } = session

      convertTokenFunc(account.access_token as string, account.provider)
    }
  }, [session])

  const handleClose = () => {
    setOpenSnackbar(false)
  }

  const isShowCalendar = isCalendar && !(tabHeader !== MODE_TAB_HEADER.PREVIEW)

  return (
    <main className="w-full">
      {meta}

      <div className="flex w-full mx-auto xs:flex-wrap md:flex-nowrap">
        <div className="hidden sm:block">
          <Sidebar />
        </div>
        <div className="flex flex-row flex-wrap grow xl:flex-nowrap">
          <div
            className={twMerge(
              'p-4 pt-0 grow xl:p-30px xl:pt-0',
              isShowCalendar && 'div-content '
            )}
          >
            <Header />
            {isShowCalendar && <BoxCalenderRight className="xl:hidden" />}
            <div className="mt-6 xl:mb-20">{children}</div>
          </div>
          {isShowCalendar && (
            <BoxCalenderRight className="xs:hidden xl:block" />
          )}
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
