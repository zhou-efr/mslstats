import { Fragment, useMemo } from 'react'
import {
    CalendarIcon,
    EllipsisHorizontalIcon,
    MapPinIcon,
    ClockIcon,
    UserIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    VideoCameraIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Image from 'next/image';
import 'react-calendar/dist/Calendar.css';
import Link from 'next/link';
import { getLatestStream } from "@twitch/getLatestStream";
import { getCurrentStream } from '@twitch/getCurrentStream';
import { today } from '@internationalized/date';
import { getSession } from "@auth0/nextjs-auth0";
import { getUser } from "@mongo/user/getUser";
import GenericSelect from '@/components/GenericSelect';

const meetings = [
    {
        id: 1,
        date: 'January 10th, 2022',
        time: '5:00 PM',
        datetime: '2022-01-10T17:00',
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Starbucks',
    },
    // More meetings...
]

const days = [
    { date: '2021-12-27' },
    { date: '2021-12-28' },
    { date: '2021-12-29' },
    { date: '2021-12-30' },
    { date: '2021-12-31' },
    { date: '2022-01-01', isCurrentMonth: true },
    { date: '2022-01-02', isCurrentMonth: true },
    { date: '2022-01-03', isCurrentMonth: true },
    { date: '2022-01-04', isCurrentMonth: true },
    { date: '2022-01-05', isCurrentMonth: true },
    { date: '2022-01-06', isCurrentMonth: true },
    { date: '2022-01-07', isCurrentMonth: true },
    { date: '2022-01-08', isCurrentMonth: true },
    { date: '2022-01-09', isCurrentMonth: true },
    { date: '2022-01-10', isCurrentMonth: true },
    { date: '2022-01-11', isCurrentMonth: true },
    { date: '2022-01-12', isCurrentMonth: true, isToday: true },
    { date: '2022-01-13', isCurrentMonth: true },
    { date: '2022-01-14', isCurrentMonth: true },
    { date: '2022-01-15', isCurrentMonth: true },
    { date: '2022-01-16', isCurrentMonth: true },
    { date: '2022-01-17', isCurrentMonth: true },
    { date: '2022-01-18', isCurrentMonth: true },
    { date: '2022-01-19', isCurrentMonth: true },
    { date: '2022-01-20', isCurrentMonth: true },
    { date: '2022-01-21', isCurrentMonth: true },
    { date: '2022-01-22', isCurrentMonth: true, isSelected: true },
    { date: '2022-01-23', isCurrentMonth: true },
    { date: '2022-01-24', isCurrentMonth: true },
    { date: '2022-01-25', isCurrentMonth: true },
    { date: '2022-01-26', isCurrentMonth: true },
    { date: '2022-01-27', isCurrentMonth: true },
    { date: '2022-01-28', isCurrentMonth: true },
    { date: '2022-01-29', isCurrentMonth: true },
    { date: '2022-01-30', isCurrentMonth: true },
    { date: '2022-01-31', isCurrentMonth: true },
    { date: '2022-02-01' },
    { date: '2022-02-02' },
    { date: '2022-02-03' },
    { date: '2022-02-04' },
    { date: '2022-02-05' },
    { date: '2022-02-06' },
]

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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function getDateOfWeek(w, y) {
    var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week

    return new Date(y, 0, d);
}

const getMonthList = (month, year) => {
    const today = new Date();
    const basedMonth = month;

    // get the first day of the first week of the month
    const firstDayOfMonth = new Date(year, basedMonth, 1);
    const firstWeekOfMonth = firstDayOfMonth.getWeek();
    const firstDay = getDateOfWeek(firstWeekOfMonth, year);

    // console.log(firstDay.toLocaleDateString("fr-FR"));
    // console.log(firstDayOfMonth.toLocaleDateString("fr-FR"));
    // console.log(firstWeekOfMonth);

    // get the last day of the last week of the month
    const lastDayOfMonth = new Date(year, basedMonth + 1, 0);
    const lastWeekOfMonth = lastDayOfMonth.getWeek();
    const firstDayOfLastWeekOfMonth = getDateOfWeek(lastWeekOfMonth, year);
    const lastDay = new Date(firstDayOfLastWeekOfMonth.getTime() + 6 * 24 * 60 * 60 * 1000);

    // console.log(lastDay.toLocaleDateString("fr-FR"));
    // console.log(lastDayOfMonth.toLocaleDateString("fr-FR"));
    // console.log(lastWeekOfMonth);

    const basedMonthList = [];
    let i = firstDay;

    while (i <= lastDay) {
        basedMonthList.push({
            date: i.toLocaleDateString("fr-FR"),
            isCurrentMonth: i.getMonth() === basedMonth,
            isToday: i.toLocaleDateString("fr-FR") === today.toLocaleDateString("fr-FR"),
            isSelected: i.toLocaleDateString("fr-FR") === today.toLocaleDateString("fr-FR"),
        });
        i = new Date(i.getTime() + 24 * 60 * 60 * 1000);
    }

    return basedMonthList;
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    let streamer_id = ["798312463"]
    let streamer_name = ["mathieusommetlive"]
    if (session?.user) {
        const dbuser = await getUser(session.user.email);
        if (dbuser.followed_streams.length) {
            streamer_id = dbuser.followed_streams.map((stream) => stream.streamer_id);
            streamer_name = dbuser.followed_streams.map((stream) => stream.streamer_name);
        }
    }
    let streams = [];
    for (let i = 0; i < streamer_id.length; i++) {
        const temp = await getLatestStream(streamer_id[i], 31, "month");

        const current_stream = await getCurrentStream(streamer_id[i])
        if (current_stream) {
            temp[0].live = true;
            temp[0].thumbnail_url = current_stream.thumbnail_url;
            temp[0].url = "https://www.twitch.tv/".concat(streamer_name[i]);
        }

        streams = streams.concat(temp);
    }

    const today = new Date();
    const basedMonth = today.getMonth();
    const basedMonthList = getMonthList(basedMonth, today.getFullYear());
    const streams_by_day = {}
    const streamer_names = []

    for (const stream of streams) {
        const date = new Date(stream.published_at);
        const day = date.toLocaleDateString("fr-FR");
        if (!streams_by_day[day]) {
            streams_by_day[day] = [];
        }
        streams_by_day[day].push(stream);
        streamer_names.push(stream.user_login);
    }

    return {
        props: {
            streams: streams_by_day,
            basedMonth,
            basedMonthList,
            streamer_names
        },
    }
}

Date.prototype.getWeek = function () {
    let date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    let week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
}


export default function HomePage({ streams = [], basedMonth = 0, basedMonthList = [], streamer_names = [] }) {
    const [currentMonth, setCurrentMonth] = useState(basedMonth);
    const [monthList, setMonthList] = useState(basedMonthList);
    const [view, setView] = useState("week");
    const [streamers, setStreamers] = useState(streamer_names);

    const [value, onChange] = useState(new Date());
    const displayedStreams = useMemo(() => {
        let selectedWeek = value.getWeek();
        const selectedYear = value.getFullYear();
        const selectedDay = value.toLocaleDateString("fr-FR");
        let toDisplay = [];

        if (value.getDay() === 0) {
            selectedWeek = selectedWeek + 1;
        }

        // console.log(streams);
        // console.log(streams[selectedDay].filter((stream) => streamers.includes(stream.user_login)));

        if (view === "day") {
            toDisplay = streams[selectedDay]?.filter((stream) => streamers.includes(stream.user_login)) || [];
        }

        if (view === "week") {
            for (const stream in streams) {
                const date = new Date(streams[stream][0].published_at);
                let week = date.getWeek();
                const year = date.getFullYear();

                if (date.getDay() === 0) {
                    week = week + 1;
                }

                if (week === selectedWeek && year === selectedYear) {
                    toDisplay = toDisplay.concat(streams[stream]?.filter((stream) => streamers.includes(stream.user_login)) || []);
                }
            }
        }

        console.log(toDisplay);

        return toDisplay || [];
    }, [streamers, streams, value, view]);

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
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <div className="flex-auto text-sm font-semibold">{months[currentMonth]}</div>
                        <button
                            type="button"
                            onClick={() => handleMonthChange((currentMonth + 1) % 12)}
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
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
                    <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
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
                                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                                    dayIdx === days.length - 1 && 'rounded-br-lg'
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
                    <button
                        type="button"
                        className="mt-8 w-full rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add event
                    </button>
                </div>
                <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
                    {displayedStreams.map((meeting) => (
                        <li key={meeting.id} className="relative flex space-x-6 py-6 xl:static">
                            <Image width={56} height={56} src={meeting.thumbnail_url.replace("%{width}", "56").replace("%{height}", "56").replace("{width}", "56").replace("{height}", "56")} alt="" className="h-14 w-14 flex-none rounded-md" />
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
                                            <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd>
                                            <time dateTime={meeting.published_at}>
                                                {(new Date(meeting.published_at)).toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                            </time>
                                        </dd>
                                    </div>
                                    <div className="mt-2 flex items-center space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                        <dt className="mt-0.5">
                                            <span className="sr-only">Date</span>
                                            <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd>
                                            {meeting.user_name}
                                        </dd>
                                    </div>
                                    <div className="mt-2 flex items-center space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                        <dt className="mt-0.5">
                                            <span className="sr-only">Date</span>
                                            <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd>
                                            {meeting.duration}
                                        </dd>
                                    </div>
                                    <div className="mt-2 flex items-center space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                        <Link href={meeting.url} className={`flex gap-3 items-center ${meeting.live ? "text-red-500 hover:text-red-900" : "text-indigo-600 hover:text-indigo-900"} cursor-pointer`}>
                                            <dt className="mt-0.5">
                                                <span className="sr-only">Location</span>
                                                <VideoCameraIcon className={`h-5 w-5 ${meeting.live ? "text-red-500" : "text-gray-400"}`} aria-hidden="true" />
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
