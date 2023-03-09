import {useMemo} from "react";

const unixToTime = (unix) => {
    const date = new Date(unix)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return {hours, minutes}
}

export default function AverageTime({streams, games, month}) {
    const averageStartTime = useMemo(() => streams?.reduce((acc, stream) => {
        if (new Date(stream.started_at).getMonth() !== month) return acc
        const {hours, minutes} = unixToTime(stream.started_at)
        if (hours < 17) return acc
        return {hours: (acc.hours + hours) / 2, minutes: (acc.minutes + minutes) /2}
    }, {hours: 0, minutes: 0}) || {hours: 0, minutes: 0}, [streams])

    const averageGameStartTime = useMemo(() => streams?.reduce((acc, stream) => {
        if (new Date(stream.started_at).getMonth() !== month) return acc
        const {hours, minutes} = unixToTime(stream.started_at)
        if (hours < 17) return acc
        const m = ((stream.game_start / 60 % 60) + minutes)
        const h = ((stream.game_start / 60 / 60) + hours + Math.floor(m / 60)) % 24
        return {hours: (acc.hours + h) / 2, minutes: (acc.minutes + (m % 60)) /2}
    }, {hours: 0, minutes: 0}) || {hours: 0, minutes: 0}, [streams])

    const averageEndTime = useMemo(() => streams?.reduce((acc, stream) => {
        if (new Date(stream.started_at).getMonth() !== month) return acc
        const {hours, minutes} = unixToTime(stream.started_at)
        if (hours < 17) return acc
        const duration = stream.duration
        const m = ((duration / 60 % 60) + minutes)
        const h = ((duration / 60 / 60) + hours + Math.floor(m / 60)) % 24
        return {hours: (acc.hours + h) / 2, minutes: (acc.minutes + (m % 60)) /2}
    }, {hours: 0, minutes: 0}) || {hours: 0, minutes: 0}, [streams])

    const stats = [
        { name: 'Heure de début', stat: `${averageStartTime.hours.toFixed()}h${averageStartTime.minutes.toFixed()}` },
        { name: 'Heure de début de jeu', stat: `${averageGameStartTime.hours.toFixed()}h${averageGameStartTime.minutes.toFixed()}` },
        { name: 'Heure de fin', stat: `${averageEndTime.hours.toFixed()}h${averageEndTime.minutes.toFixed()}` },
    ]
    return (
        <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">En moyenne sur le mois</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
