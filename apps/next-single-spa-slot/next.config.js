/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pokemons',
        permanent: true,
      },
      {
        source: '/pokemons/:id/:slug',
        destination: '/pokemons',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
