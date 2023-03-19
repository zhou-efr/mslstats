"use client";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Link from "next/link";

const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export const MonthSlider = ({month}) => {
    return (
        <div className="flex items-center text-gray-900 w-48">
            <Link
                href={`/stats/${(month + 12 - 1) % 12}`}
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
            </Link>
            <div className="flex-auto text-center text-sm font-semibold">{months[month]}</div>
            <Link
                href={`/stats/${(month + 1) % 12}`}
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
            </Link>
        </div>
    )
}