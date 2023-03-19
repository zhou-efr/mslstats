import {getStreams} from "@mongo/Stream/getStreams";
import {getGames} from "@mongo/Game/getGames";
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
const montlyTexts = ['', '', 'Joseph est-ce que... Ca va ?']
export default function StatsPage({basestreams, basegames, basemonth}) {
    const [month, setMonth] = useState(basemonth);

    const streams = useMemo(() => basestreams.filter(stream => new Date(stream.started_at).getMonth() === month), [basestreams, month]);
    // const games = useMemo(() => basegames.filter(game => new Date(game.started_at).getMonth() === month), [basegames, month]);

    return (
        <div className="flex flex-col gap-4 overflow-x-hidden w-full px-12 pb-5 items-center w-full">
            {
                (streams.length > 0) ? (
                    <>
                        <MonthlyHighlight month={month}/>
                        <MonthlyStatPage streams={streams} games={basegames} monthlyText={montlyTexts[month]}/>
                    </>
                ) : (
                    <div className="text-center text-gray-500">Pas de statistiques pour ce mois</div>
                )
            }
        </div>
    )
}
