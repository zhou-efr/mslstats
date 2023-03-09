import React, {useMemo} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function GameFrequencyChartDonnut({ streams, games, month }) {
    const labels = useMemo(() => games?.map(game => {
        // check if game is in current month streams
        for (let i = 0; i < streams.length; i++) {
            const stream = streams[i];
            const streamMonth = new Date(stream.started_at).getMonth();
            if (streamMonth === new Date().getMonth() && stream.game_played === game.title) {
                return game.title;
            }
        }
    }) || [], [games, streams]).filter(game => game !== undefined);
    const datasets = useMemo(() => {
        const currentMonth = new Date().getMonth();
        let data = labels?.map(game => 0)
        streams?.forEach(stream => {
            const streamMonth = new Date(stream.started_at).getMonth();
            if (streamMonth === currentMonth) {
                const gameIndex = labels.findIndex(game => game === stream.game_played);
                data[gameIndex] += 1;
            }
        })

        return data;
    }, [streams, games])

    const data = useMemo(() => ({
        labels,
        datasets: [
            {
                label: 'Game Frequency',
                data: datasets,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }), [labels, datasets]);

    return <Doughnut data={data} />;
}
