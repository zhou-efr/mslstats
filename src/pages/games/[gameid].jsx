import {UserIcon} from '@heroicons/react/20/solid'
import {getGames} from "@mongo/Game/getGames";
import {getStreams} from "@mongo/Stream/getStreams";
import {Container} from "@/components/Container";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const getServerSideProps = async (ctx) => {
    const {gameid} = ctx.params;
    const rawstreams = await getStreams();
    const rawgames = await getGames();

    const gamename = rawgames.find(game => game._id.toString() === gameid).title;

    if (rawstreams === null || gamename === undefined) {
        return {
            notFound: true,
        }
    }

    const streams = rawstreams.map((stream, index) => {
        const {_doc} = stream;
        if (_doc.game_planned === gamename || _doc.game_secondary === gamename)
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

    return {
        props: {
            streams: streams,
        }
    }
}

export default function GameIdPage({streams}) {
    const icons = {
        "UserIcon": UserIcon
    }

    return (
        <Container>
            <div className="flow-root">
                <ul role="list" className="-mb-8">
                    {streams.map((event, eventIdx) => {
                        const Icon = icons[event.icon]
                        return (
                            <li key={event.id}>
                                <div className="relative pb-8">
                                    {eventIdx !== streams.length - 1 ? (
                                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                              aria-hidden="true"/>
                                    ) : null}
                                    <div className="relative flex space-x-3">
                                        <div>
                  <span
                      className={classNames(
                          event.iconBackground,
                          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                      )}
                  >
                    <Icon className="h-5 w-5 text-white" aria-hidden="true"/>
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
        </Container>
    )
}
