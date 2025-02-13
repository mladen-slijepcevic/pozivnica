/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/pozivnica',
  assetPrefix: '/pozivnica/',
}

module.exports = nextConfig