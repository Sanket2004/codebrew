/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"], // Add the allowed domain here
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables all ESLint errors during builds
  },
};

export default nextConfig;
