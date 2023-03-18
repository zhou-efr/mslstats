export default function MonthlyRecords({records}) {
    const posts = [
        {
            id: 1,
            title: 'Boost your conversion rate',
            href: '#',
            imageUrl: 'https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/noImage.png',
            date: 'Mar 16, 2020',
            stat: '3 min read',
        },
        // More posts...
    ]
    return (
        <div className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Au maximum ce
                        mois-ci</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        J{"'"}en profite pour rappeler que plus une discution dure longtemps, plus elle est
                        intéressante.
                    </p>
                </div>
                <div
                    className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {records.map((post) => (
                        <article
                            key={post.id}
                            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                        >
                            <img src={post.imageUrl} alt=""
                                 className="absolute inset-0 -z-10 h-full w-full object-cover"/>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"/>
                            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>

                            <div
                                className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                                <p className="mr-8">
                                    {post.date}
                                </p>
                                <div className="-ml-4 flex items-center gap-x-4">
                                    {post.stat}
                                </div>
                            </div>
                            <h3 className="mt-3 text-lg leading-6 text-white">
                                <a href={post.href}>
                                    <span className="absolute inset-0"/>
                                    <span className={"font-semibold"}>{post.title}</span> {post.name}
                                </a>
                            </h3>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
