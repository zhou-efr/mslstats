import {Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
    return (
        <Html className="bg-white antialiased" lang="en">
            <Head>
                <link
                    rel="preconnect"
                    href="https://cdn.fontshare.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
                />
                <link rel="manifest" href="/manifest.webmanifest"/>


                <meta property="og:title" content="MSL Stats"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://mslstats.vercel.app/"/>
                <meta property="og:image"
                      content="https://github.com/zhou-efr/CDN/blob/main/mslstats/images/logotest3.png"/>
                <meta property="og:description"
                      content="Viewer de replay, c'est en regardant ma pile de side-projects non fini que j'en suis venu à réaliser une interface coolos pour rechercher facilement des replays de streams 🔍."/>
                <meta name="theme-color" content="#3A0C87"/>

                <meta name="twitter:card" content="summary_large_image"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
