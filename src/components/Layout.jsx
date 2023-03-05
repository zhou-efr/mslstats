import { Fragment, useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from './Container'

import mslicon from '@/images/msl.jpg'
import Tabs from './Tabs'

function randomBetween(min, max, seed = 1) {
  return () => {
    let rand = Math.sin(seed++) * 10000
    rand = rand - Math.floor(rand)
    return Math.floor(rand * (max - min + 1) + min)
  }
}

function DiscordIcon(props) {
  return (
    <svg viewBox="0 0 256 256" {...props}>
      <path d="M216.715 46.1751C200.398 38.6883 182.901 33.1724 164.607 30.0133C164.274 29.9523 163.941 30.1047 163.769 30.4094C161.519 34.4117 159.026 39.633 157.281 43.7369C137.604 40.7911 118.029 40.7911 98.7554 43.7369C97.0096 39.5418 94.4265 34.4117 92.1661 30.4094C91.9945 30.1148 91.6617 29.9624 91.3285 30.0133C73.0444 33.1623 55.5473 38.6782 39.2206 46.1751C39.0793 46.236 38.9582 46.3377 38.8777 46.4697C5.68951 96.0522 -3.40214 144.416 1.05792 192.18C1.0781 192.414 1.20928 192.637 1.39091 192.779C23.2876 208.86 44.4982 218.622 65.315 225.093C65.6481 225.194 66.0011 225.073 66.2131 224.798C71.1374 218.074 75.5268 210.983 79.2904 203.527C79.5125 203.09 79.3005 202.572 78.8466 202.399C71.8841 199.758 65.2544 196.538 58.8771 192.881C58.3727 192.587 58.3323 191.865 58.7964 191.52C60.1384 190.514 61.4807 189.468 62.7622 188.411C62.994 188.218 63.3171 188.178 63.5897 188.299C105.486 207.428 150.843 207.428 192.245 188.299C192.517 188.167 192.84 188.208 193.082 188.401C194.364 189.458 195.706 190.514 197.058 191.52C197.522 191.865 197.492 192.587 196.988 192.881C190.61 196.609 183.981 199.758 177.008 202.389C176.554 202.562 176.352 203.09 176.574 203.527C180.419 210.973 184.808 218.063 189.642 224.788C189.843 225.073 190.207 225.194 190.54 225.093C211.457 218.622 232.668 208.86 254.565 192.779C254.756 192.637 254.878 192.424 254.898 192.19C260.236 136.97 245.957 89.0024 217.048 46.4797C216.977 46.3377 216.856 46.236 216.715 46.1751ZM85.5469 163.097C72.9333 163.097 62.5401 151.517 62.5401 137.295C62.5401 123.073 72.7318 111.493 85.5469 111.493C98.4626 111.493 108.755 123.175 108.553 137.295C108.553 151.517 98.3617 163.097 85.5469 163.097ZM170.611 163.097C157.997 163.097 147.604 151.517 147.604 137.295C147.604 123.073 157.796 111.493 170.611 111.493C183.527 111.493 193.819 123.175 193.617 137.295C193.617 151.517 183.527 163.097 170.611 163.097Z" />
    </svg>
  )
}

function TwitchIcon(props) {
  return (
    <svg viewBox="0 0 256 256" {...props}>
      <path d="M191.81 50.2856H173.514V105.143H191.81V50.2856Z" />
      <path d="M123.201 50.2856H141.497V105.143H123.201V50.2856Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M63.7395 0L18 45.7143V210.286H72.8874V256L118.627 210.286H155.219L237.55 128V0H63.7395ZM219.254 118.857L182.662 155.429H146.071L114.053 187.429V155.429H72.8874V18.2857H219.254V118.857Z" />
    </svg>

  )
}

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 256 256" {...props}>
      <path d="M229.792 75.7851C229.948 78.042 229.948 80.2988 229.948 82.5764C229.948 151.977 177.115 232.016 80.5077 232.016V231.975C51.9696 232.016 24.0244 223.842 0 208.429C4.14967 208.928 8.32013 209.178 12.501 209.188C36.151 209.209 59.1249 201.274 77.7308 186.661C55.2561 186.235 35.5478 171.581 28.6628 150.188C36.5358 151.706 44.6479 151.394 52.3752 149.283C27.8724 144.333 10.2442 122.804 10.2442 97.8023V97.1367C17.5451 101.203 25.7196 103.46 34.0813 103.71C11.0034 88.2861 3.88966 57.5849 17.8259 33.5813C44.4919 66.3938 83.8357 86.3413 126.071 88.4525C121.838 70.2107 127.62 51.0952 141.265 38.2718C162.419 18.3866 195.689 19.4059 215.575 40.5494C227.337 38.2302 238.611 33.9141 248.928 27.7988C245.007 39.9566 236.801 50.2839 225.84 56.8464C236.25 55.6192 246.421 52.832 256 48.5783C248.949 59.1449 240.067 68.349 229.792 75.7851Z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 256 256" {...props}>
      <path d="M128.012 0C93.249 0 88.8863 0.152004 75.2328 0.773344C61.606 1.39735 52.3045 3.5547 44.1658 6.72007C35.747 9.98944 28.6056 14.3628 21.4909 21.4802C14.3708 28.595 9.99743 35.7364 6.7174 44.1525C3.54403 52.2939 1.38401 61.598 0.770674 75.2195C0.16 88.8729 0 93.2383 0 128.001C0 162.764 0.154671 167.114 0.773344 180.767C1.40002 194.394 3.55737 203.695 6.72007 211.834C9.99211 220.253 14.3655 227.394 21.4829 234.509C28.595 241.629 35.7364 246.013 44.1498 249.283C52.2939 252.448 61.598 254.605 75.2221 255.229C88.8756 255.851 93.2356 256.003 127.996 256.003C162.762 256.003 167.111 255.851 180.765 255.229C194.391 254.605 203.703 252.448 211.848 249.283C220.264 246.013 227.394 241.629 234.506 234.509C241.627 227.394 246 220.253 249.28 211.837C252.427 203.695 254.587 194.391 255.227 180.77C255.84 167.116 256 162.764 256 128.001C256 93.2383 255.84 88.8756 255.227 75.2221C254.587 61.5953 252.427 52.2939 249.28 44.1551C246 35.7364 241.627 28.595 234.506 21.4802C227.386 14.3601 220.266 9.98677 211.84 6.72007C203.679 3.5547 194.373 1.39735 180.746 0.773344C167.092 0.152004 162.746 0 127.972 0H128.012ZM116.529 23.0669C119.937 23.0616 123.74 23.0669 128.012 23.0669C162.188 23.0669 166.239 23.1896 179.735 23.8029C192.215 24.3736 198.989 26.4589 203.501 28.211C209.474 30.531 213.733 33.3043 218.21 37.7844C222.69 42.2644 225.464 46.5311 227.789 52.5045C229.541 57.0113 231.629 63.7847 232.197 76.2648C232.81 89.7583 232.944 93.8116 232.944 127.972C232.944 162.132 232.81 166.186 232.197 179.679C231.626 192.159 229.541 198.933 227.789 203.439C225.469 209.413 222.69 213.666 218.21 218.144C213.73 222.624 209.477 225.397 203.501 227.717C198.994 229.477 192.215 231.557 179.735 232.128C166.242 232.741 162.188 232.874 128.012 232.874C93.833 232.874 89.7823 232.741 76.2888 232.128C63.8087 231.552 57.0353 229.466 52.5205 227.714C46.5471 225.394 42.2804 222.621 37.8004 218.141C33.3203 213.661 30.547 209.405 28.2216 203.429C26.4696 198.922 24.3816 192.149 23.8136 179.669C23.2002 166.175 23.0776 162.122 23.0776 127.94C23.0776 93.7583 23.2002 89.7263 23.8136 76.2328C24.3843 63.7527 26.4696 56.9793 28.2216 52.4672C30.5417 46.4938 33.3203 42.2271 37.8004 37.7471C42.2804 33.267 46.5471 30.4936 52.5205 28.1683C57.0326 26.4083 63.8087 24.3283 76.2888 23.7549C88.0969 23.2216 92.673 23.0616 116.529 23.0349V23.0669ZM196.338 44.3205C187.858 44.3205 180.978 51.1925 180.978 59.6753C180.978 68.1554 187.858 75.0354 196.338 75.0354C204.818 75.0354 211.698 68.1554 211.698 59.6753C211.698 51.1952 204.818 44.3151 196.338 44.3151V44.3205ZM128.012 62.2673C91.7103 62.2673 62.278 91.6996 62.278 128.001C62.278 164.303 91.7103 193.722 128.012 193.722C164.314 193.722 193.735 164.303 193.735 128.001C193.735 91.6996 164.314 62.2673 128.012 62.2673ZM128.012 85.3342C151.575 85.3342 170.679 104.436 170.679 128.001C170.679 151.564 151.575 170.668 128.012 170.668C104.446 170.668 85.3449 151.564 85.3449 128.001C85.3449 104.436 104.446 85.3342 128.012 85.3342Z" />
    </svg>
  )
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 256 256" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M227.707 44.3638C238.735 47.3133 247.337 55.9487 250.319 66.9765C258.119 98.4376 257.611 157.919 250.483 189.871C247.534 200.899 238.898 209.502 227.871 212.484C196.737 220.186 57.2924 219.235 27.9614 212.484C16.9337 209.535 8.33102 200.899 5.34877 189.871C-2.00854 159.885 -1.50058 96.4713 5.18491 67.1404C8.13439 56.1126 16.7698 47.5099 27.7976 44.5277C69.418 35.8431 212.894 38.6451 227.707 44.3638ZM103.174 90.0798L170.029 128.423L103.174 166.766V90.0798Z" />
    </svg>
  )
}


function AboutSection(props) {
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
