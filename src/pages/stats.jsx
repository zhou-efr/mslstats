import StatsWithBackground from "@/components/StatsWithBackground";
import {getStreams} from "@mongo/Stream/getStreams";
import {getGames} from "@mongo/Game/getGames";
import {GameTimeChartRadar} from "@/components/GameTimeChartRadar";
import AverageTime from "@/components/AverageTime";
import {GameFrequencyChartDonnut} from "@/components/GameFrequencyChartDonnut";

export async function getServerSideProps(ctx) {
  const rawstreams = await getStreams();
  const rawgames = await getGames();
    const streams = rawstreams.map(stream => {
        const { _doc } = stream;
        return { ..._doc, _id: _doc._id.toString(), started_at: _doc.started_at.getTime() };
    });

    const games = rawgames.map(game => {
        const { _doc } = game;
        return { ..._doc, _id: _doc._id.toString() };
    });

    const month = new Date().getMonth();

    return {
    props: {
        streams,
        games,
        month
    },
  };
}

export default function StatsPage({streams, games, month}) {

  return (
    <div className="flex flex-col gap-4 overflow-x-hidden w-full px-12 pb-5">
      <StatsWithBackground {...{streams, games, month}}/>
        <div className="w-full flex flex-wrap justify-around my-10">
            <div className={"flex flex-col items-center w-full lg:w-1/2 h-[30rem]"}>
                <h3 className="text-base font-semibold leading-6 text-gray-900">Fréquence des jeux</h3>
                <GameFrequencyChartDonnut {...{streams, games, month}}/>
            </div>
            <div className={"flex flex-col items-center w-full lg:w-1/2 h-96 lg:h-[30rem]"}>
                <h3 className="text-base font-semibold leading-6 text-gray-900">Temps de jeu</h3>
                <GameTimeChartRadar {...{streams, games, month}}/>
            </div>
        </div>
        <AverageTime {...{streams, games, month}}/>
    </div>
  )
}