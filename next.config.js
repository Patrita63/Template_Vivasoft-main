/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  webpack: (config, { isServer }) => {
      if (!isServer) {
          config.resolve.fallback = {
              fs: false, // Mock 'fs' module for the browser
          };
      }
      return config;
  },
};

