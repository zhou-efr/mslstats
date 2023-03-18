"use client";
import {useState} from "react";
import clsx from "clsx";

export function AboutSection(props) {
    let [isExpanded, setIsExpanded] = useState(false)

    return (
        <section {...props}>
            <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
                <span className="ml-2.5">About</span>
            </h2>
            <p
                className={clsx(
                    'mt-2 text-base leading-7 text-slate-700',
                    !isExpanded && 'lg:line-clamp-4'
                )}
            >
                Ce site a été créé car j{"'"}apprécie beaucoup les lives de MSL et je voulais créer quelque chose de
                fun autour de ses lives. Je regarde principalement les rediffusions de lives et ce site me permet d{"'"}avoir
                une interface plus ergonomique que celle de Twitch.
            </p>
            {!isExpanded && (
                <button
                    type="button"
                    className="mt-2 hidden text-sm font-bold leading-6 text-indigo-500 hover:text-indigo-700 active:text-pink-900 lg:inline-block"
                    onClick={() => setIsExpanded(true)}
                >
                    Show more
                </button>
            )}
        </section>
    )
}
