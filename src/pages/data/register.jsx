import {Container} from "@/components/Container";
import {getStream} from "@twitch/getStream";
import {useState} from "react";
import {useRouter} from "next/navigation";
import GenericCombobox from "@/components/GenericCombobox";
import {getSession, withPageAuthRequired} from "@auth0/nextjs-auth0";
import {isAdministrator} from "@/lib/auth0/administrators";
import TimeCalculator from "@/components/TimeCalculator";
import {getGames} from "@mongo/Game/getGames";

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

        const stream_id = context.query.streamid;
        const stream = await getStream(stream_id);
        const gamelist = (await getGames()).map(game => game.title);

        // 4h11m44s to number second
        const duration = stream.duration.split("h").map((e) => e.split("m").map((e) => e.split("s"))).flat().filter((e) => e != "").map((e) => parseInt(e));
        const duration_sec = duration[0] * 3600 + duration[1] * 60 + duration[2];

        stream.duration = duration_sec;

        return {
            props: {
                stream,
                gamelist
            },
        }
    }
})

export default function RegisterPage({stream = {}, gamelist = []}) {
    const router = useRouter();
    const [occupied, setOccupied] = useState(false);
    const [registration, setRegistration] = useState({
        id: stream.id,
        title: stream.title,
        url: stream.url,
        duration: stream.duration,
        started_at: (new Date(stream.published_at)).getTime(),

        streamer_id: stream.user_id,
        streamer_name: stream.user_name,

        games: [{
            title: "",
            start: 0,
            end: 0,
            planned: false,
        }],
    });

    const handleChange = (e) => {
        if (occupied) return;
        const { name, value } = e.target;
        setRegistration({ ...registration, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (occupied) return;
        setOccupied(true);
        const registered_stream = {
            id: registration.id,
            title: registration.title,
            url: registration.url,
            duration: registration.duration,
            started_at: registration.started_at,

            streamer_id: registration.streamer_id,
            streamer_name: registration.streamer_name,

            games: registration.games.map(game => {
                return {
                    title: game.title,
                    start: game.start,
                    end: game.end,
                    planned: game.planned,
                }
            }).filter(game => game.title !== "").sort((a, b) => a.start - b.start),
        }

        const res = await fetch("/api/db/streams", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registered_stream),
        })

        if (res.status != 201) {
            console.log(res);
            alert("Internal error please retry");
            setOccupied(false);
            // router.refresh()
            return;
        }

        // await fetch("/api/db/games", {
        //     method: 'POST',
        // })

        alert("Stream enregistré");
        router.push("/data")
    };

    const handleAddGame = () => {
        if (occupied) return;
        setRegistration({
            ...registration, games: [...registration.games, {
                title: "",
                start: 0,
                end: 0,
                planned: false,
            }]
        });
    }

    const handleRemoveGame = (index) => {
        if (occupied) return;
        setRegistration({...registration, games: registration.games.filter((_, i) => i !== index)});
    }

    const handleGameChange = (index, key, value) => {
        if (occupied) return;
        const newGames = registration.games.map((game, i) => {
            if (i === index) {
                return {...game, [key]: value};
            }
            return game;
        });
        setRegistration({...registration, games: newGames});
    }

    return (
        <Container>
            <TimeCalculator/>
            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Stream info</h3>
                            <p className="mt-1 text-sm text-gray-500">Enregistrement de <span
                                className="italic">{stream.title}</span>.</p>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="grid grid-cols-6 gap-6">
                                {
                                    Object.keys(registration).filter((key) => !key.toLocaleLowerCase().includes("game") && !key.toLocaleLowerCase().includes("streamer")).map((key, index) => {
                                        if (key === "started_at") {
                                            return (
                                                <div key={index} className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        {key}
                                                    </label>
                                                    <input
                                                        type={"datetime-local"}
                                                        name={key}
                                                        id={key}
                                                        autoComplete={key}
                                                        value={(new Date(registration[key])).toISOString().slice(0, 16)}
                                                        onChange={handleChange}
                                                        readOnly
                                                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            )
                                        }

                                        let inputtype = "text";
                                        let label = key;

                                        if (key === "duration") {
                                            inputtype = "number"
                                            label = "Duration (s)"
                                        }

                                        return (
                                            <div key={index} className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    {label}
                                                </label>
                                                <input
                                                    type={inputtype}
                                                    name={key}
                                                    id={key}
                                                    autoComplete={key}
                                                    value={registration[key]}
                                                    onChange={handleChange}
                                                    readOnly
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Streamer info</h3>
                            <p className="mt-1 text-sm text-gray-500">Enregistrement de <span className="italic">{stream.title}</span>.</p>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="grid grid-cols-6 gap-6">
                                {
                                    Object.keys(registration).filter((key) => key.toLocaleLowerCase().includes("streamer")).map((key, index) => {
                                        return (
                                            <div key={index} className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    {key}
                                                </label>
                                                <input
                                                    type="text"
                                                    name={key}
                                                    id={key}
                                                    autoComplete={key}
                                                    value={registration[key]}
                                                    onChange={handleChange}
                                                    readOnly
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {
                    registration.games.map((game, index) => (
                        <div key={index} className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">Game info</h3>
                                    <p className="mt-1 text-sm text-gray-500">Enregistrement de <span
                                        className="italic">{stream.title}</span>.</p>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveGame(index)}
                                        className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        Remove game
                                    </button>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Game title
                                            </label>
                                            <GenericCombobox
                                                genericarray={gamelist}
                                                query={registration.games[index].title}
                                                setQuery={(value) => handleGameChange(index, "title", value)}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Start (s)
                                            </label>
                                            <input
                                                required={true}
                                                type={"number"}
                                                name={"start"}
                                                id={"start"}
                                                onChange={(e) => handleGameChange(index, "start", e.target.value)}
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                End (s)
                                            </label>
                                            <input
                                                required={true}
                                                type={"number"}
                                                name={"end"}
                                                id={"end"}
                                                onChange={(e) => handleGameChange(index, "end", e.target.value)}
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Is planned ?
                                            </label>
                                            <input
                                                type={"checkbox"}
                                                name={"planned"}
                                                id={"planned"}
                                                onChange={(e) => handleGameChange(index, "planned", e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                // className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

                <div className="flex justify-end px-4 sm:px-0">
                    <button
                        type="button"
                        onClick={handleAddGame}
                        className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        add game
                    </button>
                    <button
                        type="button"
                        onClick={occupied ? () => router.push("/data") : undefined}
                        className="ml-3 rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </form>
        </Container>
    )
}
