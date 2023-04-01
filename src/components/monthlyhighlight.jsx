const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]

export default function MonthlyHighlight({ month }) {

    return (
        <>
            {month === 2 && <div className="relative isolate px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-14">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div
                            className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                            Ce mois ci en exclusivité sur <em>Mathieu Sommet Live</em>.
                        </div>
                    </div>
                    <div className="text-center flex flex-col items-center gap-3">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Ca pique Endoloris...
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600  ">
                            C{"'"}est après avoir enflammé les salles de Poudlard que Maltazard Voldesub revient
                            sous le pseudonyme de <span className={"italic inline"}>PoliceMan</span> avec un nouveau
                            single
                            pour ravir vos oreilles.
                        </p>
                        <audio controls
                               src={"https://github.com/zhou-efr/CDN/blob/main/mslstats/songs/capiqueendoloris.m4a?raw=true"}/>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="https://www.twitch.tv/videos/1755622208"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Voir le stream
                            </a>
                            <a href="https://clips.twitch.tv/AntsyOddYakinikuAliens-fJlAOzeqmId0XgTW"
                               className="text-sm font-semibold leading-6 text-gray-900">
                                Voir l{"'"}extrait <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                    <svg
                        className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                        viewBox="0 0 1155 678"
                    >
                        <path
                            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                            fillOpacity=".3"
                            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                        />
                        <defs>
                            <linearGradient
                                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                                x1="1155.49"
                                x2="-78.208"
                                y1=".177"
                                y2="474.645"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#9089FC" />
                                <stop offset={1} stopColor="#FF80B5" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>}
        </>
    )
}
