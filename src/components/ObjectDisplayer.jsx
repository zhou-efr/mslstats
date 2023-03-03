export default function ObjectDisplayer({ object, name, subtext }) {
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">{name}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{subtext}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    {Object.keys(object).map((key, index) => (
                        <div key={index} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">{key}</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{object[key]}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}
