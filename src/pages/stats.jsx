import {getStreams} from "@mongo/Stream/getStreams";
import {getGames} from "@mongo/Game/getGames";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {MonthlyStatPage} from "@/components/MonthlyStatPage";
import {useMemo, useState} from "react";
import MonthlyHighlight from "@/components/monthlyhighlight";

export async function getServerSideProps(ctx) {
    const rawstreams = await getStreams();
    const rawgames = await getGames();
    const streams = rawstreams.map(stream => {
        const {_doc} = stream;
        return {..._doc, _id: _doc._id.toString(), started_at: _doc.started_at.getTime()};
    });

    const games = rawgames.map(game => {
        const { _doc } = game;
        return { ..._doc, _id: _doc._id.toString() };
    });

    const month = new Date().getMonth();

    return {
        props: {
            basestreams: streams,
            basegames: games,
            basemonth: month
        },
    };
}

const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
export default function StatsPage({basestreams, basegames, basemonth}) {
    const [month, setMonth] = useState(basemonth);

    const streams = useMemo(() => basestreams.filter(stream => new Date(stream.started_at).getMonth() === month), [basestreams, month]);
    const games = useMemo(() => basegames.filter(game => new Date(game.started_at).getMonth() === month), [basegames, month]);

    return (
        <div className="flex flex-col gap-4 overflow-x-hidden w-full px-12 pb-5 items-center w-full">
            <div className="flex items-center text-gray-900 w-48">
                <button
                    type="button"
                    onClick={() => setMonth((month - 1) % 12)}
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                </button>
                <div className="flex-auto text-center text-sm font-semibold">{months[month]}</div>
                <button
                    type="button"
                    onClick={() => setMonth((month + 1) % 12)}
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                </button>
            </div>
            {
                (streams.length > 0) ? (
                    <>
                        <MonthlyHighlight month={month}/>
                        <MonthlyStatPage streams={streams}/>
                    </>
                ) : (
                    <div className="text-center text-gray-500">Pas de statistiques pour ce mois</div>
                )
            }
        </div>
    )
}
