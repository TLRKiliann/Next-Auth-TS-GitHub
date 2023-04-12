import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Navbar from '../components/Navbar'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
    >
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
