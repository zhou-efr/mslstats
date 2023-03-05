import { getLatestStream } from "@twitch/getLatestStream";
import { getStreams } from "@mongo/getStreams";
import Link from "next/link";

export async function getServerSideProps(context) {
    const streams = await getLatestStream("798312463", 10);
    const dbstreams = await getStreams();

    let streamsToReturn = [];

    console.log(dbstreams);

    for (let i = 0; i < streams.length; i++) {
        const stream = streams[i];
        const dbstream = dbstreams.find(dbstream => dbstream.id === stream.id);

        streamsToReturn.push({ ...stream, registered: !!dbstream });
    }

    return {
        props: {
            streams: streamsToReturn,
        },
    }
}

export default function DataPages({ streams }) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Derniers streams</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Liste des derniers streams à catégoriser.
                    </p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Titre
                                    </th>
                                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                        Streamer
                                    </th>
                                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                        Début
                                    </th>
                                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                        Lien
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {streams.map((stream, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {stream.title}
                                        </td>
                                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{stream.user_name}</td>
                                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{(new Date(stream.published_at)).toLocaleDateString("fr")}</td>
                                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                                            <Link href={stream.url} className="text-indigo-600 hover:text-indigo-900 cursor-pointer" target={"_blank"}>
                                                lien
                                            </Link>
                                        </td>
                                        {
                                            !stream.registered &&
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <a href={`/data/register?streamid=${stream.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                    Edit
                                                </a>
                                            </td>
                                        }
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
