/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  experimental: {
    forceSwcTransforms: true,
  }
}

export default nextConfig