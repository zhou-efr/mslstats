import { Container } from "@/components/Container";
import { getStream } from "@twitch/getStream";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getGameList } from "@mongo/getGameList";
import GenericCombobox from "@/components/GenericCombobox";

export async function getServerSideProps(context) {
    const stream_id = context.query.streamid;
    const stream = await getStream(stream_id);
    const gamelist = await getGameList();

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

export default function RegisterPage({ stream, gamelist }) {
    const router = useRouter();

    const [registration, setRegistration] = useState({
        id: stream.id,
        title: stream.title,
        url: stream.url,
        duration: stream.duration,
        started_at: (new Date(stream.published_at)).getTime(),

        streamer_id: stream.user_id,
        streamer_name: stream.user_name,

        game_start: 0,
        game_end: 0,

        game_planned: "",
        game_played: "",
        game_secondary: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistration({ ...registration, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/db/streams", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registration),
        })

        if (res.status != 201) {
            console.log(res);
            alert("Internal error please retry");
            // router.refresh()
            return;
        }

        alert("Stream enregistré");
        router.push("/data")
    };

    return (
        <Container>
            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Stream info</h3>
                            <p className="mt-1 text-sm text-gray-500">Enregistrement de <span className="italic">{stream.title}</span>.</p>
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
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Game info</h3>
                            <p className="mt-1 text-sm text-gray-500">Enregistrement de <span className="italic">{stream.title}</span>.</p>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="grid grid-cols-6 gap-6">
                                {
                                    Object.keys(registration).filter((key) => key.toLocaleLowerCase().includes("game")).map((key, index) => {
                                        if (key === "game_start" || key === "game_end") {
                                            return (
                                                <div key={index} className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        {key} (s)
                                                    </label>
                                                    <input
                                                        type={"number"}
                                                        name={key}
                                                        id={key}
                                                        autoComplete={key}
                                                        onChange={handleChange}
                                                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            )
                                        }

                                        return (
                                            <div key={index} className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    {key}
                                                </label>
                                                <GenericCombobox
                                                    genericarray={gamelist}
                                                    query={registration[key]}
                                                    setQuery={(value) => setRegistration({ ...registration, [key]: value })}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end px-4 sm:px-0">
                    <button
                        type="button"
                        onClick={() => router.push("/data")}
                        className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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