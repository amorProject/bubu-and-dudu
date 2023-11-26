// import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    serverActions: true,
  }
}

export default nextConfig

// const millionConfig = {
//   auto: { rsc: true },
// }

// export default million.next(nextConfig, millionConfig);