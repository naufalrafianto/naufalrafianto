/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'i.scdn.co'],
  },
  output: 'standalone',
};

export default nextConfig;
