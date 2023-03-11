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


export const GameTimeChartRadar = ({gameTime, gameTimeLabels}) => {
    const data = useMemo(() => ({
        labels: gameTimeLabels,
        datasets: [
            {
                label: 'Game Time in hours',
                data: gameTime,
                backgroundColor: 'rgba(129,140,248,0.55)',
                borderColor: '#4f46e5',
                borderWidth: 1,
            },
        ],
    }), [gameTimeLabels, gameTime])

    console.log(data)

    return <Radar data={data} />
}