import Head from 'next/head'

import { useState } from 'react'
import { GenericButton } from '@/components/GenericButton';
import ObjectDisplayer from '@/components/ObjectDisplayer';
import {useUser, withPageAuthRequired} from "@auth0/nextjs-auth0/client";
import {getSession} from "@auth0/nextjs-auth0";
import {isAdministrator} from "@/lib/auth0/administrators";

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
    const [username, setUsername] = useState('mathieusommetlive');
    const [user, setUser] = useState();

    const handleGetUser = async () => {
        const response = await fetch('/api/twitch/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        })
        const data = await response.json()
        setUser(data.user);
    }

    return (
        <>
            <div className="flex flex-row gap-3">
                <div className="relative">
                    <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Jane Smith"
                    />
                </div>
                <GenericButton onClick={handleGetUser} variant="primary" size="medium">Get User</GenericButton>
            </div>
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
    const [streamerId, setStreamerId] = useState('798312463');

    const handleGetStream = async () => {
        const response = await fetch('/api/twitch/laststream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: [streamerId] }),
        })
        const data = await response.json()
        setStreams(data.stream);
    }

    console.log(streams);

    return (
        <>
            <div className="flex flex-row gap-3">
                <div className="relative">
                    <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                        Streamer ID
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={streamerId}
                        onChange={(e) => setStreamerId(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Jane Smith"
                    />
                </div>
                <GenericButton onClick={handleGetStream} variant="primary" size="medium">Get Stream</GenericButton>
            </div>
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

export default withPageAuthRequired(function Home() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    if (!isAdministrator(user.email)) {
        return {
            redirect: {
                destination: '/api/auth/login',
                permanent: false,
            },
        }
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
            <div className="flex flex-col gap-4 overflow-x-hidden w-full px-12 pb-5">
                <TokenRoute />
                <UserRoute />
                <StreamRoute />
            </div>
        </>
    )
})
