import Head from 'next/head'

import { Container } from '@/components/Container'

import { useState } from 'react'
import { GenericButton } from '@/components/GenericButton';
import ObjectDisplayer from '@/components/ObjectDisplayer';


export default function Home({ episodes }) {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [stream, setStream] = useState("no stream yet");

  const handleGetToken = async () => {
    const response = await fetch('/api/twitch/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    setToken(data);
  }

  const handleGetUser = async () => {
    const response = await fetch('/api/twitch/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'mathieusommetlive' }),
    })
    const data = await response.json()
    setUser(data.user);
  }

  const handleGetStream = async () => {
    const response = await fetch('/api/twitch/laststream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: '798312463' }),
    })
    const data = await response.json()
    setStream(JSON.stringify(data));
  }

  return (
    <>
      <Head>
        <title>
          MSL
        </title>
        <meta
          name="description"
          content="Conversations with the most tragically misunderstood people of our time."
        />
      </Head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Statistiques
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100 py-10">
          <div className="flex flex-col gap-4 overflow-x-hidden w-full px-12">
            <GenericButton onClick={handleGetToken} variant="primary" size="medium">Get Token</GenericButton>
            <span className="text-sm font-medium text-slate-900">
              {
                token ? (
                  <ObjectDisplayer object={token} name={"token"} subtext={"tqt c'est mon token"} />
                ) : (
                  <div>no token yet</div>
                )
              }
            </span>

            <GenericButton onClick={handleGetUser} variant="primary" size="medium">Get User</GenericButton>
            <span className="text-sm font-medium text-slate-900">
              {
                user ? (
                  <ObjectDisplayer object={user} name={user.login} subtext={user.description} />
                ) : (
                  <div>no user yet</div>
                )
              }
            </span>

            <GenericButton onClick={handleGetStream} variant="primary" size="medium">Get Stream</GenericButton>
            <span className="text-sm font-medium text-slate-900">
              {stream}
            </span>

          </div>
        </div>
      </div>
    </>
  )
}
