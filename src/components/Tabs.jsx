import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { isAdministrator } from '@/lib/auth0/administrators';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
    const { user, error, isLoading } = useUser();

    const rooter = useRouter();
    const pathname = usePathname();

    const tabs = [
        { name: 'Home', href: '/', current: false },
        { name: 'Stats', href: '/stats', current: false },
        { name: 'Games', href: '/games', current: false },
        { name: 'Paramètres', href: '/settings', current: false, auth: true },
        { name: 'API', href: '/apiroute', current: false, auth: true, isAdmin: true },
        { name: 'Data', href: '/data', current: false, auth: true, isAdmin: true },
        { name: 'About', href: '/about', current: false },
    ]

    tabs.forEach((tab) => {
        if (pathname.includes(tab.href.toLocaleLowerCase())) {
            tab.current = true;
        }

        if (tab.href === '/') {
            tab.current = pathname === '/';
        }
    })

    const handleChooseTab = (tab) => {
        rooter.push(tab.href);
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    // console.log(user);

    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-red-nekorporation-500 focus:ring-red-nekorporation-500"
                    defaultValue={tabs.find((tab) => tab.current)?.name}
                    onChange={(e) => handleChooseTab(tabs.find((tab) => tab.name === e.target.value))}
                >
                    {tabs.map((tab) => {
                        if ((tab.auth && !user) || (tab.isAdmin && !isAdministrator(user.email))) {
                            return null;
                        }

                        return (
                            <option key={tab.name}>{tab.name}</option>
                        )
                    })}
                </select>
                <a
                    href={!!user ? "/api/auth/logout" : "/api/auth/login"}
                    className={classNames(
                        'mt-8',
                        'text-gray-500 hover:text-gray-700',
                        'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                >
                    Log {!!user ? "out" : "in"} <span aria-hidden="true">&rarr;</span>
                </a>
            </div>
            <div className="hidden sm:block">
                <nav className="flex space-x-4" aria-label="Tabs">
                    {tabs.map((tab) => {
                        if ((tab.auth && !user) || (tab.isAdmin && !isAdministrator(user.email))) {
                            return null;
                        }

                        return (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.current ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
                                    'rounded-md px-3 py-2 text-sm font-medium'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                {tab.name}
                            </Link>
                        )
                    })}
                    <a
                        href={!!user ? "/api/auth/logout" : "/api/auth/login"}
                        className={classNames(
                            'text-gray-500 hover:text-gray-700',
                            'rounded-md px-3 py-5 md:py-2 text-sm font-medium',

                        )}
                    >
                        Log {!!user ? "out" : "in"} <span aria-hidden="true">&rarr;</span>
                    </a>
                </nav>
            </div>
        </div>
    )
}
