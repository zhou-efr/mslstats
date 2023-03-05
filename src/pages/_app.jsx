import { Layout } from '@/components/Layout'
import Head from 'next/head'

import '@/styles/tailwind.css'
import 'focus-visible'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>
          MSL
        </title>
        <meta
          name="description"
          content="Conversations with the most tragically misunderstood people of our time."
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
