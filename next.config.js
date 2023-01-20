/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    transpilePackages: ['antd-mobile'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://43.139.165.249:9800/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
