import {getSession, withPageAuthRequired} from "@auth0/nextjs-auth0";
import {getUser} from "@mongo/user/getUser";
import {redirect, useRouter} from "next/navigation";
import {Fragment, useState} from "react";
import {Dialog, Transition} from '@headlessui/react'

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
    const { req, res } = context;
    const session = await getSession(req, res);

    if (!session) {
        redirect('/api/auth/login');
    }

    const user = await getUser(session.user.email);

    return {
        props: {
            user: {
                email: user.email,
                followed_streams: user.followed_streams,
            },
        },
    };
}
});


export default function SettingsPages({ user }) {
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const [stream, setStream] = useState('')
    const [occupied, setOccupied] = useState(false)

    const handleAddStream = async (e) => {
        e.preventDefault();
        if (user.followed_streams.includes(stream)) {
            alert('Ce stream est déjà suivi !')
            setOpen(false)
            return;
        }

        setOccupied(true)
        const response = await fetch('/api/db/followedstream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                streamer: stream,
            })
        })
        setOpen(false)
        setOccupied(false)
        setStream('')

        if (response.status === 201) {
            router.refresh();
            return;
        }

        alert('Une erreur est survenue !')
    }

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">Update your email</h3>
                                        <div className="mt-2 max-w-xl text-sm text-gray-500">
                                            <p>Change the email address you want associated with your account.</p>
                                        </div>
                                        <form className="mt-5 sm:flex sm:items-center" onSubmit={handleAddStream}>
                                            <div className="w-full sm:max-w-xs">
                                                <label htmlFor="stream" className="sr-only">
                                                    Nom du stream
                                                </label>
                                                <input
                                                    type="text"
                                                    name="stream"
                                                    id="email"
                                                    value={stream}
                                                    onChange={event => setStream(event.target.value)}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="mathieusommetlive"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto"
                                            >
                                                Save
                                            </button>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Streams suivies</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Liste des streams affichés sur la page d{"'"}accueil.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Ajouter un stream
                        </button>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Nom
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Supprimer</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {user.followed_streams.map((person, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {person.streamer_name}
                                                </td>
                                                {/*<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">*/}
                                                {/*    <a href="#" className="text-indigo-600 hover:text-indigo-900">*/}
                                                {/*        Supprimer*/}
                                                {/*    </a>*/}
                                                {/*</td>*/}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}