"use client";
import clsx from 'clsx';
import { useState } from 'react'

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
                Ce site a été créé car j{"'"}apprécie beaucoup les lives de Mathieu Sommet et je voulais créer quelque chose de
                drôle autour de ses diffusions en direct. Le but de ce site n{"'"}est pas de fournir des statistiques toxiques
                ou de nuire à l{"'"}expérience de streaming de Mathieu Sommet, mais plutôt de créer une interface coolos et
                pratique.
            </p>
            {!isExpanded && (
                <button
                    type="button"
                    className="mt-2 hidden text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900 lg:inline-block"
                    onClick={() => setIsExpanded(true)}
                >
                    Show more
                </button>
            )}
        </section>
    )
}
