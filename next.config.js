/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  rewrites: async () => {
    return [
      {
        source: '/api/user',
        destination: 'http://localhost:8000/user',
      },
      {
        source: '/api/user/:slug',
        destination: 'http://localhost:8000/user/:slug',
      },
    ];
  },
};

module.exports = nextConfig;
