import type { AppProps } from 'next/app'
import '@primer/css/index.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}