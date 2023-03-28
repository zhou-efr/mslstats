import StatsWithBackground from "@/components/StatsWithBackground";
import {GameFrequencyChartDonnut} from "@/components/GameFrequencyChartDonnut";
import {GameTimeChartRadar} from "@/components/GameTimeChartRadar";
import AverageTime from "@/components/AverageTime";
import StatTable from "@/components/StatTable";
import {useMemo} from "react";
import MonthlyRecords from "@/components/monthlyrecords";

export const MonthlyStatPage = ({streams, games, monthlyText}) => {
    const stats = useMemo(() => {
        const streamsStartedAt = streams.map(stream => unixWithoutDate(stream.started_at));
        const streamsEndedAt = streams.map(stream => unixWithoutDate(stream.started_at) + stream.duration);
        const gamesStartedAt = streams.map(stream => unixWithoutDate(stream.started_at) + stream.games[0].start);
        const gamesEndedAt = streams.map((stream, index) => unixWithoutDate(stream.started_at) + stream.duration - stream.games[stream.games.length - 1].end);

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
        const streamPreLiveDuration = streams.map(stream => stream.games.reduce((acc, game, index) => {
            if (index === 0) {
                return game.start;
            } else {
                return acc + game.start - stream.games[index - 1].end;
            }
        }, 0));
        const streamPostLiveDuration = streams.map(stream => stream.duration - stream.games[stream.games.length - 1].end);
        const streamPreAndPostLiveDuration = streams.map((_, index) => streamPreLiveDuration[index] + streamPostLiveDuration[index]);
        const streamGamesDuration = streams.map(stream => stream.games.reduce((acc, game) => acc + game.end - game.start, 0));

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

        return {
            startedAt,
            endedAt,
            gameStartedAt,
            gameEndedAt,
            duration,
            preLiveDuration,
            postLiveDuration,
            preAndPostLiveDuration,
            gamesDuration,
        };
    }, [streams]);

    const highlights = useMemo(() => {
        const numberOfStreams = streams.filter(stream => stream.started_at > 1679050800000 && stream.started_at < 16803432000000).length;
        const numberOfChronoPhoto = streams.filter(stream => stream.games.some(game => game.title === 'ChronoPhoto')).length;
        console.log({
            context: 'numberOfStreams',
            startedAtExample: streams[0].started_at,
            numberOfStreams,
            numberOfChronoPhoto,
        })
        if (monthlyText === "Joseph est-ce que... Ca va ?") {
            return [
                {
                    id: 1,
                    name: 'De pure gaming',
                    value: stats.gamesDuration.total
                },
                {
                    id: 2,
                    name: 'de chance que ca parte en ChronoPhoto',
                    value: Math.ceil((numberOfChronoPhoto / numberOfStreams) * 100).toString() + " %"
                },
                {
                    id: 3,
                    name: 'En moyenne de discutions passionnantes',
                    value: stats.preAndPostLiveDuration.average
                },
                {
                    id: 4,
                    name: 'Record de durée',
                    value: stats.duration.max
                },
            ]
        } else {
            return [
                {
                    id: 1,
                    name: 'De pure gaming',
                    value: stats.gamesDuration.total
                },
                {
                    id: 2,
                    name: 'En moyenne de discutions passionnantes',
                    value: stats.preAndPostLiveDuration.average
                },
                {
                    id: 3,
                    name: 'Record de durée',
                    value: stats.duration.max
                },
            ]
        }
    }, [stats]);

    const highlightedMedian = useMemo(() => {
        return [
            {
                name: 'Heure de début',
                stat: stats.startedAt.median
            },
            {
                name: 'Heure de début de jeu',
                stat: stats.gameStartedAt.median
            },
            {name: 'Heure de fin', stat: stats.endedAt.median},
        ]
    }, [stats]);

    const {gameFrequency, gameFrequencyLabels} = useMemo(() => {
        let gameFrequencyObject = {};

        for (let i = 0; i < streams.length; i++) {
            for (let j = 0; j < streams[i].games.length; j++) {
                if (gameFrequencyObject[streams[i].games[j].title]) {
                    gameFrequencyObject[streams[i].games[j].title]++;
                } else {
                    gameFrequencyObject[streams[i].games[j].title] = 1;
                }
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

        // in hours
        for (let i = 0; i < streams.length; i++) {
            for (let j = 0; j < streams[i].games.length; j++) {
                if (gameTimeObject[streams[i].games[j].title]) {
                    gameTimeObject[streams[i].games[j].title] += (streams[i].games[j].end - streams[i].games[j].start) / 3600;
                } else {
                    gameTimeObject[streams[i].games[j].title] = (streams[i].games[j].end - streams[i].games[j].start) / 3600;
                }
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
        const longuestTalkIndex = streams.reduce((acc, stream, index) => {
            const talkduration = stream.games.reduce((acc2, game, index) => {
                if (index === 0) {
                    return game.start;
                }
                return acc2 + game.start - stream.games[index - 1].end;
            }, 0);
            if (acc.duration < talkduration) {
                return {duration: talkduration, index};
            }
            return acc;
        }, {duration: 0, index: 0});
        const longuestGameIndex = streams.reduce((acc, stream, index) => {
            const gameduration = stream.games.reduce((acc, game, index) => {
                return acc + game.end - game.start;
            }, 0);
            if (acc.duration < gameduration) {
                return {duration: gameduration, index};
            }
            return acc;
        }, {duration: 0, index: 0});
        const longuestTalk = streams[longuestTalkIndex.index];
        const longuestGame = streams[longuestGameIndex.index];
        return [
            {
                // longest stream
                id: 1,
                title: "Stream le plus long :",
                name: longuestStream.title,
                href: longuestStream.url,
                imageUrl: games?.find((game, index) => game.title === longuestStream.game_played)?.thumbnail || "https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/noImage.png",
                date: new Date(longuestStream.started_at).toDateString(),
                stat: durationToTime(longuestStream.duration),
            },
            {
                // longest talk
                id: 2,
                title: "La plus longue discution : ",
                name: longuestTalk.title,
                href: longuestTalk.url,
                imageUrl: games?.find((game, index) => game.title === longuestTalk.game_played)?.thumbnail || "https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/noImage.png",
                date: new Date(longuestTalk.started_at).toDateString(),
                stat: durationToTime(longuestTalk.game_start + longuestTalk.duration - longuestTalk.game_end),
            },
            {
                // longest game
                id: 3,
                title: "La plus grosse session de g@m1ng : ",
                name: longuestGame.title,
                href: longuestGame.url,
                imageUrl: games?.find((game, index) => game.title === longuestGame.game_played)?.thumbnail || "https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/noImage.png",
                date: new Date(longuestGame.started_at).toDateString(),
                stat: durationToTime(longuestGame.game_end - longuestGame.game_start),
            },
        ]
    }, [streams]);

    return (
        <>
            <StatsWithBackground {...{highlights, monthlyText}}/>
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
