// import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
}

export default nextConfig

// const millionConfig = {
//   auto: { rsc: true },
// }

// export default million.next(nextConfig, millionConfig);