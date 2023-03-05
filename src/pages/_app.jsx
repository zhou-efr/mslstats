import { Layout } from '@/components/Layout'
import Head from 'next/head'

import { UserProvider } from '@auth0/nextjs-auth0/client';

import '@/styles/tailwind.css'
import 'focus-visible'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
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
    </UserProvider>
  )
}
