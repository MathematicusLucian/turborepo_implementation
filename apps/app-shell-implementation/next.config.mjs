/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/design-system"],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: true,
      },
      {
        source: '/landing/:id/:slug',
        destination: '/landing',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
