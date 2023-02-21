import '@/styles/main.scss'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'

import type { NextPageWithLayout } from '@/models'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  return getLayout(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Component {...pageProps} />
    </LocalizationProvider>
  )
}

export default MyApp
