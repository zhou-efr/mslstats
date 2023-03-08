import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from './Container'
import { AboutSection } from './AboutSection'

import mslicon from '@/images/msl.jpg'
import Tabs from './Tabs'

export function Layout({ children }) {
  let hosts = ['zhou-efr']

  return (
    <>
      <header className="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120">
        <div className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-slate-500">Created by</span>
          <span className="mt-6 flex gap-6 font-bold text-slate-900">
            {hosts.map((host, hostIndex) => (
              <Fragment key={host}>
                {hostIndex !== 0 && (
                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                )}
                {host}
              </Fragment>
            ))}
          </span>
        </div>
        <div className="relative z-10 mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:py-12 lg:px-8 xl:px-12">
          <Link
            href="/"
            className="relative mx-auto block w-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"
            aria-label="Homepage"
          >
            <Image
              className="w-full"
              src={mslicon}
              alt=""
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
              priority
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl" />
          </Link>
          <div className="mt-10 text-center lg:mt-12 lg:text-left">
            <p className="text-xl font-bold text-slate-900">
              <Link href="/">Mathieu Sommet Live</Link>
            </p>
            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
              Maître Filou spécialisé Coolos. Active le mode difficile ou s{"'"}ennuie.
            </p>
          </div>
          <AboutSection className="mt-12 hidden lg:block" />
          <section className="mt-10 lg:mt-12">
            <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
              <span className="ml-2.5">Join us</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />
            <ul
              role="list"
              className="mt-4 flex justify-center gap-10 text-base font-medium leading-7 text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
            >
              {[
                ['Twitch', TwitchIcon, 'https://www.twitch.tv/mathieusommetlive'],
                ['Youtube', YoutubeIcon, 'https://www.youtube.com/@MathieuSommetLive'],
                ['Discord', DiscordIcon, 'https://discord.gg/3HHDBy7gqR'],
                ['Twitter', TwitterIcon, 'https://twitter.com/Mathieu_Sommet'],
                ['Instagram', InstagramIcon, 'https://www.instagram.com/mathieusommet.cc'],
              ].map(([label, Icon, link]) => (
                <li key={label} className="flex">
                  <Link
                    href={link}
                    className="group flex items-center"
                    aria-label={label}
                  >
                    <Icon className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600" />
                    <span className="hidden sm:ml-3 sm:block">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-10 lg:mt-12">
            <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
              <span className="ml-2.5">For any complies</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />
            <ul
              role="list"
              className="mt-4 flex justify-center gap-10 text-base font-medium leading-7 text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
            >
              {[
                ['Github', GithubIcon, 'https://github.com/zhou-efr/mslstats/issues'],
              ].map(([label, Icon, link]) => (
                <li key={label} className="flex">
                  <Link
                    href={link}
                    className="group flex items-center"
                    aria-label={label}
                  >
                    <Icon className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600" />
                    <span className="hidden sm:ml-3 sm:block">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </header>
      <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120">
        <div className="relative">
          <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
            <Container>
              <Tabs />
            </Container>
            <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100 py-10">
              {children}
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-slate-200 bg-slate-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
          <AboutSection />
          <h2 className="mt-8 flex items-center font-mono text-sm font-medium leading-7 text-slate-900">

            <span className="ml-2.5">Hosted by</span>
          </h2>
          <div className="mt-2 flex gap-6 text-sm font-bold leading-7 text-slate-900">
            {hosts.map((host, hostIndex) => (
              <Fragment key={host}>
                {hostIndex !== 0 && (
                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                )}
                {host}
              </Fragment>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
