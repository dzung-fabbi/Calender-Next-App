import '@/styles/main.scss'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { vi } from 'date-fns/locale'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import type { ReactElement } from 'react'

import type { NextPageWithLayout } from '@/models'
import CustomDateAdapter from '@/utils/helpers'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  return (
    <SessionProvider
      session={pageProps.session}
      refetchOnWindowFocus={true}
      refetchInterval={10 * 60}
    >
      {getLayout(
        <LocalizationProvider
          adapterLocale={vi}
          // @ts-ignore
          dateAdapter={CustomDateAdapter}
          dateFormats={{ monthShort: 'T.M', monthAndYear: 'MM/YYYY' }}
        >
          <Component {...pageProps} />
        </LocalizationProvider>
      )}
    </SessionProvider>
  )
}
export default MyApp
