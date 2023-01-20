import 'animate.css/source/animate.css'
import { enableAllPlugins, enableMapSet } from 'immer'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store from '../src/app/store'
import Loading from '../src/components/Loading'
import '../src/styles/global.css'
import '../src/styles/vars.css'

enableMapSet()
enableAllPlugins()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<{ children?: React.ReactNode }>
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  })

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }))
    }

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }))
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeEnd)
    router.events.on('routeChangeError', handleRouteChangeEnd)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeEnd)
      router.events.off('routeChangeError', handleRouteChangeEnd)
    }
  }, [router.events])
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Loading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
      <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
    </>
  )
}
