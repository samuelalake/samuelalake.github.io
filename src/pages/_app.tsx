import type { AppProps } from 'next/app'
import { ThemeProvider, BaseStyles } from '@primer/react'
import './globals.css'
import '@primer/css/index.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <BaseStyles>
        <Component {...pageProps} />
      </BaseStyles>
    </ThemeProvider>
  )
}