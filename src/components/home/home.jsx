"use client";
import React, {useMemo, useState} from "react";
import GenericSelect from "@/components/GenericSelect";
import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
    UserIcon,
    VideoCameraIcon
} from "@heroicons/react/20/solid";
import ImageWithFallback from "@/components/imageWithFallBack";
import Image from "next/image";
import Link from "next/link";
import {getWeek} from "@/utils/getweek";
import {getMonthList} from "@/utils/getmonthlist";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
]

export function Home({streams = {}, basedMonth = 0, basedMonthList = [], streamer_names = []}) {
    const [currentMonth, setCurrentMonth] = useState(basedMonth);
    const [monthList, setMonthList] = useState(basedMonthList);
    const [view, setView] = useState("week");
    const [streamers, setStreamers] = useState(streamer_names);

    const [value, onChange] = useState(new Date());
    const displayedStreams = useMemo(() => {
        let selectedWeek = getWeek(value);
        const selectedYear = value.getFullYear();
        const selectedDay = value.toLocaleDateString("fr-FR");
        let toDisplay = [];

        if (value.getDay() === 0) {
            selectedWeek = selectedWeek + 1;
        }

        // console.log(streams);
        // console.log(streams[selectedDay].filter((stream) => streamers.includes(stream.user_login)));

        if (view === "day") {
            toDisplay = streams[selectedDay]?.filter((stream) => {
                console.log(streamers.includes(stream.user_login))
                return streamers.includes(stream.user_login)
            }) || [];
        }

        if (view === "week") {
            for (const stream in streams) {
                const date = new Date(streams[stream][0].published_at);
                let week = getWeek(date);
                const year = date.getFullYear();

                if (date.getDay() === 0) {
                    week = week + 1;
                }

                if (week === selectedWeek && year === selectedYear) {
                    toDisplay = toDisplay.concat(streams[stream]?.filter((stream) => streamers.includes(stream.user_login)) || []);
                }
            }
        }

        return toDisplay || [];
    }, [streamers, streams, value, view]);

    const mslProgUrl = useMemo(() => `https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/prog/msl/${("0" + getWeek(value)).slice(-2)}-${value.getFullYear()}.jpg`, [value]);
    const ponceProgUrl = useMemo(() => `https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/prog/ponce/${("0" + getWeek(value)).slice(-2)}-${value.getFullYear()}.jpg`, [value]);

    const handleMonthChange = (month) => {
        setCurrentMonth(month);
        setMonthList(getMonthList(month, new Date().getFullYear()));
    }

    const handleDateChange = (date) => {
        const dateArray = date.split("/");
        const newDate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
        onChange(newDate);
        const currentMonthList = monthList.map((item) => {
            return {
                ...item,
                isSelected: item.date === date,
            }
        });
        setMonthList(currentMonthList);
    }

    return (
        <div className='px-8 flex flex-col items-center lg:items-start'>
            <div className="flex items-center gap-4">
                <h2 className="text-base font-semibold leading-6 text-gray-900">Streams de la semaine</h2>
                <GenericSelect
                    value={view}
                    onChange={(e) => setView(e.target.value)}
                    label="Voir par"
                >
                    <option value={"week"}>Semaines</option>
                    <option value={"day"}>Jours</option>
                </GenericSelect>
            </div>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                    <div className="flex items-center text-gray-900">
                        <button
                            type="button"
                            onClick={() => handleMonthChange((currentMonth - 1) % 12)}
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Previous month</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                        </button>
                        <div className="flex-auto text-sm font-semibold">{months[currentMonth]}</div>
                        <button
                            type="button"
                            onClick={() => handleMonthChange((currentMonth + 1) % 12)}
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    <div
                        className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                        {monthList.map((day, dayIdx) => (
                            <button
                                key={day.date}
                                type="button"
                                onClick={() => handleDateChange(day.date)}
                                className={classNames(
                                    'py-1.5 hover:bg-gray-100 focus:z-10',
                                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                                    (day.isSelected || day.isToday) && 'font-semibold',
                                    day.isSelected && 'text-white',
                                    !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                                    !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                                    day.isToday && !day.isSelected && 'text-indigo-600',
                                    dayIdx === 0 && 'rounded-tl-lg',
                                    dayIdx === 6 && 'rounded-tr-lg',
                                    dayIdx === monthList.length - 7 && 'rounded-bl-lg',
                                    dayIdx === monthList.length - 1 && 'rounded-br-lg'
                                )}
                            >
                                <time
                                    dateTime={day.date}
                                    className={classNames(
                                        'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                                        day.isSelected && day.isToday && 'bg-indigo-600',
                                        day.isSelected && !day.isToday && 'bg-gray-900'
                                    )}
                                >
                                    {day.date.split('/')[0]}
                                </time>
                            </button>
                        ))}
                    </div>
                    <ImageWithFallback
                        className="mt-4"
                        width={500}
                        height={500}
                        src={mslProgUrl}
                        fallbackSrc={`https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/noImage.png`}
                    />
                    {
                        streamer_names.includes("ponce") && <ImageWithFallback
                            className="mt-4"
                            width={500}
                            height={500}
                            src={ponceProgUrl}
                            fallbackSrc={`https://raw.githubusercontent.com/zhou-efr/CDN/main/mslstats/images/noImage.png`}
                        />
                    }
                </div>
                <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
                    {displayedStreams.map((meeting) => (
                        <li key={meeting.id} className="relative flex space-x-6 py-6 xl:static">
                            <Image width={56} height={56}
                                   src={meeting.thumbnail_url.replace("%{width}", "56").replace("%{height}", "56").replace("{width}", "56").replace("{height}", "56")}
                                   alt="" className="h-14 w-14 flex-none rounded-md"/>
                            <div className="flex-auto">
                                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                                    <Link href={meeting.url} className="hover:text-indigo-900 cursor-pointer">
                                        {meeting.title}
                                    </Link>
                                </h3>
                                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                                    <div className="flex items-start space-x-3">
                                        <dt className="mt-0.5">
                                            <span className="sr-only">Date</span>
                                            <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        </dt>
                                        <dd>
                                            <time dateTime={meeting.published_at}>
                                                {(new Date(meeting.published_at)).toLocaleDateString("fr-FR", {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </time>
                                        </dd>
                                    </div>
                                    <div
                                        className="mt-2 flex items-center space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                        <dt className="mt-0.5">
                                            <span className="sr-only">Date</span>
                                            <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        </dt>
                                        <dd>
                                            {meeting.user_name}
                                        </dd>
                                    </div>
                                    <div
                                        className="mt-2 flex items-center space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                        <dt className="mt-0.5">
                                            <span className="sr-only">Date</span>
                                            <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        </dt>
                                        <dd>
                                            {meeting.duration}
                                        </dd>
                                    </div>
                                    <div
                                        className="mt-2 flex items-center space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                        <Link href={meeting.url}
                                              className={`flex gap-3 items-center ${meeting.live ? "text-red-500 hover:text-red-900" : "text-indigo-600 hover:text-indigo-900"} cursor-pointer`}>
                                            <dt className="mt-0.5">
                                                <span className="sr-only">Location</span>
                                                <VideoCameraIcon
                                                    className={`h-5 w-5 ${meeting.live ? "text-red-500" : "text-gray-400"}`}
                                                    aria-hidden="true"/>
                                            </dt>
                                            <dd>

                                                {meeting.live ? "Live" : "Lien"}
                                            </dd>

                                        </Link>
                                    </div>
                                </dl>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
