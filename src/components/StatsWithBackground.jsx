import {useMemo} from "react";
import Image from "next/image";


const secondsToHm = (d) => {
    d = Number(d)
    const h = Math.floor(d / 3600)
    const m = Math.floor(d % 3600 / 60)

    const hDisplay = h > 0 ? h + (h === 1 ? 'h ' : 'h ') : ''
    const mDisplay = m > 0 ? m + (m === 1 ? 'm' : 'm') : ''
    return hDisplay + mDisplay
}

export default function StatsWithBackground({streams, games, month}) {
    const pureGameplay = useMemo(() => {
        const streamsInMonth = streams?.filter(stream => new Date(stream.started_at).getMonth() === month) || []
        const totalGameplay = streamsInMonth?.reduce((acc, stream) => (stream.game_end - stream.game_start) + acc, 0) || 0
        return secondsToHm(totalGameplay)
    }, [games]);
    const finishedGame = useMemo(() => games?.reduce((acc, game) => game.finished ? acc + 1 : acc, 0) || 0, [games]);
    const chattingdurationaverage = useMemo(() => {
        const streamsInMonth = streams?.filter(stream => new Date(stream.started_at).getMonth() === month) || []
        const totalChatting = streamsInMonth?.reduce((acc, stream) => stream.game_start + acc, 0) || 0
        return secondsToHm(totalChatting / streamsInMonth.length)
    }, [streams]);
    const longestStream = useMemo(() => {
        const streamsInMonth = streams?.filter(stream => new Date(stream.started_at).getMonth() === month) || []
        const longestStream = streamsInMonth?.reduce((acc, stream) => {
            return stream.duration > acc ? stream.duration : acc
        }, 0) || 0
        return secondsToHm(longestStream)
    }, [streams]);

    const stats = [
        {id: 1, name: 'De pure gaming', value: pureGameplay},
        {id: 2, name: 'Jeux complétés en 2023', value: finishedGame},
        {id: 3, name: 'En moyenne de discutions passionnantes', value: chattingdurationaverage},
        {id: 4, name: 'Record de durée', value: longestStream},
    ]

    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 rounded-lg">
            <Image
                fill={true}
                src="https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/mslbg.png"
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover filter blur"
            />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <svg
                    viewBox="0 0 1266 975"
                    aria-hidden="true"
                    className="absolute -bottom-8 -left-96 -z-10 w-[79.125rem] transform-gpu blur-3xl sm:-left-40 sm:-bottom-64 lg:left-8 lg:-bottom-32 xl:-left-10"
                >
                    <path
                        fill="url(#05f95398-6ec0-404d-8f7d-a69a4504684d)"
                        fillOpacity=".2"
                        d="M347.52 746.149 223.324 974.786 0 630.219l347.52 115.93 223.675-411.77c1.431 190.266 49.389 498.404 229.766 208.829C1026.43 181.239 966.307-135.484 1129.51 59.422c130.55 155.925 143.15 424.618 133.13 539.473L936.67 429.884l23.195 520.539L347.52 746.149Z"
                    />
                    <defs>
                        <linearGradient
                            id="05f95398-6ec0-404d-8f7d-a69a4504684d"
                            x1="1265.86"
                            x2="-162.888"
                            y1=".254"
                            y2="418.947"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#776FFF" />
                            <stop offset={1} stopColor="#FF4694" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                    <h2 className="text-base font-semibold leading-8 text-indigo-400">Mars 2023</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Mathieu Sommet Live
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste
                        dolor cupiditate blanditiis ratione.
                    </p>
                </div>
                <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
                            <dt className="text-sm leading-6">{stat.name}</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}
