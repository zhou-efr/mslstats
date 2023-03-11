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
    return `${hours}h${minutes}m${sec}s`
}

const durationToTime = (duration) => {
    const hours = Math.floor(duration / 60 / 60)
    const minutes = Math.floor(duration / 60 % 60)
    return `${hours}h${minutes}`
}

export default function StatTable({stats}) {
    return (
        <div className="px-4 sm:px-6 lg:px-8 my-8 w-full">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Statistiques</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur quo, repellendus!
                    </p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Name
                                </th>
                                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Moyenne
                                </th>
                                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Mediane
                                </th>
                                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Min
                                </th>
                                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Max
                                </th>
                                <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                    Total
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {stats.map((stat, index) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {stat.name}
                                    </td>
                                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{stat.average}</td>
                                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{stat.median}</td>
                                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{stat.min}</td>
                                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{stat.max}</td>
                                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{stat.total}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
