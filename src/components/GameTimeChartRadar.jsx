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


export const GameTimeChartRadar = ({inputdata, inputdataLabels}) => {
    const data = useMemo(() => ({
        labels: inputdataLabels,
        datasets: [
            {
                label: 'Game Time in hours',
                data: inputdata,
                backgroundColor: 'rgba(129,140,248,0.55)',
                borderColor: '#4f46e5',
                borderWidth: 1,
            },
        ],
    }), [inputdataLabels, inputdata]);

    const options = {
        scale: {
            r: {
                beginAtZero: true,
                min: 0,
            }
        }
    }


    // console.log(options)

    return <Radar data={data} options={options}/>
}