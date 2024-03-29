/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {Combobox} from '@headlessui/react'

const people = [
    { id: 1, name: 'Leslie Alexander' },
    // More users...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function GenericCombobox({ genericarray, query, setQuery }) {
    const filtered = query === '' ?
        (
            genericarray
        ) : (
            genericarray.filter((element) => element?.toLowerCase()?.includes(query?.toLowerCase()) || "")
        )

    return (
        <Combobox as="div" value={query} onChange={setQuery} nullable>
            {/* <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Combobox.Label> */}
            <div className="relative mt-2">
                <Combobox.Input
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-nekorporation-500 sm:text-sm sm:leading-6"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={query}
                />
                <Combobox.Button
                    className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                </Combobox.Button>
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {!!query && query.length > 0 && (
                        <Combobox.Option
                            value={query}
                            className={({active}) =>
                                classNames(
                                    'relative cursor-default select-none py-2 pl-3 pr-9',
                                    active ? 'bg-red-nekorporation-500 text-white' : 'text-gray-900'
                                )
                            }
                        >
                            Create {'"'}{query}{'"'}
                        </Combobox.Option>
                    )}
                    {filtered.map((person, index) => (
                        <Combobox.Option
                            key={index}
                            value={person}
                            className={({ active }) =>
                                classNames(
                                    'relative cursor-default select-none py-2 pl-3 pr-9',
                                    active ? 'bg-red-nekorporation-500 text-white' : 'text-gray-900'
                                )
                            }
                        >
                            {({ active, selected }) => (
                                <>
                                    <span className={classNames('block truncate', selected && 'font-semibold')}>{person}</span>

                                    {selected && (
                                        <span
                                            className={classNames(
                                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                                active ? 'text-white' : 'text-red-nekorporation-500'
                                            )}
                                        >
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    )}
                                </>
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </div>
        </Combobox>
    )
}
