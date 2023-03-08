/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.twitch.tv',
      },
      {
        protocol: 'https',
        hostname: 'static-cdn.jtvnw.net',
      },
    ],
  },

}

module.exports = nextConfig
