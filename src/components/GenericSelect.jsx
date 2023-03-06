

export default function GenericSelect({ children, value, onChange, label, className }) {
    return (
        <div className={"relative " + className}>
            <label
                htmlFor="generic-select"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
            >
                {label}
            </label>
            <select
                id="generic-select"
                name="generic-select"
                value={value}
                onChange={onChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Jane Smith"
            >
                {children}
            </select>
        </div>
    )
}