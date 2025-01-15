/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Alias Node.js modules to browser-compatible versions
      config.resolve.alias = {
        ...config.resolve.alias,
        "node:events": require.resolve("events"),
        "node:stream": require.resolve("stream-browserify"),
      };

      // Add fallback for Node.js modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        events: require.resolve("events"),
        stream: require.resolve("stream-browserify"),
        fs: false, // Explicitly disable unsupported modules
        net: false,
        tls: false,
        dgram: false,
        dns: false,
      };
    }

    // Exclude `mssql` from client-side builds
    if (!isServer) {
      config.externals = {
        ...(config.externals || {}),
        mssql: "commonjs mssql", // Ensure proper syntax
      };
    }

    return config;
  },
};

module.exports = nextConfig;
