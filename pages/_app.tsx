import '../styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <Hydrate state={pageProps?.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={true} />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
