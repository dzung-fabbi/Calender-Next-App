import '@/styles/main.scss'

import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'

import type { NextPageWithLayout } from '@/models'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  return getLayout(<Component {...pageProps} />)
}

export default MyApp
