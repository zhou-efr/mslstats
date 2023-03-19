import {getStreams} from "@mongo/Stream/getStreams";
import {getGames} from "@mongo/Game/getGames";
import {MonthSlider} from "@/components/stats/monthslider";

const monthly_texts = ['', '', 'Joseph est-ce que... Ca va ?']

export default async function StatsPage({params: {slug}}) {
    let month = parseInt(slug?.[0]);
    if (!slug || isNaN(parseInt(slug[0]))) month = new Date().getMonth()

    console.log("stats");
    console.log(month);

    const raw_streams = await getStreams();
    const raw_games = await getGames();

    console.log("streams retreived")

    const streams = raw_streams.map(stream => {
        const {_doc} = stream;
        return {
            ..._doc,
            _id: _doc._id.toString(),
            started_at: _doc.started_at.getTime()
        };
    }).filter(stream => new Date(stream.started_at).getMonth() === month);

    const games = raw_games.map(game => {
        const {_doc} = game;
        return {..._doc, _id: _doc._id.toString()};
    });

    console.log({
        context: "stats",
        streams: streams.length
    })

    return (
        <div className="flex flex-col gap-4 overflow-x-hidden w-full px-12 pb-5 items-center w-full">
            <MonthSlider month={month}/>
        </div>
    )
}