import {getGames} from "@mongo/Game/getGames";
import Link from "next/link";
import Image from "next/image";

export const getServerSideProps = async () => {
    const rawgames = await getGames();

    const games = rawgames.map(game => {
        const {_doc} = game;
        return {
            ..._doc,
            _id: _doc._id.toString(),
            imageUrl: "https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/gameNotFound.png",
            number: 0
        };
    }).sort((a, b) => (a.title > b.title) ? 1 : -1);


    return {
        props: {
            games,
        },
    };
}

export default function GamesPage({games}) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 px-12">
            {games.map((person) => (
                <div
                    key={person._id}
                    className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                >
                    <div className="flex-shrink-0">
                        <Image className="h-10 w-10 rounded-full" src={person.thumbnail} alt="" width={40} height={40}/>
                    </div>
                    <div className="min-w-0 flex-1">
                        <Link href={"/games/" + person._id} className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true"/>
                            <p className="text-sm font-medium text-gray-900">{person.title}</p>
                            <p className="truncate text-sm text-gray-500">{person.numberOfSessions} streams </p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
