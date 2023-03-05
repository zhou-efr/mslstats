import Head from 'next/head'

import { useState } from 'react'
import { GenericButton } from '@/components/GenericButton';
import ObjectDisplayer from '@/components/ObjectDisplayer';

const TokenRoute = () => {
    const [token, setToken] = useState();

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

    return (
        <>
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
        </>
    )
}

const UserRoute = () => {
    const [user, setUser] = useState();

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

    return (
        <>
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
        </>
    );
}

const StreamRoute = () => {
    const [streams, setStreams] = useState();

    const handleGetStream = async () => {
        const response = await fetch('/api/twitch/laststream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: '798312463' }),
        })
        const data = await response.json()
        setStreams(data.stream);
    }

    console.log(streams);

    return (
        <>
            <GenericButton onClick={handleGetStream} variant="primary" size="medium">Get Stream</GenericButton>
            {
                streams ? streams.map((stream, index) => <ObjectDisplayer key={index} object={stream} name={stream.title} subtext={stream.id} />)
                    : (
                        <span className="text-sm font-medium text-slate-900">
                            no stream yet
                        </span>
                    )
            }
        </>
    )
}

export default function Home() {

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
            <div className="flex flex-col gap-4 overflow-x-hidden w-full px-12 pb-5">
                <TokenRoute />
                <UserRoute />
                <StreamRoute />
            </div>
        </>
    )
}
