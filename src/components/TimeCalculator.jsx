import {useState} from "react";

export default function TimeCalculator() {
    const [hours, setHours] = useState("0");
    const [minutes, setMinutes] = useState("0");
    const [seconds, setSeconds] = useState("0");
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [copied, setCopied] = useState(false);

    const handleHoursChange = (event) => {
        setCopied(false);
        setHours(event.target.value);
        setTotalSeconds(parseInt(event.target.value || "0") * 3600 + parseInt(minutes) * 60 + parseInt(seconds));
    }

    const handleMinutesChange = (event) => {
        setCopied(false);
        setMinutes(event.target.value);
        setTotalSeconds(parseInt(hours) * 3600 + parseInt(event.target.value || "0") * 60 + parseInt(seconds));
    }

    const handleSecondsChange = (event) => {
        setCopied(false);
        setSeconds(event.target.value);
        setTotalSeconds(parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(event.target.value || "0"));
    }

    return (
        <div className="bg-white shadow sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Time calculator</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                        Convertit une durée en secondes.
                    </p>
                </div>
                <form className="mt-5 sm:flex sm:items-center gap-3">
                    <div className="w-fit sm:max-w-xs">
                        <label htmlFor="hours" className="sr-only">
                            Heures
                        </label>
                        <input
                            type="hours"
                            name="number"
                            id="hours"
                            value={hours}
                            onChange={handleHoursChange}
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div className="w-fit sm:max-w-xs">
                        <label htmlFor="minutes" className="sr-only">
                            Minutes
                        </label>
                        <input
                            type="minutes"
                            name="number"
                            id="minutes"
                            value={minutes}
                            onChange={handleMinutesChange}
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div className="w-fit sm:max-w-xs">
                        <label htmlFor="seconds" className="sr-only">
                            Secondes
                        </label>
                        <input
                            type="seconds"
                            name="number"
                            id="seconds"
                            value={seconds}
                            onChange={handleSecondsChange}
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </form>
                <div className="mt-5 flex flex-wrap w-full items-center gap-3">

                    <div className="w-full sm:max-w-xs">
                        <label htmlFor="total" className="sr-only">
                            Total en secondes
                        </label>
                        <input
                            type="total"
                            name="number"
                            id="total"
                            readOnly={true}
                            value={totalSeconds}
                            className="block w-full rounded-md border-0  p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>

                    <button
                        onClick={async () => {
                            await navigator.clipboard.writeText(totalSeconds.toString());
                            setCopied(true);
                        }}
                        className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0 sm:w-auto"
                    >
                        {copied ? "Copié !" : "Copier"}
                    </button>
                </div>
            </div>
        </div>
    )
}
