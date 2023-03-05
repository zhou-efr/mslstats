import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
    const rooter = useRouter();
    const pathname = usePathname();

    const tabs = [
        { name: 'Home', href: '/', current: false },
        { name: 'Stats', href: '/stats', current: false },
        { name: 'API', href: '/apiroute', current: false },
        { name: 'Data', href: '/data', current: false },
        { name: 'About', href: '/about', current: false },
    ]

    tabs.forEach((tab) => {
        if (pathname.includes(tab.href.toLocaleLowerCase())) {
            tab.current = true;
        }

        if (tab.href === '/') {
            if (pathname === '/') {
                tab.current = true;
            } else {
                tab.current = false;
            }
        }
    })

    const handleChooseTab = (tab) => {
        rooter.push(tab.href);
    }

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
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={tabs.find((tab) => tab.current).name}
                    onChange={(e) => handleChooseTab(tabs.find((tab) => tab.name === e.target.value))}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <nav className="flex space-x-4" aria-label="Tabs">
                    {tabs.map((tab) => (
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
                    ))}
                </nav>
            </div>
        </div>
    )
}
