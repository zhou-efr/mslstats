import {getLatestStream} from "@twitch/getLatestStream";
import Link from "next/link";
import {getSession, withPageAuthRequired} from "@auth0/nextjs-auth0";
import {getStreams} from "@mongo/Stream/getStreams";
import {isAdministrator} from "@/lib/auth0/administrators";

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        const session = await getSession(context.req, context.res);
        if (!session) {
            return {
                redirect: {
                    destination: '/api/auth/login',
                    permanent: false,
                },
            }

        }
        if (!isAdministrator(session.user.email)) {
            return {
                redirect: {
                    destination: '/api/auth/login',
                    permanent: false,
                },
            }
        }
    const streamer_id = "798312463"
        const streams = await getLatestStream(streamer_id, 100);
        const dbstreams = await getStreams();

    let streamsToReturn = [];

    // console.log(dbstreams);

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
}});

export default function DataPages({ streams = [] }) {
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
                                            <Link href={stream.url} className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
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