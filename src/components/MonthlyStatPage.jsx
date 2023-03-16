import StatsWithBackground from "@/components/StatsWithBackground";
import {GameFrequencyChartDonnut} from "@/components/GameFrequencyChartDonnut";
import {GameTimeChartRadar} from "@/components/GameTimeChartRadar";
import AverageTime from "@/components/AverageTime";
import StatTable from "@/components/StatTable";
import {useMemo} from "react";
import MonthlyRecords from "@/components/monthlyrecords";

export const MonthlyStatPage = ({streams, games}) => {
    const stats = useMemo(() => {
        const streamsStartedAt = streams.map(stream => unixWithoutDate(stream.started_at));
        const streamsEndedAt = streams.map(stream => unixWithoutDate(stream.started_at) + stream.duration);
        const gamesStartedAt = streams.map(stream => unixWithoutDate(stream.started_at) + stream.game_start);
        const gamesEndedAt = streams.map(stream => unixWithoutDate(stream.started_at) + stream.duration - stream.game_end);

        const startedAt = {
            name: "Début du live",
            average: SecondsToTime(streamsStartedAt.reduce((acc, stream) => acc + stream, 0) / streamsStartedAt.length),
            median: SecondsToTime(streamsStartedAt.sort((a, b) => a - b)[Math.floor(streamsStartedAt.length / 2)]),
            min: SecondsToTime(streamsStartedAt.sort((a, b) => a - b)[0]),
            max: SecondsToTime(streamsStartedAt.sort((a, b) => a - b)[streamsStartedAt.length - 1]),
        }

        const endedAt = {
            name: "Fin du live",
            average: SecondsToTime(streamsEndedAt.reduce((acc, stream) => acc + stream, 0) / streamsEndedAt.length),
            median: SecondsToTime(streamsEndedAt.sort((a, b) => a - b)[Math.floor(streamsEndedAt.length / 2)]),
            min: SecondsToTime(streamsEndedAt.sort((a, b) => a - b)[0]),
            max: SecondsToTime(streamsEndedAt.sort((a, b) => a - b)[streamsEndedAt.length - 1]),
        }

        const gameStartedAt = {
            name: "Début du jeu",
            average: SecondsToTime(gamesStartedAt.reduce((acc, stream) => acc + stream, 0) / gamesStartedAt.length),
            median: SecondsToTime(gamesStartedAt.sort((a, b) => a - b)[Math.floor(gamesStartedAt.length / 2)]),
            min: SecondsToTime(gamesStartedAt.sort((a, b) => a - b)[0]),
            max: SecondsToTime(gamesStartedAt.sort((a, b) => a - b)[gamesStartedAt.length - 1]),
        }

        const gameEndedAt = {
            name: "Fin du jeu",
            average: SecondsToTime(gamesEndedAt.reduce((acc, stream) => acc + stream, 0) / gamesEndedAt.length),
            median: SecondsToTime(gamesEndedAt.sort((a, b) => a - b)[Math.floor(gamesEndedAt.length / 2)]),
            min: SecondsToTime(gamesEndedAt.sort((a, b) => a - b)[0]),
            max: SecondsToTime(gamesEndedAt.sort((a, b) => a - b)[gamesEndedAt.length - 1]),
        }

        const streamDuration = streams.map(stream => stream.duration);
        const streamPreLiveDuration = streams.map(stream => stream.game_start);
        const streamPostLiveDuration = streams.map(stream => stream.duration - stream.game_end);
        const streamPreAndPostLiveDuration = streams.map(stream => stream.game_start + stream.duration - stream.game_end);
        const streamGamesDuration = streams.map(stream => stream.game_end - stream.game_start);

        const duration = {
            name: "Durée du live",
            average: durationToTime(streamDuration.reduce((acc, stream) => acc + stream, 0) / streamDuration.length),
            median: durationToTime(streamDuration.sort((a, b) => a - b)[Math.floor(streamDuration.length / 2)]),
            min: durationToTime(streamDuration.sort((a, b) => a - b)[0]),
            max: durationToTime(streamDuration.sort((a, b) => a - b)[streamDuration.length - 1]),
            total: durationToTime(streamDuration.reduce((acc, stream) => acc + stream, 0)),
        }

        const preLiveDuration = {
            name: "Durée pré live",
            average: durationToTime(streamPreLiveDuration.reduce((acc, stream) => acc + stream, 0) / streamPreLiveDuration.length),
            median: durationToTime(streamPreLiveDuration.sort((a, b) => a - b)[Math.floor(streamPreLiveDuration.length / 2)]),
            min: durationToTime(streamPreLiveDuration.sort((a, b) => a - b)[0]),
            max: durationToTime(streamPreLiveDuration.sort((a, b) => a - b)[streamPreLiveDuration.length - 1]),
            total: durationToTime(streamPreLiveDuration.reduce((acc, stream) => acc + stream, 0)),
        }

        const postLiveDuration = {
            name: "Durée post live",
            average: durationToTime(streamPostLiveDuration.reduce((acc, stream) => acc + stream, 0) / streamPostLiveDuration.length),
            median: durationToTime(streamPostLiveDuration.sort((a, b) => a - b)[Math.floor(streamPostLiveDuration.length / 2)]),
            min: durationToTime(streamPostLiveDuration.sort((a, b) => a - b)[0]),
            max: durationToTime(streamPostLiveDuration.sort((a, b) => a - b)[streamPostLiveDuration.length - 1]),
            total: durationToTime(streamPostLiveDuration.reduce((acc, stream) => acc + stream, 0)),
        }

        const preAndPostLiveDuration = {
            name: "Durée discution",
            average: durationToTime(streamPreAndPostLiveDuration.reduce((acc, stream) => acc + stream, 0) / streamPreAndPostLiveDuration.length),
            median: durationToTime(streamPreAndPostLiveDuration.sort((a, b) => a - b)[Math.floor(streamPreAndPostLiveDuration.length / 2)]),
            min: durationToTime(streamPreAndPostLiveDuration.sort((a, b) => a - b)[0]),
            max: durationToTime(streamPreAndPostLiveDuration.sort((a, b) => a - b)[streamPreAndPostLiveDuration.length - 1]),
            total: durationToTime(streamPreAndPostLiveDuration.reduce((acc, stream) => acc + stream, 0)),
        }

        const gamesDuration = {
            name: "Durée de jeux",
            average: durationToTime(streamGamesDuration.reduce((acc, stream) => acc + stream, 0) / streamGamesDuration.length),
            median: durationToTime(streamGamesDuration.sort((a, b) => a - b)[Math.floor(streamGamesDuration.length / 2)]),
            min: durationToTime(streamGamesDuration.sort((a, b) => a - b)[0]),
            max: durationToTime(streamGamesDuration.sort((a, b) => a - b)[streamGamesDuration.length - 1]),
            total: durationToTime(streamGamesDuration.reduce((acc, stream) => acc + stream, 0)),
        }

        return [
            startedAt,
            endedAt,
            gameStartedAt,
            gameEndedAt,
            duration,
            preLiveDuration,
            postLiveDuration,
            preAndPostLiveDuration,
            gamesDuration,
        ];
    }, [streams]);

    const finishedGame = useMemo(() => games?.reduce((acc, game) => game.finished ? acc + 1 : acc, 0) || 0, [games]);

    const highlights = useMemo(() => {
        return [
            {
                id: 1,
                name: 'De pure gaming',
                value: stats[stats.indexOf(stats.find(stat => stat.name === "Durée de jeux"))].total
            },
            {id: 2, name: 'Chansons uniques et parfaites !', value: "Coming Soon"},
            {
                id: 3,
                name: 'En moyenne de discutions passionnantes',
                value: stats[stats.indexOf(stats.find(stat => stat.name === "Durée discution"))].average
            },
            {
                id: 4,
                name: 'Record de durée',
                value: stats[stats.indexOf(stats.find(stat => stat.name === "Durée du live"))].max
            },
        ]
    }, [finishedGame, stats]);

    const highlightedMedian = useMemo(() => {
        return [
            {
                name: 'Heure de début',
                stat: stats[stats.indexOf(stats.find(stat => stat.name === "Début du live"))].median
            },
            {
                name: 'Heure de début de jeu',
                stat: stats[stats.indexOf(stats.find(stat => stat.name === "Début du jeu"))].median
            },
            {name: 'Heure de fin', stat: stats[stats.indexOf(stats.find(stat => stat.name === "Fin du live"))].median},
        ]
    }, [stats]);

    const {gameFrequency, gameFrequencyLabels} = useMemo(() => {
        let gameFrequencyObject = {};

        for (let i = 0; i < streams.length; i++) {
            if (gameFrequencyObject[streams[i].game_played]) {
                gameFrequencyObject[streams[i].game_played] += 1;
            } else {
                gameFrequencyObject[streams[i].game_played] = 1;
            }
        }

        return Object.entries(gameFrequencyObject)
            .map(([name, value]) => ({name, value}))
            .sort((a, b) => b.value - a.value)
            .reduce((acc, game) => {
                acc.gameFrequency.push(game.value);
                acc.gameFrequencyLabels.push(game.name);
                return acc;
            }, {gameFrequency: [], gameFrequencyLabels: []});
    }, [streams]);

    const {gameTime, gameTimeLabels} = useMemo(() => {
        let gameTimeObject = {};

        for (let i = 0; i < streams.length; i++) {
            if (gameTimeObject[streams[i].game_played]) {
                gameTimeObject[streams[i].game_played] += (streams[i].game_end - streams[i].game_start) / 60 / 60;
            } else {
                gameTimeObject[streams[i].game_played] = (streams[i].game_end - streams[i].game_start) / 60 / 60;
            }
        }

        return Object.entries(gameTimeObject)
            .map(([name, value]) => ({name, value}))
            .sort((a, b) => b.value - a.value)
            .reduce((acc, game) => {
                acc.gameTime.push(game.value);
                acc.gameTimeLabels.push(game.name);
                return acc;
            }, {gameTime: [], gameTimeLabels: []});
    }, [streams]);

    const streamRecords = useMemo(() => {
        const longuestStream = streams.sort((a, b) => b.duration - a.duration)[0];
        const longuestTalk = streams.sort((a, b) => b.game_start + b.duration - b.game_end - (a.game_start + a.duration - a.game_end))[0];
        const longuestGame = streams.sort((a, b) => b.game_end - b.game_start - (a.game_end - a.game_start))[0];
        return [
            {
                // longest stream
                id: 1,
                title: "Stream le plus long :",
                name: longuestStream.title,
                href: longuestStream.url,
                imageUrl: longuestStream.thumbnail_url || "https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/noImage.png",
                date: new Date(longuestStream.started_at).toDateString(),
                stat: durationToTime(longuestStream.duration),
            },
            {
                // longest talk
                id: 2,
                title: "La plus longue discution : ",
                name: longuestTalk.title,
                href: longuestTalk.url,
                imageUrl: longuestTalk.thumbnail_url || "https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/noImage.png",
                date: new Date(longuestTalk.started_at).toDateString(),
                stat: durationToTime(longuestTalk.game_start + longuestTalk.duration - longuestTalk.game_end),
            },
            {
                // longest game
                id: 3,
                title: "La plus grosse session de jeux : ",
                name: longuestGame.title,
                href: longuestGame.url,
                imageUrl: longuestGame.thumbnail_url || "https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/noImage.png",
                date: new Date(longuestGame.started_at).toDateString(),
                stat: durationToTime(longuestGame.game_end - longuestGame.game_start),
            },
        ]
    }, [streams]);

    return (
        <>
            <StatsWithBackground {...{highlights}}/>
            <div className="w-full flex flex-wrap justify-around my-24">
                <div className={"flex flex-col items-center w-full lg:w-1/2 h-[30rem]"}>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Fréquence des jeux</h3>
                    <GameFrequencyChartDonnut inputdata={gameFrequency} inputdataLabels={gameFrequencyLabels}/>
                </div>
                <div className={"flex flex-col items-center w-full lg:w-1/2 h-96 lg:h-[30rem]"}>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Temps de jeu</h3>
                    <GameTimeChartRadar inputdata={gameTime} inputdataLabels={gameTimeLabels}/>
                </div>
            </div>
            <AverageTime {...{highlightedMedian}}/>
            <MonthlyRecords records={streamRecords}/>
            <StatTable {...{stats}}/>
        </>
    )
}


const unixWithoutDate = (unix) => {
    const date = new Date(unix)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return seconds + minutes * 60 + hours * 60 * 60
}

const SecondsToTime = (seconds) => {
    const hours = Math.floor(seconds / 60 / 60 % 24)
    const minutes = Math.floor(seconds / 60 % 60)
    const sec = Math.floor(seconds % 60)
    return `${('0' + hours).slice(-2)}h${('0' + minutes).slice(-2)}`
}

const durationToTime = (duration) => {
    const hours = Math.floor(duration / 60 / 60)
    const minutes = Math.floor(duration / 60 % 60)
    return `${hours}h${('0' + minutes).slice(-2)}m`
}

const secondsToHm = (d) => {
    d = Number(d)
    const h = Math.floor(d / 3600)
    const m = Math.floor(d % 3600 / 60)

    const hDisplay = h > 0 ? h + (h === 1 ? 'h ' : 'h ') : ''
    const mDisplay = m > 0 ? m + (m === 1 ? 'm' : 'm') : ''
    return hDisplay + mDisplay
}
