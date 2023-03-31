import { Layout } from '@/components/Layout'
import Head from 'next/head'

import { UserProvider } from '@auth0/nextjs-auth0/client';

import '@/styles/tailwind.css'
import 'focus-visible'
import { Loading } from '@/components/Loading';
import { usePageLoading } from '@/hook/usePageLoading';
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from 'react';

export default function App({ Component, pageProps }) {
  const { isPageLoading } = usePageLoading();
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
        <Suspense fallback={<Loading />}>
          {
            isPageLoading ?
              <Loading />
              :
              <Component {...pageProps} />
          }
        </Suspense>
      </Layout>
      <Analytics />
    </UserProvider>
  )
}
