/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: './dist',
  experimental: {
    forceSwcTransforms: true,
  }
}

export default nextConfig