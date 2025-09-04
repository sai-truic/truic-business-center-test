/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  output: 'standalone',
  env: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    COSMOS_CONNECTION_STRING: process.env.COSMOS_CONNECTION_STRING,
    COSMOS_DATABASE: process.env.COSMOS_DATABASE,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    ACTIVE_CAMPAIGN_API_URL: process.env.ACTIVE_CAMPAIGN_API_URL,
    ACTIVE_CAMPAIGN_API_KEY: process.env.ACTIVE_CAMPAIGN_API_KEY,
    WELCOME_EMAIL_AUTOMATION_ID: process.env.WELCOME_EMAIL_AUTOMATION_ID,
    PRINTIFY_API_KEY: process.env.PRINTIFY_API_KEY,
    PRINTIFY_SHOP_ID: process.env.PRINTIFY_SHOP_ID,
  },
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
