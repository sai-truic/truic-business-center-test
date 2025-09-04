/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    domains: ['howtostartanllc.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'howtostartanllc.com',
        pathname: '/images/**',
      },
    ],
  },
  rewrites: async () => {
    // Only use rewrites in development when Flask backend is running
    if (process.env.NODE_ENV === 'development' && process.env.USE_FLASK_BACKEND === 'true') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:5328/api/:path*',
        },
      ]
    }
    // In production or when not using Flask, don't rewrite - use Next.js API routes
    return []
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        events: require.resolve('events/'),
      };
    }
    return config;
  },
}

module.exports = nextConfig
