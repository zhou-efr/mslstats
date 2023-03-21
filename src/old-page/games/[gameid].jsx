import { UserIcon } from '@heroicons/react/20/solid'
import { getGames } from "@mongo/Game/getGames";
import { getStreams } from "@mongo/Stream/getStreams";
import Link from "next/link";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const getServerSideProps = async (ctx) => {
    const { gameid } = ctx.params;
    const rawstreams = await getStreams();
    const rawgames = await getGames();

    const rawgame = rawgames.find(game => game._id.toString() === gameid);
    const gamename = rawgame.title;

    if (rawstreams === null || gamename === undefined) {
        return {
            notFound: true,
        }
    }

    const streams = rawstreams.map((stream, index) => {
        const { _doc } = stream;
        if (_doc.game_played === gamename || _doc.game_secondary === gamename)
            return {
                ..._doc,
                id: index + 1,
                _id: _doc._id.toString(),
                started_at: _doc.started_at.getTime(),
                content: _doc.title,
                target: "Lien",
                href: _doc.url,
                date: _doc.started_at.toDateString(),
                icon: "UserIcon",
                datetime: _doc.started_at.toLocaleDateString(),
                iconBackground: 'bg-gray-400',
            };
    }).filter(stream => stream !== undefined).sort((a, b) => (a.started_at > b.started_at) ? 1 : -1);

    const game = {
        ...rawgame._doc,
        _id: rawgame._id.toString(),
    }

    console.log(game)

    return {
        props: {
            streams: streams,
            game,
        }
    }
}

function YoutubeIcon(props) {
    return (
        <svg viewBox="0 0 256 256" {...props}>
            <path fillRule="evenodd" clipRule="evenodd"
                d="M227.707 44.3638C238.735 47.3133 247.337 55.9487 250.319 66.9765C258.119 98.4376 257.611 157.919 250.483 189.871C247.534 200.899 238.898 209.502 227.871 212.484C196.737 220.186 57.2924 219.235 27.9614 212.484C16.9337 209.535 8.33102 200.899 5.34877 189.871C-2.00854 159.885 -1.50058 96.4713 5.18491 67.1404C8.13439 56.1126 16.7698 47.5099 27.7976 44.5277C69.418 35.8431 212.894 38.6451 227.707 44.3638ZM103.174 90.0798L170.029 128.423L103.174 166.766V90.0798Z" />
        </svg>
    )
}

export default function GamePage({ streams, game }) {
    const icons = {
        "UserIcon": UserIcon
    }
    return (
        <div className="relative isolate overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div
                    className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
                    <div className="relative lg:order-last lg:col-span-5">
                        <svg
                            className="absolute -top-[40rem] left-1 -z-10 h-[64rem] w-[175.5rem] -translate-x-1/2 stroke-gray-900/10 [mask-image:radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)]"
                            aria-hidden="true"
                        >
                            <defs>
                                <pattern
                                    id="e87443c8-56e4-4c20-9111-55b82fa704e3"
                                    width={200}
                                    height={200}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path d="M0.5 0V200M200 0.5L0 0.499983" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" strokeWidth={0}
                                fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)" />
                        </svg>
                        <figure className="border-l border-indigo-600 pl-8">
                            <p className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Tous les lives
                                sur</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">{game.title}</h1>
                            <blockquote className="text-xl font-semibold leading-8 tracking-tight text-gray-900">
                                <p>
                                    {/*“Vel ultricies morbi odio facilisi ultrices accumsan donec lacus purus. Lectus nibh ullamcorper ac*/}
                                    {/*dictum justo in euismod. Risus aenean ut elit massa. In amet aliquet eget cras. Sem volutpat enim*/}
                                    {/*tristique.”*/}
                                </p>
                            </blockquote>
                            <figcaption className="mt-8 flex gap-x-4">
                                <img
                                    src={game.thumbnail}
                                    alt=""
                                    className="mt-1 h-10 w-10 flex-none rounded-full bg-gray-50"
                                />
                                <div className="text-sm leading-6">
                                    <div className="font-semibold text-gray-900">{game.numberOfSessions} streams
                                        - {durationToTime(game.totalDuration)} de stream
                                    </div>
                                    <Link href={game.youtube || "https://www.youtube.com/@MathieuSommetLive"}
                                        target={"_blank"}
                                        className={"fill-slate-400 group-hover:fill-slate-600 text-slate-400 hover:text-slate-600"}><YoutubeIcon
                                            className="inline w-4 h-4" /> Voir sur YouTube</Link>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="max-w-xl text-base leading-7 text-gray-700 lg:col-span-7">
                        <ul role="list" className="-mb-8">
                            {streams.map((event, eventIdx) => {
                                const Icon = icons[event.icon]
                                return (
                                    <li key={event.id}>
                                        <div className="relative pb-8">
                                            {eventIdx !== streams.length - 1 ? (
                                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                    aria-hidden="true" />
                                            ) : null}
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span
                                                        className={classNames(
                                                            event.iconBackground,
                                                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                                        )}
                                                    >
                                                        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                                                    </span>
                                                </div>
                                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            {event.content}{' '}
                                                            <a href={event.href} className="font-medium text-gray-900">
                                                                {event.target}
                                                            </a>
                                                        </p>
                                                    </div>
                                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                                        <time dateTime={event.datetime}>{event.date}</time>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const durationToTime = (duration) => {
    const hours = Math.floor(duration / 60 / 60)
    const minutes = Math.floor(duration / 60 % 60)
    return `${hours}h${('0' + minutes).slice(-2)}m`
}