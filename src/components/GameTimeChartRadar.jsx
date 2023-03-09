import {Radar} from "react-chartjs-2";
import {useMemo} from "react";
import {Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip,} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);


export const GameTimeChartRadar = ({streams, games, month}) => {
    const labels = useMemo(() => games?.map(game => {
        // check if game is in current month streams
        for (let i = 0; i < streams.length; i++) {
            const stream = streams[i];
            if (month === new Date().getMonth() && stream.game_played === game.title) {
                return game.title;
            }
        }
    }) || [], [games]).filter(game => game !== undefined);
    const datasets = useMemo(() => {
        const currentMonth = new Date().getMonth();
        let data = labels?.map(game => 0)
        streams?.forEach(stream => {
            if (month === currentMonth) {
                const gameIndex = labels.findIndex(game => game === stream.game_played);
                data[gameIndex] += stream.game_end - stream.game_start;
            }
        })

        // Convert to minutes
        data = data.map(time => time / 60 / 60)

        return data;
    }, [streams, games])

    const data = useMemo(() => ({
        labels,
        datasets: [
            {
                label: 'Game Time in hours',
                data: datasets,
                backgroundColor: 'rgba(129,140,248,0.55)',
                borderColor: '#4f46e5',
                borderWidth: 1,
            },
        ],
    }), [labels, datasets])

    console.log(data)

    return <Radar data={data} />
}